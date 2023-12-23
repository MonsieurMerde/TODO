from .base import *

DEBUG = True

REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].append("djangorestframework_camel_case.render.CamelCaseBrowsableAPIRenderer")

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}
