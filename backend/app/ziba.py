import bcrypt
from pymongo import MongoClient

uri = "mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/"
client = MongoClient(uri)
students = client["CLASSLINK"]["STUDENTS"]

hash = bcrypt.hashpw(b"ClassLink", bcrypt.gensalt()).decode("utf-8")

students.update_one(
    {"userName": "BabyZiba"},
    {"$set": {"passwordHashed": hash}}
)

print("✅ Password hash updated.")
