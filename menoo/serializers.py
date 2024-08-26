from rest_framework import serializers
from .models import Order, Food

class FoodSerialiazer(serializers.ModelSerializer):
    
    class Meta:
        model = Food
        fields = ['name']

class OrderSerializer(serializers.ModelSerializer):
    
    foods = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Food.objects.all()
    )

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
            'customer_phone_number',
            'table'
        ]
        
        
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['foods'] = FoodSerialiazer(instance.foods.all(), many=True).data
        return ret