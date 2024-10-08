# Generated by Django 5.1 on 2024-09-07 19:24

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menoo', '0005_alter_food_description'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='foods',
        ),
        migrations.CreateModel(
            name='OrderFood',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('food', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menoo.food')),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menoo.order')),
            ],
        ),
    ]
