export interface Position {
  id: string;
  name: string;
}

export interface Sector {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  positions: Position[];
}

export const sectors: Sector[] = [
  {
    id: '1',
    name: 'Engineering, Design & Consulting',
    slug: 'engineering-consulting',
    image: '/images/sectors/engineering.webp',
    description: 'We connect top engineering and consulting talent with leading facade and glazing companies across Australia. From structural engineers to facade consultants, we understand the technical expertise required in this specialised field.',
    positions: [
      { id: 'facade-engineer', name: 'Facade Engineer' },
      { id: 'remedial-consulting', name: 'Remedial Consulting' },
      { id: 'structural-engineering', name: 'Structural Engineering' },
      { id: 'civil-engineer', name: 'Civil Engineer' },
      { id: 'facade-consulting', name: 'Facade Consulting' },
      { id: 'building-consulting', name: 'Building Consulting' },
    ],
  },
  {
    id: '2',
    name: 'Facade Manufacturing & Supply',
    slug: 'facade-manufacturing',
    image: '/images/sectors/facade-manufacturing.webp',
    description: 'From production managers to quality controllers, we recruit for all roles within facade manufacturing and supply chains. Our deep industry knowledge ensures we find candidates who understand the complexities of modern facade systems.',
    positions: [
      { id: 'facade', name: 'Facade' },
      { id: 'glazing', name: 'Glazing' },
      { id: 'windows', name: 'Windows' },
      { id: 'cladding', name: 'Cladding' },
      { id: 'louvres', name: 'Louvres' },
      { id: 'curtain-wall', name: 'Curtain Wall' },
      { id: 'remedial', name: 'Remedial' },
      { id: 'glass', name: 'Glass' },
    ],
  },
  {
    id: '3',
    name: 'Remedial Construction',
    slug: 'remedial-construction',
    image: '/images/sectors/remedial.webp',
    description: 'Remedial construction requires specialised knowledge of building defects, waterproofing, and facade repair. We source experienced professionals who can diagnose and resolve complex building issues.',
    positions: [
      { id: 'fabricators', name: 'Fabricators' },
      { id: 'cnc', name: 'CNC' },
      { id: 'factory-managers', name: 'Factory Managers' },
      { id: 'production-managers', name: 'Production Managers' },
      { id: 'glaziers-installers', name: 'Glaziers/Installers' },
      { id: 'site-supervisors-managers', name: 'Site Supervisors/Managers' },
      { id: 'admin-coordinators-reception', name: 'Admin/Coordinators/Reception' },
      { id: 'accounts-finance', name: 'Accounts/Accountants/Finance' },
      { id: 'estimators', name: 'Estimators' },
    ],
  },
  {
    id: '4',
    name: 'Sales & Marketing',
    slug: 'sales-marketing',
    image: '/images/sectors/sales-marketing.webp',
    description: 'Sales and marketing professionals in the facade industry need to understand technical products and long sales cycles. We find talent who can bridge the gap between technical knowledge and commercial success.',
    positions: [
      { id: 'sales-bdm', name: "Sales and BDM's" },
      { id: 'managers-executives', name: 'Managers and Executives' },
      { id: 'engineers', name: 'Engineers' },
      { id: 'designers-drafters', name: 'Designers/Drafters' },
      { id: 'contractors', name: 'Contractors' },
      { id: 'contracts-admin-managers', name: 'Contracts Admin/Managers' },
      { id: 'construction-managers', name: 'Construction Managers' },
      { id: 'procurement-purchasing', name: 'Procurement/Purchasing' },
      { id: 'logistics', name: 'Logistics' },
      { id: 'project-managers-coordinators', name: 'Project Managers/Coordinators' },
    ],
  },
  {
    id: '5',
    name: 'Business Support & Admin',
    slug: 'business-support',
    image: '/images/sectors/business-support.webp',
    description: 'Every successful facade company needs strong administrative and operational support. We recruit professionals who keep businesses running smoothly, from finance teams to HR and administration.',
    positions: [
      { id: 'office-manager', name: 'Office Manager' },
      { id: 'hr-manager', name: 'HR Manager' },
      { id: 'finance-manager', name: 'Finance Manager' },
      { id: 'accounts-payable', name: 'Accounts Payable' },
      { id: 'executive-assistant', name: 'Executive Assistant' },
      { id: 'receptionist', name: 'Receptionist' },
    ],
  },
  {
    id: '6',
    name: 'Executive Search',
    slug: 'executive-search',
    image: '/images/sectors/executive-search.webp',
    description: 'For senior leadership and executive roles, we offer a discrete and thorough search process. We identify and engage with top-tier candidates who can drive your business forward.',
    positions: [
      { id: 'ceo', name: 'CEO' },
      { id: 'head-of-sales', name: 'Head of Sales' },
      { id: 'construction-manager', name: 'Construction Manager' },
      { id: 'state-manager', name: 'State Manager' },
      { id: 'cfo', name: 'CFO' },
      { id: 'head-of-marketing', name: 'Head of Marketing' },
      { id: 'business-development-manager', name: 'Business Development Manager' },
      { id: 'general-manager', name: 'General Manager' },
      { id: 'coo', name: 'COO' },
      { id: 'engineering-manager', name: 'Engineering Manager' },
      { id: 'head-of-legal', name: 'Head of Legal' },
      { id: 'operations-manager', name: 'Operations Manager' },
    ],
  },
];

export function getSectorBySlug(slug: string): Sector | undefined {
  return sectors.find((sector) => sector.slug === slug);
}
