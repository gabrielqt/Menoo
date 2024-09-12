from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, RegexValidator
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(_('name'), max_length=80)

    class Meta:
        ordering = ['name']
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'

    def __str__(self):
        return self.name

class Food(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(_('name'), max_length=80)
    description = models.TextField(_('Description'), max_length=250)
    price = models.FloatField(_('Price'), validators=[MinValueValidator(0.0)])
    image = models.ImageField(_('Image Food'), upload_to='foods/', default='logo.avif')

    class Meta:
        ordering = ['price']
        verbose_name = 'Alimento'
        verbose_name_plural = 'Alimentos'

    def __str__(self):
        return self.name

# Modelo intermediário para associar pedidos e comidas, permitindo duplicatas.
class OrderFood(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.food.name} (x{self.quantity})"

class Order(models.Model):
    foods = models.ManyToManyField(Food, through='OrderFood')  # Usando o modelo intermediário.
    order_date = models.DateTimeField('Data-Hora do pedido', auto_now_add=True)
    note = models.TextField(_('Observation'), blank=True, null=True)
    customer_name = models.CharField(_('Customer Name'), max_length=90)
    phone_regex = RegexValidator(
        regex=r'^\d{2}\d{9}$',
        message="O número de telefone deve estar no formato: '(dd)988888888'. Até 11 dígitos são permitidos."
    )
    customer_phone_number = models.CharField(validators=[phone_regex], max_length=11)
    
    STATUS_CHOICES = [
        ('Aguardando','Aguardando'),
        ('Visto','Visto')
    ]
    
    status = models.CharField(max_length=22, default='Aguardando', choices=STATUS_CHOICES)
    table = models.IntegerField(_('Número da mesa'), default=None, blank=True, null=True)

    @property
    def preco_total(self):
        # Calcular o preço total considerando a quantidade de cada item.
        return sum(order_food.food.price * order_food.quantity for order_food in self.orderfood_set.all())


    def get_absolute_url(self):
        return reverse('order-detail', args=[str(self.id)])
    
    
    class Meta:
        ordering = ['order_date']

    def __str__(self):
        return 'Pedido: ' + str(self.id)
