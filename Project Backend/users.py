from flask import Blueprint, jsonify, request
from models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/profile/<int:user_id>')
def get_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "name": user.name,
        "location": user.location,
        "skills_offered": user.skills_offered,
        "skills_wanted": user.skills_wanted,
        "availability": user.availability,
        "is_public": user.is_public
    })

@users_bp.route('/search')
def search_users():
    skill = request.args.get('skill')
    users = User.query.filter(User.skills_offered.contains([skill])).all()
    return jsonify([{"id": u.id, "name": u.name, "skills": u.skills_offered} for u in users])
