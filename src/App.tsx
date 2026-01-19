import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ContactPage } from './pages/ContactPage';
import { HirePage } from './pages/HirePage';
import { JobsPage } from './pages/JobsPage';
import { SectorPage } from './pages/SectorPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Placeholder routes - pages to be implemented */}
          <Route path="/services" element={<PlaceholderPage title="Our Services" />} />
          <Route path="/talent" element={<JobsPage />} />
          <Route path="/jobs" element={<PlaceholderPage title="Job Board" />} />
          <Route path="/jobs/:slug" element={<PlaceholderPage title="Job Details" />} />
          <Route path="/employers" element={<HirePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sectors/:slug" element={<SectorPage />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

// Temporary placeholder component for routes not yet implemented
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">{title}</h1>
        <p className="text-gray-600">This page is coming soon.</p>
      </div>
    </div>
  );
}

export default App;
