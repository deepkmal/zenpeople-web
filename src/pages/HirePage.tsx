import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IndustrySectors } from '../components/home/IndustrySectors';
import { Testimonials } from '../components/home/Testimonials';
import { ContactSection } from '../components/shared/ContactSection';

export function HirePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.state]);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Section 1 - White background, text left, image right */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="bg-white flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-20 py-12 sm:py-16 lg:py-24">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy mb-6 tracking-tight">
              Specialists in our field
            </h1>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
              We are specialists in facade and glazing recruitment. It's the sole focus of our work. <br /><br />Our clients consistently tell us that we deliver more qualified, industry-relevant candidates than any other agency. <br /><br />With over 30 years of combined recruitment experience, our deep understanding and dedication to this niche sector ensure you receive the expert attention your business deserves.
            </p>
          </div>
        </div>
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/facade-specialist.webp"
            alt="Facade and glazing construction"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section 2 - White background, image left, text right */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/specialists-employers.webp"
            alt="Firsthand industry knowledge"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#2175D9] flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-20 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] py-12 sm:py-16 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
              Firsthand industry knowledge
            </h2>
            <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
              What sets us apart is not just our focus, but our firsthand knowledge. Many members of our team have worked directly within the facade and glazing industry. This means you're speaking with people who truly understand the roles, challenges, and requirements unique to your field.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 - Dark navy background, text left, image right */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="bg-[#141B2D] flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-20 py-12 sm:py-16 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
              Our guarantee
            </h2>
            <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
              We're confident in our ability to outperform generalist recruiters. In fact, we guarantee that partnering with us will result in access to more high-quality candidates than going it alone or working with a broader agency and our client testimonials back this up. On top of that, ZenPeople will ensure that all employment assignments are successful. No wasted recruitment fee's - ask about our ironclad guarantee.
            </p>
          </div>
        </div>
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/our-guarantee.webp"
            alt="Our guarantee"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Industry Sectors Grid */}
      <IndustrySectors variant="hire" />

      {/* Testimonials */}
      <Testimonials variant="clients-only" />

      {/* Contact Form */}
      <ContactSection
        id="get-a-quote"
        heading="Get a quote."
        subtitle="Tell us about your hiring needs and we'll get back to you with a tailored solution."
        companyRequired
        hideMessage
        buttonLabel="Get quote"
        formType="quote"
      />
    </div>
  );
}
