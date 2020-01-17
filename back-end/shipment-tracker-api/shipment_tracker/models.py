from py2neo.ogm import GraphObject, Property, RelatedTo
from py2neo import Graph

import shipment_tracker.settings as settings

graph = Graph(
    host=settings.NEO4J_HOST,
    port=settings.NEO4J_PORT,
    user=settings.NEO4J_USER,
    password=settings.NEO4J_PASSWORD,
)


class BaseModel(GraphObject):
    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if hasattr(self, key):
                setattr(self, key, value)

    @property
    def all(self):
        return self.match(graph)

    def save(self):
        graph.push(self)


class Shipment(BaseModel):
    __primarykey__ = 'tracking_number'

    tracking_number = Property()
    creation_date = Property()

    ship_to = RelatedTo('Address', 'SHIP_TO')
    from_customer = RelatedTo('Customer', 'FROM')
    to = RelatedTo('Customer', 'TO')
    package = RelatedTo('Package', 'SEND')

    def as_dict(self):
        return {
            'tracking_number': self.tracking_number,
            'creation_date': self.creation_date,
            'ship_to': self.ship_to,
            'from_customer': self.from_customer,
            'to': self.to,
            'package': self.package
        }

    def add_links(self, **kwargs):
        self.ship_to.add(Address(**kwargs.get('ship_to_address')))
        self.from_customer.add(Customer(**kwargs.get('send_from')))
        self.to.add(Customer(**kwargs.get('send_to')))
        self.package.add(Package(**kwargs.get('package_info')))

    def fetch(self):
        return self.match(graph, self.tracking_number).first()


class Package(BaseModel):
    kg_weight = Property()
    packing_type = Property()

    def as_dict(self):
        return {
            'kg_weight': self.kg_weight,
            'packing_type': self.packing_type
        }

    def fetch(self, _id):
        return self.match(graph, _id).first()


class Address(BaseModel):
    street = Property()
    number = Property()
    zip_code = Property()
    city = Property()
    state = Property()
    country = Property()

    def as_dict(self):
        return {
            'street': self.street,
            'number': self.number,
            'zip_code': self.zip_code,
            'city': self.city,
            'state': self.state,
            'country': self.country
        }

    def fetch(self, _id):
        return self.match(graph, _id).first()


class Customer(BaseModel):
    __primarykey__ = 'phone_number'

    first_name = Property()
    last_name = Property()
    email = Property()
    phone_number = Property()

    def as_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.last_name,
            'phone_number': self.phone_number
        }

    def fetch(self):
        return self.match(graph, self.phone_number).first()
