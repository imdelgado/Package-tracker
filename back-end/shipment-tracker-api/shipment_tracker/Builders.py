import uuid
from .models import Shipment
from datetime import datetime


def build_shipment(**kwargs):
    generated_uuid = uuid.uuid1()
    tracking_number = str(generated_uuid)

    shipment = Shipment(**kwargs)
    shipment.tracking_number = tracking_number
    shipment.add_links(**kwargs)
    shipment.creation_date = datetime.now()

    return shipment
