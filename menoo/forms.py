from django import forms
from .models import *

class NewCategory(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']
        
        #VALIDAR TAMANHO DO ANAME
        
class NewFood(forms.ModelForm):
    class Meta:
        model = Food
        fields = ['category','name','description','price','image']