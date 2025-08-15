"""
Match Engine (backend/app/match_engine.py)

Pure matching logic—no Flask or global DB connections.
Pass the Mongo `students` collection to `get_matches_for` so the
module stays side-effect-free and unit-testable.
"""

from __future__ import annotations

from typing import List, Dict
from bson import ObjectId


def _overlap(a, b) -> int:
    """Return |a ∩ b|, tolerating None / empty lists."""
    if not a or not b:
        return 0
    return len(set(a) & set(b))


def _as_str_list(v):
    return [str(x) for x in v] if v else []


def _norm_strs(v):
    return [s.strip() for s in v or [] if isinstance(s, str)]


def get_matches_for(
    student_id: str,
    students_coll,
    *,
    top_n: int = 10,
) -> List[Dict]:
    """Return up to *top_n* classmates ranked by shared-course overlap."""
    me = students_coll.find_one({"_id": ObjectId(student_id)})
    if not me:
        return []

    # Prefer human-readable names if present; otherwise fall back to IDs as strings
    my_courses = _norm_strs(me.get("courses")) or _as_str_list(me.get("courseIds"))
    my_interests = _norm_strs(me.get("interests"))

    pipeline = [
        {"$match": {"_id": {"$ne": ObjectId(student_id)}}},
        {"$project": {"firstName": 1, "lastName": 1, "email": 1, "courseIds": 1, "courses": 1, "interests": 1}},
    ]

    scored: List[Dict] = []
    for cand in students_coll.aggregate(pipeline):
        cand_courses = _norm_strs(cand.get("courses")) or _as_str_list(cand.get("courseIds"))
        common_courses = list(set(my_courses) & set(cand_courses))
        if not common_courses:
            continue  # keep original behavior: require a shared course

        cand_interests = _norm_strs(cand.get("interests"))
        # case-insensitive overlap for interests
        ci_me = {s.lower(): s for s in my_interests}
        ci_ca = {s.lower(): s for s in cand_interests}
        common_interests_keys = set(ci_me.keys()) & set(ci_ca.keys())
        common_interests = [ci_me[k] for k in common_interests_keys] or [ci_ca[k] for k in []]  # preserve casing from "me"

        scored.append({
            "_id":           str(cand["_id"]),
            "firstName":     cand.get("firstName", ""),
            "lastName":      cand.get("lastName", ""),
            "email":         cand.get("email", ""),
            "commonCount":   len(common_courses),
            "commonCourses": common_courses,          # now these are NAMES if available
            "commonInterests": common_interests,      # new
        })

    scored.sort(key=lambda x: x["commonCount"], reverse=True)
    return scored[:top_n]
