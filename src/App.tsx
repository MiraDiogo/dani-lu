import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CartDrawer } from './components/CartDrawer';
import { initDb, db } from './utils/db';
import type { Product, CartItem, User } from './types';

// Pages
import { EcommerceHome } from './pages/ecommerce/EcommerceHome';
import { ProductCatalog } from './pages/ecommerce/ProductCatalog';
import { ProductDetail } from './pages/ecommerce/ProductDetail';
import { Checkout } from './pages/ecommerce/Checkout';
import { OrderManagement } from './pages/ecommerce/OrderManagement';

import { DashboardHome } from './pages/consulting/DashboardHome';
import { AnamnesisForm } from './pages/consulting/AnamnesisForm';
import { UserWorkout } from './pages/consulting/UserWorkout';
import { ProgressTracker } from './pages/consulting/ProgressTracker';
import { PhysioAssessment } from './pages/consulting/PhysioAssessment';
import { VideoLibrary } from './pages/consulting/VideoLibrary';
import { TrainerPortal } from './pages/consulting/TrainerPortal';
import { PhysioPortal } from './pages/consulting/PhysioPortal';

function App() {
  // Initialize Database
  useEffect(() => {
    initDb();
  }, []);

  // Root Navigation States
  const [currentTab, setCurrentTab] = useState<'ecommerce' | 'consulting'>('ecommerce');
  const [currentUser, setCurrentUser] = useState<User>(db.getCurrentUser() || { id: 'client', name: 'Ana Silva', email: 'ana@dani-lu.com', role: 'client', avatar: '' });

  // E-commerce sub-navigation
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [catalogCategory, setCatalogCategory] = useState<'clothing' | 'accessories' | 'all'>('all');
  const [showCatalog, setShowCatalog] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [ordersMode, setOrdersMode] = useState(false);

  // Consulting Dashboard sub-navigation
  const [activeSection, setActiveSection] = useState('home');

  // Cart Drawer state
  const [cart, setCart] = useState<CartItem[]>(db.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Synchronize with role selection
  useEffect(() => {
    const handleRoleRefresh = () => {
      const u = db.getCurrentUser();
      setCurrentUser(u);
      
      // Auto redirect section based on role
      if (u.role === 'trainer') {
        setActiveSection('trainer_home');
      } else if (u.role === 'physio') {
        setActiveSection('physio_home');
      } else {
        setActiveSection('home');
      }
    };
    window.addEventListener('refresh_dashboard_role', handleRoleRefresh);
    return () => {
      window.removeEventListener('refresh_dashboard_role', handleRoleRefresh);
    };
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, qty: number, size: string, color: string) => {
    const cartId = `${product.id}-${size}-${color}`;
    const cartCopy = [...cart];
    const index = cartCopy.findIndex(item => item.id === cartId);

    if (index !== -1) {
      cartCopy[index].quantity += qty;
    } else {
      cartCopy.push({
        id: cartId,
        product,
        quantity: qty,
        selectedSize: size,
        selectedColor: color
      });
    }

    setCart(cartCopy);
    db.saveCart(cartCopy);
  };

  const handleAddToCartDirectly = (product: Product) => {
    const defaultSize = product.sizes[0] || 'Único';
    const defaultColor = product.colors[0]?.name || '';
    handleAddToCart(product, 1, defaultSize, defaultColor);
    setIsCartOpen(true); // open drawer
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    const cartCopy = cart.map(item => item.id === id ? { ...item, quantity: newQty } : item);
    setCart(cartCopy);
    db.saveCart(cartCopy);
  };

  const handleRemoveFromCart = (id: string) => {
    const cartCopy = cart.filter(item => item.id !== id);
    setCart(cartCopy);
    db.saveCart(cartCopy);
  };

  const handleClearCart = () => {
    setCart([]);
    db.saveCart([]);
  };

  // Nav actions
  const navigateToCatalog = (cat?: 'clothing' | 'accessories') => {
    setActiveProduct(null);
    setCheckoutMode(false);
    setOrdersMode(false);
    if (cat) {
      setCatalogCategory(cat);
    } else {
      setCatalogCategory('all');
    }
    setShowCatalog(true);
  };

  const handleViewProduct = (product: Product) => {
    setActiveProduct(product);
    setCheckoutMode(false);
    setOrdersMode(false);
    setShowCatalog(false);
  };

  const handleTriggerCheckout = () => {
    setIsCartOpen(false);
    setCheckoutMode(true);
    setOrdersMode(false);
    setActiveProduct(null);
    setShowCatalog(false);
  };

  const handleTriggerOrders = () => {
    setIsCartOpen(false);
    setOrdersMode(true);
    setCheckoutMode(false);
    setActiveProduct(null);
    setShowCatalog(false);
  };

  const handleBackToShop = () => {
    setOrdersMode(false);
    setCheckoutMode(false);
    setActiveProduct(null);
    setShowCatalog(false); // home e-commerce
  };

  const renderECommerceContent = () => {
    if (checkoutMode) {
      return (
        <Checkout
          cart={cart}
          clearCart={handleClearCart}
          onNavigateToOrders={handleTriggerOrders}
          onBackToCart={() => { setCheckoutMode(false); setIsCartOpen(true); }}
        />
      );
    }

    if (ordersMode) {
      return <OrderManagement onBackToShop={handleBackToShop} />;
    }

    if (activeProduct) {
      return (
        <ProductDetail
          product={activeProduct}
          onBack={() => { setActiveProduct(null); setShowCatalog(true); }}
          onAddToCart={handleAddToCart}
          onViewProduct={handleViewProduct}
        />
      );
    }

    if (showCatalog) {
      return (
        <ProductCatalog
          initialCategoryFilter={catalogCategory}
          onViewProduct={handleViewProduct}
          onAddToCartDirectly={handleAddToCartDirectly}
        />
      );
    }

    return (
      <EcommerceHome
        onNavigateToCatalog={navigateToCatalog}
        onNavigateToConsulting={() => { setCurrentTab('consulting'); }}
        onViewProduct={handleViewProduct}
      />
    );
  };

  const renderConsultingContent = () => {
    // Client section dispatcher
    if (currentUser.role === 'client') {
      switch (activeSection) {
        case 'anamnesis':
          return <AnamnesisForm />;
        case 'workout':
          return <UserWorkout />;
        case 'tracker':
          return <ProgressTracker />;
        case 'physio':
          return <PhysioAssessment />;
        case 'videos':
          return <VideoLibrary />;
        default:
          return <DashboardHome onNavigateSection={setActiveSection} />;
      }
    }

    // Professional sections
    if (currentUser.role === 'trainer') {
      switch (activeSection) {
        case 'videos':
          return <VideoLibrary />;
        default:
          return <TrainerPortal />;
      }
    }

    if (currentUser.role === 'physio') {
      switch (activeSection) {
        case 'videos':
          return <VideoLibrary />;
        default:
          return <PhysioPortal />;
      }
    }

    return null;
  };

  const totalCartItems = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // if switching to consulting, reset route if invalid for role
          if (tab === 'consulting') {
            if (currentUser.role === 'trainer') setActiveSection('trainer_home');
            else if (currentUser.role === 'physio') setActiveSection('physio_home');
            else setActiveSection('home');
          }
        }}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        cartCount={totalCartItems}
      />

      {/* Cart Slider */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        onCheckout={handleTriggerCheckout}
      />

      {/* Main Container Layout */}
      {currentTab === 'ecommerce' ? (
        <main className="container" style={{ padding: '40px 24px', flex: 1 }}>
          {renderECommerceContent()}
        </main>
      ) : (
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Dashboard Left Sidebar */}
          <Sidebar
            role={currentUser.role}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          {/* Dashboard Right content pane */}
          <main style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            {renderConsultingContent()}
          </main>
        </div>
      )}

      {/* Elegant Footer */}
      <footer style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        padding: '32px 24px',
        textAlign: 'center',
        fontSize: '13px',
        color: 'var(--text-secondary)'
      }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div>
            <strong>Dani&Lu Fitness Pro</strong> © 2026. Todos os direitos reservados.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('ecommerce')}>Loja E-commerce</span>
            <span style={{ cursor: 'pointer' }} onClick={() => { setCurrentTab('consulting'); setActiveSection('home'); }}>Consultoria</span>
            <span>Segurança & Privacidade</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
