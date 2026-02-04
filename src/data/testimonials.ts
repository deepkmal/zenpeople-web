export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  type: 'client' | 'candidate';
}

export const testimonials: Testimonial[] = [
  // Candidate Reviews
  {
    id: '1',
    quote: "I would recommend Zen highly based on my recent recruitment experience. He was pro-active, understood what I was looking for and kept me well informed on progress. He was interested in my career, not just making another placement - great job.",
    name: 'Damien Willans',
    title: 'Lead Mechanical Engineer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '2',
    quote: "Zen has been absolutely amazing throughout the whole recruitment process. He is not a typical recruitment consultant as he listens and actually cares about his clients. Zen has always provided a knowledgeable and friendly service without being pushy.",
    name: 'Thiri Htet',
    title: 'Architectural Drafter',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '3',
    quote: "Zen possesses a deep understanding of the facade industry and an exceptional knowledge of what companies seek in their candidates. His ability to match the right talent to the right opportunities is unparalleled. He stands out as one of the best recruiters in the industry.",
    name: 'Derek Bruce',
    title: 'Design Manager',
    company: 'Empire Facades',
    type: 'candidate',
  },
  {
    id: '4',
    quote: "Zen played a crucial role in helping me secure a job in Australia. His professionalism, market insights, and genuine care for my career goals made the process seamless. Thanks to him, I landed a role that perfectly aligns with my ambitions.",
    name: 'Anas Al Amodi',
    title: 'Project Manager',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '5',
    quote: "Zen is a positive and encouraging professional recruitment consultant. He is open-minded, well-connected, and skilled at maintaining a balance between employees and employers. He respects your opinions and values your suggestions.",
    name: 'Jitendrakumar Agravat',
    title: 'Senior Facade Estimator',
    company: 'Supplyhaus',
    type: 'candidate',
  },
  {
    id: '6',
    quote: "I had the pleasure of working with Zen during my job search process, and I couldn't recommend him more highly. He was professional, supportive, and genuinely interested in helping me find the right opportunity. Thanks to his dedication, I successfully landed my current role.",
    name: 'Camila Rodrigues',
    title: 'Facade Designer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '7',
    quote: "From our very first conversation, Zen approached every interaction with kindness, respect, and a deep understanding of both the job market and individual needs. His guidance played a key role in helping me secure a position that truly aligns with my goals and values.",
    name: 'Farida Mehrabian',
    title: 'Civil Engineer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '8',
    quote: "Knowledgeable genuine person willing to listen who understands the complexities of integrating professionalism, skills, performance and personal specifics within organizational requirements. Highly recommend Zen in any capacity.",
    name: 'Zoran Ilic',
    title: 'Facade Consultant',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '9',
    quote: "Zen is a responsible person who keeps his promises and walks the talk. He has a positive attitude towards his work and is committed to provide his full attention. Great pleasure working together with him.",
    name: 'Kat Hong Kam',
    title: 'Associate Civil Engineer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '10',
    quote: "You helped me to find a new position and despite the hard time during lock down, you kept on checking the progress and never gave up. I definitely recommend you to anyone I may see that needs your service. We surely need more like you in this industry.",
    name: 'Behzad Manghooli',
    title: 'Design Draftsperson',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  {
    id: '11',
    quote: "I strongly recommend Zen to proceed with the job application, he was taken care of my entire process.",
    name: 'Ramanathan Lakshmanan',
    title: 'Senior Planning Engineer',
    company: 'Placed Candidate',
    type: 'candidate',
  },
  // Client Reviews
  {
    id: '12',
    quote: "Zen is tenacious and detailed. He considers his recommendations carefully tailoring them to your specific needs e.g work culture, future goals, lifestyle, location, leaders/role models, reputation etc. His proficiency in interpersonal skills makes him a great negotiator.",
    name: 'Ami Kono',
    title: 'Design Manager',
    company: 'Onsite Group',
    type: 'client',
  },
  {
    id: '13',
    quote: "Zen was and still is excellent to deal with, he has a professional, friendly and down to earth demeanour that facilitates trust in the process as a client. Months later he is still checking in on me with the role, showing a true care for client satisfaction.",
    name: 'Hamish Dodds',
    title: 'Managing Director & Founder',
    company: 'HD Glass Solutions',
    type: 'client',
  },
];
