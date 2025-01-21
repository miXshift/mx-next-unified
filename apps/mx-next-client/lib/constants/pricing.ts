import { Tier } from "../types/tier";

export const PricingTier: Tier[] = [
  {
    name: 'Starter',
    id: 'pro_01jd6epynrvg32h02ce4q94qap',
    icon: '/assets/icons/price-tiers/free-icon.svg',
    description: 'Ideal for individuals who want to get started with simple design tasks.',
    features: ['1 workspace', 'Limited collaboration', 'Export to PNG and SVG'],
    featured: false,
    priceId: { month: 'pri_01jd6ew1asv1sqkz0g8fnj0yx3', year: 'pri_01jd6eyvnjynnb6rs9hsny27rh' },
  },
  {
    name: 'Pro',
    id: 'pro_01jd6f7dx5jj6qxb3f1m1rz57w',
    icon: '/assets/icons/price-tiers/basic-icon.svg',
    description: 'Enhanced design tools for scaling teams who need more flexibility.',
    features: ['Integrations', 'Unlimited workspaces', 'Advanced editing tools', 'Everything in Starter'],
    featured: true,
    priceId: { month: 'pri_01jd6f8sadk9y1we22qt1hv896', year: 'pri_01jd6farnq0kb5n1az47zst310' },
  },
  {
    name: 'Enterprise',
    id: 'pro_01jd6femcb125qvxesqtzaba8k',
    icon: '/assets/icons/price-tiers/pro-icon.svg',
    description: 'Powerful tools designed for extensive collaboration and customization.',
    features: [
      'Single sign on (SSO)',
      'Advanced version control',
      'Assets library',
      'Guest accounts',
      'Everything in Pro',
    ],
    featured: false,
    priceId: { month: 'pri_01jd6fjqcrpnrfvxrbcdr6zppt', year: 'pri_01jd6fkz91pdkwbgy79fjpgskr' },
  },
];
