export interface Job {
  id: string;
  title: string;
  sector: string;
  description: string;
  type: 'Permanent' | 'Contract' | 'Casual';
  location: string;
  salary: string;
  postedDate: string;
  slug: string;
}

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Facade Engineer',
    sector: 'Engineering & Consulting',
    description: 'We are seeking an experienced Senior Facade Engineer to join a leading consultancy in Sydney. You will lead complex facade design projects, mentor junior engineers, and work directly with architects and contractors on high-profile commercial developments.',
    type: 'Permanent',
    location: 'Sydney, NSW',
    salary: '$140k - $160k + super',
    postedDate: '2026-01-15',
    slug: 'senior-facade-engineer-sydney',
  },
  {
    id: '2',
    title: 'Project Manager - Curtain Wall',
    sector: 'Facade Manufacturing',
    description: 'An established facade manufacturer is looking for a skilled Project Manager to oversee curtain wall installation projects across Melbourne. This role involves managing timelines, budgets, and client relationships while ensuring quality standards are met.',
    type: 'Permanent',
    location: 'Melbourne, VIC',
    salary: '$130k - $150k + super',
    postedDate: '2026-01-14',
    slug: 'project-manager-curtain-wall-melbourne',
  },
  {
    id: '3',
    title: 'Remedial Works Supervisor',
    sector: 'Remedial Construction',
    description: 'A growing remedial construction company requires an experienced Supervisor to lead on-site teams across Brisbane. You will coordinate facade remediation works, ensure safety compliance, and maintain strong relationships with building managers.',
    type: 'Permanent',
    location: 'Brisbane, QLD',
    salary: '$110k - $125k + super',
    postedDate: '2026-01-12',
    slug: 'remedial-works-supervisor-brisbane',
  },
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
