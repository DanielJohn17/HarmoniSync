#!/usr/bin/python3
from api.v1.views import app_view
from flask import request, jsonify
from models import storage
from models.user import User


@app_view.route("/users", methods=["GET"])
def users():
    all_users = storage.all(User)
    users_list = []

    for user in all_users.values():
        users_list.append(user.to_dict())
    
    return jsonify(users_list)

@app_view.route("/create_user", methods=["POST"])
def create_user():
    user_name = request.json.get("userName")
    dob = request.json.get("DOB")

    if not user_name or not dob:
        return jsonify({"error": "Missing data"}), 400

    new_user = User(user_name=user_name, dob=dob)

    try:
        new_user.save_db()
    except:
        return jsonify({"error": "Could not create user"}), 400
    
    return jsonify({"message": "User Created!"}), 201