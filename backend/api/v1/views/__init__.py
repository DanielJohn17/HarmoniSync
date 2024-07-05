from flask import Blueprint

app_view = Blueprint("app_view", __name__)

# Import Statements
from api.v1.views.album import *
from api.v1.views.artist import *
from api.v1.views.liked_music import *
from api.v1.views.music import *
from api.v1.views.playlist import *
from api.v1.views.user import *