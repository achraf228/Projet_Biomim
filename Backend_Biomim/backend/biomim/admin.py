from django.contrib import admin

from .models import *
admin.site.register(User)
admin.site.register(Plant)
admin.site.register(PlantFamily)
admin.site.register(Region)
admin.site.register(PlantComment)
admin.site.register(ChatMessage)
