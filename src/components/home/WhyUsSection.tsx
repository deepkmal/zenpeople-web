import { Link } from 'react-router-dom';
import { Building2, HardHat, Globe, Trophy, ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';

const valueProps = [
  {
    icon: Building2,
    title: 'Facade & glazing specialists',
    description:
      "We focus exclusively on the facade and glazing industry. It's all we do, so we do it better than anyone else.",
  },
  {
    icon: HardHat,
    title: 'Real industry experience',
    description:
      'Our team has worked in facade and glazing. We understand the roles, challenges, and what it takes to succeed.',
  },
  {
    icon: Globe,
    title: 'Australia-wide coverage',
    description:
      'From Sydney to Perth, Melbourne to Brisbane - we recruit for companies across every major Australian city.',
  },
  {
    icon: Trophy,
    title: '30+ years combined experience',
    description:
      'Our consultants bring decades of recruitment expertise, with a proven track record of successful placements.',
  },
];

export function WhyUsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy mb-6">
            Why us?
          </h2>
          <div className="text-gray-600 leading-relaxed space-y-4">
            <p>
              Every hiring situation is different — some roles need to be filled fast, others demand niche
              expertise, and budgets can vary widely.
            </p>
            <p>
              That's why ZenPeople takes a customised approach to recruitment. We don't believe in
              standardised solutions or generic processes.
            </p>
            <p>
              Instead, we take the time to understand the specifics of your business, the role, and the
              wider context — whether that's your team dynamics, project scope, or location. From there,
              we offer tailored strategies that are both flexible and cost-effective, always aiming to
              find the smartest path to the right hire.
            </p>
          </div>
        </div>

        {/* Value Props Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-navy rounded-lg flex items-center justify-center">
                  <prop.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy mb-2">{prop.title}</h3>
                  <p className="text-gray-600">{prop.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-gray-600 mb-3">I'm hiring</p>
            <Link
              to="/hire"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-navy text-white font-medium hover:bg-navy/90 transition-colors"
            >
              Get me a quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-3">I'm a candidate</p>
            <Link
              to="/jobs"
              className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 text-navy font-medium hover:bg-gray-50 transition-colors"
            >
              Show me what's available
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
