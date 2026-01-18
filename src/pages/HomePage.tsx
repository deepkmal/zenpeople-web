import { Hero, WhyUsSection, IndustrySectors, FeaturedJobs, Testimonials } from '../components/home';
import { ContactSection } from '../components/shared';

export function HomePage() {
  return (
    <>
      <Hero />
      <WhyUsSection />
      <IndustrySectors />
      <FeaturedJobs />
      <Testimonials />
      <ContactSection />
    </>
  );
}
