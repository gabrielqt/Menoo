from django import forms
from .models import *

class NewCategory(forms.ModelForm):
    class Meta:
        model = Category
        fields = ['name']

    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')

        if name and len(name) < 5:
            raise forms.ValidationError('O nome deve ter no mínimo 5 caracteres.')

        return cleaned_data

        
class NewFood(forms.ModelForm):
    class Meta:
        model = Food
        fields = ['category','name','description','price','image']