from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from student import Student
import bcrypt
from .routes import bp as api_bp   # ← your blueprint of match & other endpoints

app = Flask(__name__)

# 1) Any configuration (including your Mongo URI) goes here:
app.config["MONGO_URI"]    = "mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/"
app.config["MONGO_DBNAME"] = "CLASSLINK"

# 2) Enable CORS, etc.
CORS(app)

# 3) Register your blueprint under "/api"
app.register_blueprint(api_bp, url_prefix="/api")

# 4) Now set up your direct MongoClient if you need it here, or you can
#    move client/db access into your blueprint module.
client   = MongoClient(app.config["MONGO_URI"])
db       = client[app.config["MONGO_DBNAME"]]
students = db["STUDENTS"]

# 5) Your custom routes (signup/login) go *after* blueprint registration
@app.route("/signup", methods=["POST"])
def signUp():
    data = request.json
    first = data.get("firstName")
    last  = data.get("lastName")
    user  = data.get("userName")
    if students.find_one({"userName": user}):
        return jsonify({"message": "Username already exists"}), 409

    new_student = Student(first, last, user, data.get("password"))
    return jsonify({"message": "Student account created successfully"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = data.get("userName")
    pwd  = data.get("password")
    if not user:
        return jsonify({"message": "Username is required"}), 400

    doc = students.find_one({"userName": user})
    if not doc:
        return jsonify({"message": "Username not found"}), 404

    if bcrypt.checkpw(pwd.encode(), doc["passwordHashed"]):
        return jsonify({
            "message":   "Login successful. Welcome!",
            "firstName": doc["firstName"]
        }), 200
    else:
        return jsonify({"message": "Incorrect password"}), 401

if __name__ == "__main__":
    app.run(debug=True)
