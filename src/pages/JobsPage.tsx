import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { IndustrySectors } from '../components/home/IndustrySectors';
import { Testimonials } from '../components/home/Testimonials';
import { ResumeUploadSection } from '../components/jobs/ResumeUploadSection';

export function JobsPage() {
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
              Find me a job
            </h1>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
              Because we focus exclusively on facade and glazing roles, we're able to connect skilled professionals like you with opportunities that truly match your experience and career goals. If you've got the right background, chances are we already have roles that align with exactly what you're looking for.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="mt-8 font-semibold hover:scale-105 hover:shadow-lg transition-all duration-200"
              onClick={() => document.getElementById('register-resume')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Match me with employment opportunities
            </Button>
          </div>
        </div>
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/facade-specialist.webp"
            alt="Facade and glazing professional"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Section 2 - Blue background, image left, text right */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/sectors/engineering.webp"
            alt="Career development"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="bg-[#2175D9] flex items-center px-6 sm:px-10 lg:pl-16 xl:pl-20 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))] py-12 sm:py-16 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
              Your career, your way
            </h2>
            <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
              We understand that searching for a new job can feel overwhelming — that's why we take the time to get to know you, your motivations, and what you really want from your next move. From there, we'll share roles that suit your profile, and you decide which ones you'd like to pursue. You're always in control of the process, and of course, everything you share with us remains 100% confidential.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 - Dark navy background, text left, image right */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
        <div className="bg-[#141B2D] flex items-center px-6 sm:px-10 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-16 xl:pr-20 py-12 sm:py-16 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
              We work for you - confidentially
            </h2>
            <p className="text-white/80 text-base sm:text-lg lg:text-xl leading-relaxed">
              We are always working to get you an interview. Once we confidently begin approaching our clients on your behalf, we will constantly be working hard behind the scenes to provide interviews for you. We never stop unless you advise us to. And yes, we will keep you updated throughout the entire process. However, please feel free to check back with us at any point on your applications. And of course our number one priority is protecting your anonymity, especially if you already have a job.
            </p>
          </div>
        </div>
        <div className="hidden lg:block relative lg:min-h-[500px]">
          <img
            src="/images/sectors/executive-search.webp"
            alt="Professional support"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Resume Upload Section */}
      <ResumeUploadSection id="register-resume" />

      {/* Industry Sectors Grid */}
      <IndustrySectors variant="hire" />

      {/* Testimonials - Candidates only */}
      <Testimonials variant="candidates-only" />
    </div>
  );
}
