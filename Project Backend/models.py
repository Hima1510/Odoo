from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    location = db.Column(db.String(100))
    photo_url = db.Column(db.String(250))
    skills_offered = db.Column(db.PickleType, default=[])
    skills_wanted = db.Column(db.PickleType, default=[])
    availability = db.Column(db.String(100))
    is_public = db.Column(db.Boolean, default=True)
    rating = db.Column(db.PickleType, default=[])
    is_banned = db.Column(db.Boolean, default=False)

class SwapRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    to_user = db.Column(db.Integer, db.ForeignKey('user.id'))
    skills_offered = db.Column(db.String(100))
    skills_wanted = db.Column(db.String(100))
    message = db.Column(db.String(500))
    status = db.Column(db.String(20), default="Pending")
    feedback = db.Column(db.String(500))

class AdminNotification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    message = db.Column(db.String(500))
    date = db.Column(db.DateTime)
