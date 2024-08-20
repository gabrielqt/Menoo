from django.test import TestCase
import requests
# Create your tests here.

response = requests.post('http://127.0.0.1:8000/menu/api/order-create/',
                         data={"foods": [1,2],"preco_total": 5.34,"note": "teste", "customer_name": "teste","customer_phone_number": "46988024258"})

print(response.status_code)
print(response.text)