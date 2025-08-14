# backend/app/test_matches.py

from flask import Flask

# 1) Spin up a minimal Flask app and configure it
app = Flask(__name__)
app.config["MONGO_URI"]    = "mongodb+srv://jjforsyth15:ClassLink2025@cluster1.imnisby.mongodb.net/"
app.config["MONGO_DBNAME"] = "CLASSLINK"

# 2) Push the app context so `current_app` is defined
ctx = app.app_context()
ctx.push()

# 3) Now import your module under its real filename
import matchEngine     # ← not matchEngine

# 4) Grab your functions
compute_overlap = matchEngine.compute_overlap
get_matches_for  = matchEngine.get_matches_for

print("Top 3 matches for babyziba:")
for m in get_matches_for("68773981f0123b40ff91ae4a", top_n=3):
    print(" ", m)

# 6) Pop the context when you’re done (optional in a short script)
ctx.pop()
