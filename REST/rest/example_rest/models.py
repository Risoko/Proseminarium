from django.db import models

from django.utils.translation import gettext_lazy as _


class ExampleRestUser(models.Model):
    name: str = models.CharField(
        max_length=200,
        verbose_name=_('name'),
    )
    last_name: str = models.CharField(
        max_length=200,
        verbose_name=_('last name'),
    )
    pesel: str = models.CharField(
        max_length=11,
        verbose_name=_('pesel'),
    )
