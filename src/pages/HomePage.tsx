import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero, IntroSection, WhyUsSection, IndustrySectors, FeaturedJobs, Testimonials } from '../components/home';
import { ContactSection } from '../components/shared';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      // Clear the state so it doesn't scroll again on re-render
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  return (
    <>
      <Hero />
      <IntroSection />
      <WhyUsSection />
      <IndustrySectors />
      <FeaturedJobs />
      <Testimonials />
      <ContactSection />
    </>
  );
}
