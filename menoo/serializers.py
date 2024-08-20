from rest_framework import serializers
from .models import Order, Food

class FoodSerialiazer(serializers.ModelSerializer):
    
    class Meta:
        model = Food
        fields = ['name']

class OrderSerializer(serializers.ModelSerializer):
    
    foods = FoodSerialiazer(many=True)
    
    class Meta:
        model = Order
        fields = [
            'id',
            'foods',
            'preco_total',
            'status',
            'order_date',
            'note',
            'customer_name',
            'customer_phone_number'
        ]
    