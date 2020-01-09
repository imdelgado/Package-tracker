from py2neo.ogm import GraphObject, Property, RelatedTo
from py2neo import Graph

import tracker.settings as settings

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


class Package(BaseModel):
    __primarykey__ = 'tracking_number'

    tracking_number = Property()
    weight = Property()
    is_box = Property()

    send_to = RelatedTo('Address', 'SEND_TO')

    def as_dict(self):
        return {
            'tracking_number': self.tracking_number,
            'weight': self.weight,
            'is_box': self.is_box
        }

    def set_send_to(self, **kwargs):
        self.send_to.add(Address(**kwargs))

    def fetch(self):
        return self.match(graph, self.tracking_number).first()


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

    first_name: Property()
    last_name: Property()
    email: Property()
    phone_number: Property()

    def as_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.last_name
        }

    def fetch(self):
        return self.match(graph, self.phone_number).first()
