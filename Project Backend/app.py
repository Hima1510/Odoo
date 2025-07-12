from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from auth import auth_bp
from users import users_bp
from swaps import swaps_bp
from admin import admin_bp

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
jwt = JWTManager(app)

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(swaps_bp, url_prefix="/api/swaps")
app.register_blueprint(admin_bp, url_prefix="/api/admin")

@app.route('/')
def index():
    return "Skill Swap Flask Backend Running ✅"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
