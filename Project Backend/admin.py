from flask import Blueprint, request, jsonify
from models import db, User, SwapRequest, AdminNotification
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/ban/<int:user_id>', methods=['PATCH'])
def ban_user(user_id):
    user = User.query.get(user_id)
    user.is_banned = True
    db.session.commit()
    return jsonify({"msg": "User banned"})

@admin_bp.route('/swaps')
def all_swaps():
    swaps = SwapRequest.query.all()
    return jsonify([{"id": s.id, "status": s.status} for s in swaps])

@admin_bp.route('/broadcast', methods=['POST'])
def send_message():
    data = request.json
    note = AdminNotification(title=data['title'], message=data['message'], date=datetime.utcnow())
    db.session.add(note)
    db.session.commit()
    return jsonify({"msg": "Message sent"})
