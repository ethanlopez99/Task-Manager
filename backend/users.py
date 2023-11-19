from flask import Blueprint, request, jsonify
from models import db, User
from flask_bcrypt import Bcrypt

users_bp = Blueprint("users", __name__)

bcrypt = Bcrypt()

@users_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    existing_user = User.query.filter_by(username=data['username']).first() or User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "Username or email is already registered"}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode("utf-8")

    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User has been registered successfully", "userID": new_user.id}), 201


@users_bp.route("/login", methods=["POST"])
def login():
    
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    print(user)

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login Successful", "userID" : user.id}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    