import shipment_tracker.settings as settings
from shipment_tracker import create_app
from flask_cors import CORS

app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(
        host=settings.BIND_HOST,
        port=settings.BIND_PORT,
        debug=settings.DEBUG
    )