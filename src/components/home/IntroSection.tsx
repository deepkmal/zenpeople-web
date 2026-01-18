import { Container } from '../ui/Container';

export function IntroSection() {
  return (
    <section id="services" className="pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-24 lg:pb-20 bg-[#141B2D] scroll-mt-20">
      <Container>
        <div className="max-w-4xl text-white text-base sm:text-lg md:text-xl lg:text-2xl font-medium lg:font-light leading-relaxed tracking-tight space-y-4 sm:space-y-5 lg:space-y-6">
          <p>
            Every hiring situation is different — some roles need to be filled fast, others demand niche
            expertise, and budgets can vary widely.
          </p>
          <p>
            That's why <span className="font-semibold"><span className="text-[#60A5FA]">Zen</span>People</span> takes a customised approach to recruitment. We don't believe in
            standardised solutions or generic processes.
          </p>
          <p>
            Instead, we take the time to understand the specifics of your business, the role, and the
            wider context — whether that's your team dynamics, project scope, or location. From there,
            we offer tailored strategies that are both flexible and cost-effective, always aiming to
            find the smartest path to the right hire.
          </p>
        </div>
      </Container>
    </section>
  );
}
