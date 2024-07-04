#!/usr/bin/python3
from config import db
from models.user import User
from models.playlist import Playlist

classes = {"User": User, "Playlist": Playlist}

class DBStorage:
    def __init__(self):
        self.__session = db.session

    def all(self, cls):
        new_dict = {}
        if cls in classes.keys():
            objs = classes[cls].query.all()

            for obj in objs:
                key = "{}.{}".format(type(obj).__name__, obj.id)
                new_dict[key] = obj
                
        return new_dict

    def new(self, obj):
        self.__session.add(obj)

    def save(self):
        self.__session.commit()

    def delete(self, obj=None):
        if obj is not None:
            self.__session.delete(obj)

    def close(self):
        self.__session.close()

    def get(self, cls, id):
        if cls in classes.keys():
            obj = classes[cls].query.get(id)
            return obj
        
        return None
