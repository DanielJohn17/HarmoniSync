from config import db, app
from api.v1.views import app_view

app.register_blueprint(app_view)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)