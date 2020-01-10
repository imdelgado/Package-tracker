import graphene
from .models import Package, Shipment, Address


class PackageSchema(graphene.ObjectType):
    kg_weight = graphene.Int()
    packing_type = graphene.String()


class AddressSchema(graphene.ObjectType):
    street = graphene.String()
    number = graphene.Int()
    zip_code = graphene.String()
    city = graphene.String()
    state = graphene.String()
    country = graphene.String()


class CustomerSchema(graphene.ObjectType):
    first_name = graphene.String()
    last_name = graphene.String()
    email = graphene.String()
    phone_number = graphene.String()


class ShipmentSchema(graphene.ObjectType):
    tracking_number = graphene.String()
    ship_to = graphene.List(AddressSchema)
    send_from = graphene.List(CustomerSchema)
    to = graphene.List(CustomerSchema)
    package = graphene.List(PackageSchema)

    def resolve_ship_to(self, info):
        return [AddressSchema(**address.as_dict()) for address in self.ship_to]


class PackageInput(graphene.InputObjectType):
    kg_weight = graphene.Int(required=True)
    packing_type = graphene.String(required=True)


class AddressInput(graphene.InputObjectType):
    street = graphene.String(required=True)
    number = graphene.Int(required=True)
    zip_code = graphene.String(required=True)
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    country = graphene.String(required=True)


class CustomerInput(graphene.InputObjectType):
    first_name = graphene.String(required=True)
    last_name = graphene.String(required=True)
    email = graphene.String(required=True)
    phone_number = graphene.String(required=True)


class Query(graphene.ObjectType):
    shipment = graphene.Field(lambda: ShipmentSchema, tracking_number=graphene.String())
    package = graphene.Field(lambda: PackageSchema)
    address = graphene.Field(lambda: AddressSchema)
    customer = graphene.Field(lambda: CustomerSchema, phone_number=graphene.String())

    def resolve_shipment(self, info, tracking_number):
        shipment = Shipment(tracking_number=tracking_number).fetch()
        return Shipment(**shipment.as_dict())


class CreateShipment(graphene.Mutation):
    class Arguments:
        tracking_number = graphene.String(required=True)
        ship_to_address = AddressInput(required=True)
        send_from = CustomerInput(required=True)
        send_to = CustomerInput(required=True)
        package_info = PackageInput(required=True)

    success = graphene.Boolean()
    shipment = graphene.Field(lambda: ShipmentSchema)

    def mutate(self, info, **kwargs):
        shipment = Shipment(**kwargs)
        shipment.add_links(**kwargs)
        shipment.save()

        return CreateShipment(shipment=shipment, success=True)


class Mutations(graphene.ObjectType):
    create_shipment = CreateShipment.Field()


schema = graphene.Schema(query=Query, mutation=Mutations, auto_camelcase=False)
