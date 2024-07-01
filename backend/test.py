#!/usr/bin/python3

from models.user import User

user = User("user_name", "1999-01-01")

print(user)

user.save_db()

print(user.to_dict())