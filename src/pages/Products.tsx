import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye, Search, SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  original_price: number;
  description: string;
  features: string[];
  image_url: string;
  created_at: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

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

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'All') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        if (max) {
          return product.price >= min && product.price <= max;
        } else {
          return product.price >= min;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
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

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="py-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-lg text-muted-foreground">Loading products...</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 px-6 bg-gradient-to-br from-background to-blue-50/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="gradient-text">Complete</span> Eyewear Collection
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our extensive range of premium eyewear with advanced filtering options
              </p>
            </div>

            {/* Search and Filter Controls */}
            <div className="glass-card p-6 rounded-2xl space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products, brands, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 text-lg h-12"
                />
              </div>

              {/* Filter Toggle */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-glass gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {products.length} products
                </div>
              </div>

              {/* Filters */}
              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Prices</SelectItem>
                        <SelectItem value="0-2000">Under ₹2,000</SelectItem>
                        <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                        <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="10000">Above ₹10,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name (A-Z)</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('All');
                        setPriceRange('All');
                        setSortBy('name');
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className={`glass-card card-hover group animate-fade-in-up animate-delay-${index * 50}`}
                  >
                    <CardContent className="p-6">
                      {/* Product Image */}
                      <div className="relative mb-4">
                        <div className="aspect-square bg-gradient-to-br from-primary/5 to-blue-100/10 rounded-2xl flex items-center justify-center text-6xl mb-4">
                          {product.image_url}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2 glass-card opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        {product.original_price > product.price && (
                          <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                            {calculateDiscount(product.original_price, product.price)}% OFF
                          </Badge>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <div>
                          <Badge variant="secondary" className="text-xs">
                            {product.category}
                          </Badge>
                          <h3 className="font-bold text-foreground mt-1 line-clamp-2">
                            {product.name}
                          </h3>
                        </div>

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {product.features.slice(0, 2).map((feature) => (
                              <span
                                key={feature}
                                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-foreground">
                            {formatPrice(product.price)}
                          </span>
                          {product.original_price > product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(product.original_price)}
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="btn-hero flex-1 group text-sm" 
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                          <Button variant="outline" className="btn-glass" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};