from flask import Flask
from flask_cors import CORS
from api.v1.views import app_view


app = Flask(__name__)
app.register_blueprint(app_view)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

CORS(app)