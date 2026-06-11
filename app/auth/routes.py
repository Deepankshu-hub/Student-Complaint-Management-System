from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..models import User
from .. import db, login_manager
from flask_login import login_user, logout_user, login_required, current_user
from . import auth

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth.route('/check-auth', methods=['GET'])
def check_auth():
    if current_user.is_authenticated:
        return jsonify({"authenticated": True, "user": {"email": current_user.email, "name": current_user.name}}), 200
    return jsonify({"authenticated": False}), 401

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    remember = data.get('remember', False)

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Please check your login details and try again."}), 401

    login_user(user, remember=remember)
    return jsonify({"success": True, "message": "Logged in successfully", "user": {"email": user.email, "name": user.name}}), 200

@auth.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"error": "Email address already exists"}), 400

    new_user = User(email=email, name=name, password=generate_password_hash(password, method='pbkdf2:sha256'))

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success": True, "message": "Signed up successfully"}), 201

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"success": True, "message": "Logged out successfully"}), 200
