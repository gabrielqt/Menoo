from rest_framework import serializers
from .models import Order, Food, OrderFood

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['id', 'name', 'price']

class OrderFoodSerializer(serializers.ModelSerializer):
    food = FoodSerializer() 

    class Meta:
        model = OrderFood
        fields = ['food', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    # campo para leitura dos order_foods
    order_foods = OrderFoodSerializer(source='orderfood_set', many=True, read_only=True)
    # campo para escrita dos order_foods
    order_foods_input = serializers.ListSerializer(child=serializers.DictField(), write_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'order_foods',  # campo para leitura
            'order_foods_input',  # campo para post
            'status',
            'order_date',
            'note',
            'customer_name',
            'customer_phone_number',
            'table'
        ]

    def create(self, validated_data):
        order_foods_data = validated_data.pop('order_foods_input', [])
        order = Order.objects.create(**validated_data)

        for order_food_data in order_foods_data:
            food_data = order_food_data['food']
            food = Food.objects.get(id=food_data['id'])
            OrderFood.objects.create(
                order=order,
                food=food,
                quantity=order_food_data['quantity']
            )
        return order
