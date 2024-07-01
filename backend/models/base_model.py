#!/usr/bin/python3
import uuid
from datetime import datetime


t_format = "%Y-%m-%dT%H:%M:%S"

class BaseModel:
    def __init__(self):
        self.id = str(uuid.uuid4())
        self.created_at = datetime.utcnow().strftime(t_format)
    
    def __str__(self):
        dir = {}

        dir["id"] = self.id
        dir["created_at"] = self.created_at

        return f'id: {dir["id"]}, created at: {dir["created_at"]}'
    
    def to_dict(self):
        dir = dict()

        dir["id"] = self.id
        dir["created_at"] = self.created_at

        return dir
