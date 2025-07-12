from flask import Blueprint, request, jsonify
from models import db, User
from utils import hash_password, verify_password
from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400
    user = User(
        name=data['name'],
        email=data['email'],
        password=hash_password(data['password']),
        location=data.get('location'),
        skills_offered=data.get('skills_offered', []),
        skills_wanted=data.get('skills_wanted', []),
        availability=data.get('availability'),
        is_public=data.get('is_public', True)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User registered", "user_id": user.id}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not verify_password(user.password, data['password']):
        return jsonify({"error": "Invalid credentials"}), 401
    if user.is_banned:
        return jsonify({"error": "User is banned"}), 403
    token = create_access_token(identity=user.id)
    return jsonify({"msg": "Login success", "token": token})
