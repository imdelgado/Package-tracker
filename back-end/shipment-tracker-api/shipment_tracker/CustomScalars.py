import datetime
from graphene.types import Scalar
from neotime import DateTime


class DateTimeCustom(Scalar):
    @staticmethod
    def serialize(date):
        if isinstance(date, DateTime):
            date = datetime.datetime(date.year, date.month, date.day,
                                     date.hour, date.minute, int(date.second),
                                     int(date.second * 1000000 % 1000000),
                                     tzinfo=date.tzinfo)
        return date.isoformat()

