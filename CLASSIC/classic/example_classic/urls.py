from django.urls import path

from . import views


urlpatterns = [
    path(route=r'users/', view=views.CreateAndDeleteUserView.as_view(), name="user")
]