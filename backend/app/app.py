from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
from .student import Student
from .matchEngine import get_matches_for       # ← NEW
import bcrypt
import os

app = Flask(__name__)

allowed_origins = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:3000"
).split(",")

CORS(app)

MONGODB_URI = os.environ.get("MONGODB_URI")
if not MONGODB_URI:
    raise RuntimeError("MONGODB_URI not set in environment")

client   = MongoClient(MONGODB_URI)
db       = client["CLASSLINK"]
students = db["STUDENTS"]
courses  = db["COURSES"]

@app.get("/health")
def health():
    return {"ok": True}, 200

# ───────────────────────────
#  SIGN-UP  (unchanged)
# ───────────────────────────
@app.route("/signup", methods=["POST"])
def signUp():
    data = request.json
    first = data.get("firstName")
    last = data.get("lastName")
    email = data.get("email") 
    user_courses = data.get("courses")
    interests = data.get("interests")

    if students.find_one({"email": email}):
        return jsonify({"message": "account already exists with this email"}), 409

    password = data.get("password") 

    new_student = Student(first, last, email, password, user_courses, interests)

    password = data.get("password")
    new_student = Student(first, last, email, password, courses, interests)
    # NOTE: you still need to insert the new_student into Mongo here:
    # students.insert_one(new_student.__dict__)
    return jsonify({"message": "Student log in created successfully"}), 201

# ───────────────────────────
#  LOGIN  (unchanged)
# ───────────────────────────
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = data.get("email")
    password = data.get("password")

    if not user:
        return jsonify({"message": "Email is required"}), 400

    doc = students.find_one({"email": user})
    if not doc:
        return jsonify({"message": "Email not found"}), 404

    if bcrypt.checkpw(password.encode(), doc["passwordHashed"]):
        return jsonify({
            "message":   "Login successful. Welcome, ",
            "firstName": doc["firstName"],
            "userId":    str(doc["_id"]),          # frontend can store this
        }), 200
    else:
        return jsonify({"message": "Incorrect password"}), 401

# ───────────────────────────
#  NEW  ➜  /api/classmates
# ───────────────────────────
@app.route("/api/classmates")
def classmates():
    """GET /api/classmates?userId=<mongo_id>"""
    email = request.args.get("email")
    if not email:
        return jsonify({"message": "Email query-param required"}), 400
    
    student_id = (students.find_one({"email": email}))["_id"]

    if not student_id:
        return jsonify({"error": "Can't find student _id"})

    matches = get_matches_for(student_id, students)

    # ↓↓↓ CHANGED: also match string _id plus common fields (including courseName / courseNumber)
    tokens = {str(x) for m in matches for x in (m.get("commonCourses") or [])}
    oid_list = [ObjectId(t) for t in tokens if ObjectId.is_valid(t)]
    docs = courses.find({
        "$or": [
            {"_id": {"$in": oid_list}},           # _id stored as ObjectId
            {"_id": {"$in": list(tokens)}},       # _id stored as string
            {"code": {"$in": list(tokens)}},
            {"courseId": {"$in": list(tokens)}},
            {"title": {"$in": list(tokens)}},
            {"name": {"$in": list(tokens)}},
            {"courseName": {"$in": list(tokens)}},    # ← added
            {"courseNumber": {"$in": list(tokens)}},   # ← added
        ]
    })
    name_map = {}
    for d in docs:
        label = (
            d.get("courseName") or d.get("name") or d.get("title")
            or d.get("code") or d.get("courseNumber") or d.get("courseId")
            or str(d.get("_id"))
        )
        name_map[str(d["_id"])] = label
        if d.get("code"):         name_map[str(d["code"])] = label
        if d.get("courseId"):     name_map[str(d["courseId"])] = label
        if d.get("title"):        name_map[str(d["title"])] = label
        if d.get("name"):         name_map[str(d["name"])] = label
        if d.get("courseName"):   name_map[str(d["courseName"])] = label   # ← added
        if d.get("courseNumber"): name_map[str(d["courseNumber"])] = label # ← added
    # ↑↑↑ CHANGED

    return jsonify([
        {
            "name":      f"{m['firstName']} {m['lastName']}",
            "email": m.get("email"),
            "courses":   [name_map.get(str(x), str(x)) for x in (m.get("commonCourses") or [])],
            "interests": [name_map.get(str(x), str(x)) for x in (m.get("commonInterests") or [])],
        }
        for m in matches
    ])

# ───────────────────────────
if __name__ == "__main__":
    app.run(debug=True)
