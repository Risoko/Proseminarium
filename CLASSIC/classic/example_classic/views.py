from typing import List, Type

from django.forms import Form
from django.http.response import HttpResponse
from django.shortcuts import get_list_or_404
from django.views.generic import FormView

from .forms import UserForms
from .models import ExampleClassicUser


class CreateAndDeleteUserView(FormView):
    http_method_names: List[str] = ['get', 'post']
    form_class: Type[Form] = UserForms
    template_name: str = 'test/user.html'

    def form_valid(self, form: Type[Form]) -> Type[HttpResponse]:
        """If the form is valid, redirect to the supplied URL."""
        form.save()
        return HttpResponse("Sucess")

    def dispatch(self, request, *args, **kwargs):
        if pesel := request.POST.get('user_pesel'):
            [user.delete() for user in get_list_or_404(ExampleClassicUser, pesel=pesel)]
            return HttpResponse("Deleted user")
        return super().dispatch(request, *args, **kwargs)

