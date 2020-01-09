import graphene
from .models import Package, Address


class PackageSchema(graphene.ObjectType):
    tracking_number = graphene.String()
    weight = graphene.Int()
    is_box = graphene.Boolean()


class AddressSchema(graphene.ObjectType):
    street = graphene.String()
    number = graphene.Int()
    zip_code = graphene.String()
    city = graphene.String()
    state = graphene.String()
    country = graphene.String()


class AddressInput(graphene.InputObjectType):
    street = graphene.String(required=True)
    number = graphene.Int(required=True)
    zip_code = graphene.String(required=True)
    city = graphene.String(required=True)
    state = graphene.String(required=True)
    country = graphene.String(required=True)


class Query(graphene.ObjectType):
    package = graphene.Field(lambda: PackageSchema, tracking_number=graphene.String())

    def resolve_package(self, info, tracking_number):
        package = Package(tracking_number=tracking_number).fetch()
        return PackageSchema(**package.as_dict())


class CreateCustomer(graphene.Mutation):
    class Arguments:
        tracking_number = graphene.String(required=True)
        weight = graphene.Int(required=True)
        is_box = graphene.Boolean(required=True)
        send_to_address = AddressInput(required=True)

    success = graphene.Boolean()
    package = graphene.Field(lambda: PackageSchema)

    def mutate(self, info, **kwargs):
        package = Package(**kwargs)
        package.set_send_to(**kwargs.get('send_to_address'))
        package.save()

        return CreateCustomer(package=package, success=True)


class Mutations(graphene.ObjectType):
    create_package = CreateCustomer.Field()


schema = graphene.Schema(query=Query, mutation=Mutations, auto_camelcase=False)