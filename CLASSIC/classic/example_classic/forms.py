from django import forms
from django.utils.translation import gettext_lazy as _

from .models import ExampleClassicUser


class UserForms(forms.ModelForm):

    class Meta:
        model = ExampleClassicUser
        fields = '__all__'
    
    def clean_name(self) -> str:
        """
        Method checks and converts name.
        Returns:
            str -- name if correct otherwise raise exception
        """
        name: str = self.cleaned_data['name']
        if not name.isalpha():
            raise forms.ValidationError(
                message=_('Name must have contain only letters.')
            )
        return name.capitalize()

    def clean_last_name(self) -> str:
        """
        Method checks and converts last name.
        Returns:
            str -- last name if correct otherwise raise exception
        """
        last_name: str = self.cleaned_data['last_name']
        if not last_name.isalpha():
            raise forms.ValidationError(
                message=_('Last name must have contain only letters.')
            )
        return last_name.capitalize()

    def clean_pesel(self) -> str:
        """
        Method checks pesel
        Returns:
            str - last name if correct otherwise raise exception
        """
        pesel: str = self.cleaned_data['pesel']
        if len(pesel) != 11:
            raise forms.ValidationError(
                message=_('Bad pesel number format.')
            )
        return pesel
