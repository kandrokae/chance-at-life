"""
WSGI config for ChanceAtLife project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/dev/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from static_ranges import Ranges

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ChanceAtLife.settings')

application = Ranges(get_wsgi_application())
