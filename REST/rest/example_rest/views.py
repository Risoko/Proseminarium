from rest_framework.viewsets import ModelViewSet

from .models import ExampleRestUser
from .serializers import UserSerializer


class UserView(ModelViewSet):
    serializer_class = UserSerializer
    queryset = ExampleRestUser.objects.all()
