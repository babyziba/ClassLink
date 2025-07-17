from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from student import Student

app = Flask(__name__)

client = MongoClient("mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/")
db = client["CLASSLINK"]
students = db["STUDENTS"]

@app.route("/students", methods=["POST"])
def create_student():
    data = request.json

    first = data.get("firstName")
    last = data.get("lastName")
    user = data.get("userName")
    password = data.get("password")

    new_student = Student(first, last, user, password)

    return jsonify({"message": "Student log in created successfully"}), 201



