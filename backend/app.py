from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import db
from tasks import tasks_bp
from users import users_bp

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tasks.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

app.register_blueprint(tasks_bp, url_prefix="/api/tasks")
app.register_blueprint(users_bp, url_prefix="/api/users")

migrate = Migrate(app, db)


with app.app_context():
    db.create_all()



if __name__ == "__main__":
    app.run(debug=True)