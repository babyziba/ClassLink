from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from flask import request
import bcrypt
import base64
from bson.binary import Binary



app = Flask(__name__)
CORS(app)

# Mongo setup
uri = "mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/"
client = MongoClient(uri)
db = client["CLASSLINK"]
students = db["STUDENTS"]


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('userName', '').strip()
    password = data.get('password', '').encode('utf-8')

    print(f"🔐 Login attempt: {username}")
    user = students.find_one({"userName": username})
    if not user:
        return jsonify({"success": False, "message": "User not found"}), 401

    stored_hash = user.get('passwordHashed')

    if stored_hash is None:
        return jsonify({"success": False, "message": "User has no password"}), 401

    # Decode the base64 if it's Binary
    if isinstance(stored_hash, Binary):
        decoded = base64.b64decode(stored_hash)
        stored_hash = decoded.decode("utf-8")

    elif isinstance(stored_hash, bytes):
        stored_hash = stored_hash.decode("utf-8")

    print("➡️ Final stored hash:", stored_hash)

    if bcrypt.checkpw(password, stored_hash.encode('utf-8')):
        return jsonify({
            "success": True,
            "message": "Login successful!",
            "profile": {
                "name": f"{user.get('firstName')} {user.get('lastName')}",
                "courses": user.get('myCourses', []),
                "interests": user.get('interests', [])
            }
        })
    else:
        return jsonify({"success": False, "message": "Incorrect password"}), 401





@app.route('/ping')
def ping():
    return "pong"


@app.route('/api/classmates', methods=['GET'])
def get_classmates():
    print("✅ /api/classmates endpoint was called!")
    data = []
    for s in students.find():
        print("🔍 Found student:", s)
        data.append({
            "name": f"{s.get('firstName', '')} {s.get('lastName', '')}",
            "courses": s.get('myCourses', []),
            "interests": s.get('interests', [])
        })
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)


