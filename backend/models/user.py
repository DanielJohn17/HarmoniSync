#!/usr/bin/python3
from models.base_model import BaseModel
from models import storage
from config import db


class User(BaseModel, db.Model):
    __tablename__ = "User"

    id = db.Column(db.String(60), primary_key=True)
    user_name = db.Column(db.String(60), unique=True, nullable=False)
    DOB = db.Column(db.String(60), nullable=False)
    
    def __init__(self, *args, **kwargs):
        super().__init__()
        for key, value in kwargs.items():
            setattr(self, key, value)
        
    
    def save_db(self):
        storage.new(self)
        storage.save()
    
