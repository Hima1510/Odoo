from flask import Blueprint, request, jsonify
from models import db, SwapRequest

swaps_bp = Blueprint('swaps', __name__)

@swaps_bp.route('/', methods=['POST'])
def create_swap():
    data = request.json
    swap = SwapRequest(**data)
    db.session.add(swap)
    db.session.commit()
    return jsonify({"msg": "Swap request sent"}), 201

@swaps_bp.route('/')
def get_swaps():
    swaps = SwapRequest.query.all()
    return jsonify([{
        "id": s.id,
        "from_user": s.from_user,
        "to_user": s.to_user,
        "status": s.status
    } for s in swaps])

@swaps_bp.route('/<int:id>/status', methods=['PATCH'])
def update_status(id):
    data = request.json
    swap = SwapRequest.query.get(id)
    if not swap:
        return jsonify({"error": "Not found"}), 404
    swap.status = data['status']
    db.session.commit()
    return jsonify({"msg": "Status updated"})

@swaps_bp.route('/<int:id>/feedback', methods=['POST'])
def give_feedback(id):
    data = request.json
    swap = SwapRequest.query.get(id)
    swap.feedback = data['feedback']
    db.session.commit()
    return jsonify({"msg": "Feedback submitted"})
