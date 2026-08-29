import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Work from './pages/Work';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import AdminLogin from './pages/AdminLogin';
import AdminProductAdd from './pages/AdminProductAdd';
import AdminProductDetails from './pages/AdminProductDetails';
import AdminProductEdit from './pages/AdminProductEdit';
import AdminDashboardLayout from './components/admin/AdminDashboardLayout';
import AdminFounders from './components/admin/founders/AdminFounders';
import AdminTeam from './components/admin/team/AdminTeam';
import AdminServices from './components/admin/services/AdminServices';
import AdminProjects from './components/admin/projects/AdminProjects';
import AdminProducts from './components/admin/products/AdminProducts';
import AdminBlog from './components/admin/blog/AdminBlog';
import AdminContacts from './components/admin/contacts/AdminContacts';
import AdminPartners from './components/admin/partners/AdminPartners';
import AdminRecognitions from './components/admin/recognitions/AdminRecognitions';
import ProtectedRoute from './components/common/ProtectedRoute';
import './styles/globals.css';
import CustomBgWrapper from './components/reusables/CustomBgWrapper';
import { useLenis } from 'lenis/react';
import Recognitions from './pages/Recognitions';

// Component to handle scroll to top on route changes
function ScrollToTop() {
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [location.pathname, lenis]);

  return null;
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AdminProvider>
          <Router>
            <ScrollToTop />
            <CustomBgWrapper>
              <div className="min-h-screen transition-colors duration-300">
                <Navbar />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/recognitions" element={<Recognitions />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    
                    {/* Admin Routes */}
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute>
                          <AdminDashboardLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="founders" element={<AdminFounders />} />
                      <Route path="team" element={<AdminTeam />} />
                      <Route path="services" element={<AdminServices />} />
                      <Route path="projects" element={<AdminProjects />} />
                      <Route path="products" element={<AdminProducts />} />
                      <Route path="blog" element={<AdminBlog />} />
                      <Route path="contacts" element={<AdminContacts />} />
                      <Route path="partners" element={<AdminPartners />} />
                      <Route path="recognitions" element={<AdminRecognitions />} />
                      {/* Redirect /admin to /admin/founders by default */}
                      <Route index element={<AdminFounders />} />
                    </Route>

                    {/* Legacy admin dashboard route - redirect to new structure */}
                    <Route
                      path="/admin/dashboard"
                      element={<Navigate to="/admin" replace />}
                    />
                    <Route
                      path="/admin/products/add"
                      element={
                        <ProtectedRoute>
                          <AdminProductAdd />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/products/:id"
                      element={
                        <ProtectedRoute>
                          <AdminProductDetails />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/products/:id/edit"
                      element={
                        <ProtectedRoute>
                          <AdminProductEdit />
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </div>
            </CustomBgWrapper>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 4000,
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </Router>
        </AdminProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;