# backend/app/match_engine.py

from bson import ObjectId
from flask import current_app
from pymongo import MongoClient

# tweak this if you’re using MongoEngine or another driver
client = MongoClient(current_app.config["MONGO_URI"])
db     = client.get_database(current_app.config["MONGO_DBNAME"])
students = db["STUDENTS"]

def compute_overlap(a: list, b: list) -> int:
    """Simple set‐intersection length."""
    return len(set(a) & set(b))

def get_matches_for(student_id: str, top_n: int = 10):
    me = students.find_one({"_id": ObjectId(student_id)})
    if not me:
        return []

    my_courses   = me.get("courseIds", [])    # or ["CS101", ...]
    my_interests = me.get("interests", [])    # if you added interests
    my_slots     = me.get("schedule", [])     # if you added schedule

    pipeline = [
      {"$match": {"_id": {"$ne": ObjectId(student_id)}}},
      {"$project": {
          "firstName": 1,
          "lastName": 1,
          "courseIds": 1,
          # include any other fields you want to return…
      }}
    ]
    candidates = students.aggregate(pipeline)

    scored = []
    for cand in candidates:
        score = 0
        # count shared courses
        score += compute_overlap(my_courses, cand.get("courseIds", []))
        # (optional) add interest overlap
        # score += compute_overlap(my_interests, cand.get("interests", []))
        # (optional) add schedule overlap
        # score += compute_overlap(my_slots, cand.get("schedule", []))

        if score > 0:
            scored.append({
              "_id":        str(cand["_id"]),
              "firstName":  cand["firstName"],
              "lastName":   cand["lastName"],
              "commonCount": score,
              # maybe return the actual common items:
              "commonCourses": list(set(my_courses) & set(cand.get("courseIds", [])))
            })

    # sort descending by overlap count
    scored.sort(key=lambda x: x["commonCount"], reverse=True)
    return scored[:top_n]
