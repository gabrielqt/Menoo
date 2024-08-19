from django.contrib import admin
from .models import Category, Food, Order 

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']
    
admin.site.register(Category, CategoryAdmin)

class FoodAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', 'description']
    
admin.site.register(Food, FoodAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'status', 'order_date', 'customer_name', 'customer_phone_number']
    
admin.site.register(Order, OrderAdmin)
