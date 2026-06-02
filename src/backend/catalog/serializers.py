from rest_framework import serializers
from .models import Product, Inventory

class InventorySerializer(serializers.ModelSerializer):
    available_quantity = serializers.ReadOnlyField()

    class __init__(self, *args, **kwargs):
        super(InventorySerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = Inventory
        fields = ['quantity', 'reserved_quantity', 'available_quantity']

class ProductSerializer(serializers.ModelSerializer):
    inventory = InventorySerializer(read_only=True)
    stock_quantity = serializers.IntegerField(write_only=True, required=False)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'inventory', 'stock_quantity', 'created_at', 'updated_at']

    def create(self, validated_data):
        stock_quantity = validated_data.pop('stock_quantity', 0)
        product = Product.objects.create(**validated_data)
        Inventory.objects.create(product=product, quantity=stock_quantity)
        return product
