import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number;
  description: string;
  features: string[];
  image_url: string;
}

export const ProductShowcase = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <section id="products" className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-lg text-muted-foreground">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in-up">
          <div className="inline-block glass-card px-4 py-2 rounded-full text-sm font-medium text-primary">
            Our Premium Collection
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            <span className="gradient-text">Eyewear</span> for Every Style
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From classic designs to modern innovations, discover our carefully curated collection 
            of premium eyewear that combines style, comfort, and cutting-edge technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up animate-delay-200">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`btn-glass ${selectedCategory === category ? 'bg-primary text-white hover:bg-primary/90' : ''} animate-fade-in-up animate-delay-${200 + index * 50}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`glass-card p-6 rounded-2xl card-hover group animate-fade-in-up animate-delay-${300 + index * 100}`}
            >
              {/* Product Image */}
              <div className="relative mb-6">
                <div className="aspect-square bg-gradient-to-br from-primary/5 to-blue-100/10 rounded-2xl flex items-center justify-center text-6xl mb-4">
                  {product.image_url}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 glass-card opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-primary font-medium">{product.category}</div>
                  <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">{formatPrice(product.price)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.original_price)}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-auto">
                    Save {calculateDiscount(product.original_price, product.price)}%
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Button 
                    className="btn-hero flex-1 group" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="btn-glass">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 animate-fade-in-up animate-delay-800">
          <Button className="btn-hero">
            View Complete Collection
          </Button>
        </div>
      </div>
    </section>
  );
};