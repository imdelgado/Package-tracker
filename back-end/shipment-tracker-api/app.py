import shipment_tracker.settings as settings
from shipment_tracker import create_app

app = create_app()


if __name__ == '__main__':
    app.run(
        host=settings.BIND_HOST,
        port=settings.BIND_PORT,
        debug=settings.DEBUG
    )