from rest_framework import serializers

from .models import ExampleRestUser


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExampleRestUser
        fields = '__all__'

    def clean_name(self, name) -> str:
        """
        Method returns name.
        Returns:
            str -- name in format: big first letter another small letters
        """
        return name.capitalize()

    def clean_last_name(self, last_name) -> str:
        """
        Method returns last name.
        Returns:
            str -- name in format: big first letter another small letters
        """
        return last_name.capitalize()
