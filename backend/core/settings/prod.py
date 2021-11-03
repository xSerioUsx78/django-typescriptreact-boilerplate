from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = ['www.domain-name.com/*']

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '<db_name>',
        'USER': '<db_username>',
        'PASSWORD': '<password>',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://Domain-name.com/*"
]

STATIC_ROOT = 'path-to-static-root (ex: /home/mori/static/)'
STATICFILES_DIRS = [
    os.path.join(FRONTEND_DIR, 'frontend', 'build', 'static')
]

MEDIA_ROOT = 'path-to-media-root (ex: /home/mori/media/)'
