from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, RegexValidator

# Create your models here.
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
    description = models.TextField(_('Description'))
    price = models.FloatField(_('Price'), validators=[MinValueValidator(0.0)])
    image = models.ImageField(_('Image Food'),upload_to='foods/', default='logo.avif')
    
    class Meta:
        
        ordering = ['price']
        verbose_name = 'Alimento'
        verbose_name_plural = 'Alimentos'
        
    def __str__(self):
        return self.name
        
class Order(models.Model):
    
    foods = models.ManyToManyField(Food)
    order_date = models.DateTimeField('Data-Hora do pedido',auto_now_add=True)
    note = models.TextField(_('Observation'), blank=True, null=True)
    customer_name = models.CharField(_('Customer Name'), max_length=90)
    phone_regex = RegexValidator(
        regex=r'^\d{2}\d{9}$', 
        message="O número de telefone deve estar no formato: '(dd)988888888'. Até 11 dígitos são permitidos."
    )
    customer_phone_number = models.CharField(validators=[phone_regex], max_length=11)
    
    status_choices = {
        'Aguardando Atendimento':'Aguardando Atendimento',
        'Em Preparo':'Em Preparo',
        'Entregue':'Entregue',
        'Pago':'Pago'
                      }
    
    status = models.CharField(max_length=22, default='Aguardando Atendimento', 
                              choices=status_choices)
    
    table = models.IntegerField(_('Número da mesa'), default=None, blank=True, null=True)
    
    @property
    def preco_total(self):        
        return sum(food.price for food in self.foods.all())
            
        
    
    class Meta:
        ordering = ['order_date']
    
    def __str__(self):
        return 'Pedido: ' + str(self.id)