#!/usr/bin/python3
from config import db

class DBStorage:
    def __init__(self):
        self.__session = db.session

    def all(self, cls):
        new_dict = {}
        objs = cls.query.all()

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
