import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import { ImageZonesProvider } from "@/hooks/useImageZones";
import Index from "./pages/Index";
import RoomsPage from "./pages/RoomsPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import GalleryPage from "./pages/GalleryPage";
import AttractionsPage from "./pages/AttractionsPage";
import RestaurantPage from "./pages/RestaurantPage";
import AmenitiesPage from "./pages/AmenitiesPage";
import LocationPage from "./pages/LocationPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";

import ImageZonesEditor from "./pages/admin/ImageZonesEditor";
import RoomEditor from "./pages/admin/RoomEditor";
import MenuEditor from "./pages/admin/MenuEditor";
import ContentEditor from "./pages/admin/ContentEditor";
import Settings from "./pages/admin/Settings";
import Login from "./pages/admin/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ImageZonesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/rooms/:slug" element={<RoomDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/restaurant" element={<RestaurantPage />} />
            <Route path="/amenities" element={<AmenitiesPage />} />
            <Route path="/location" element={<LocationPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* CMS Routes - Secured */}
            <Route path="/cms-sign" element={<Login />} />
            <Route path="/cms-panel" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />

              <Route path="zones" element={<ImageZonesEditor />} />
              <Route path="rooms" element={<RoomEditor />} />
              <Route path="restaurant" element={<MenuEditor />} />
              <Route path="content" element={<ContentEditor />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ImageZonesProvider>
  </QueryClientProvider>
);

export default App;


