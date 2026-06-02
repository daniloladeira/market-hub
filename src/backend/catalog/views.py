from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        # Em django-tenants, o queryset já é filtrado pelo schema atual
        # devido ao middleware que seta o search_path do PostgreSQL.
        return super().get_queryset()
