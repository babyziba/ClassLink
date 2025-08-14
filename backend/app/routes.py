# backend/app/routes.py

from flask import Blueprint, jsonify, request
from .match_engine import get_matches_for

bp = Blueprint("api", __name__)

@bp.route("/matches/<student_id>")
def matches(student_id):
    top_n = int(request.args.get("limit", 10))
    results = get_matches_for(student_id, top_n)
    return jsonify(results), 200
