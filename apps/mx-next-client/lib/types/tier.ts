export interface Tier {
  name: string;
  id: string;
  icon: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}
