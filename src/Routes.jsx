import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import ProductReviews from "pages/product-reviews";
import ArticleDetail from "pages/article-detail";
import PhotographyGallery from "pages/photography-gallery";
import EventsCalendar from "pages/events-calendar";
import PhotographerProfiles from "pages/photographer-profiles";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/product-reviews" element={<ProductReviews />} />
        <Route path="/article-detail" element={<ArticleDetail />} />
        <Route path="/photography-gallery" element={<PhotographyGallery />} />
        <Route path="/events-calendar" element={<EventsCalendar />} />
        <Route path="/photographer-profiles" element={<PhotographerProfiles />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;