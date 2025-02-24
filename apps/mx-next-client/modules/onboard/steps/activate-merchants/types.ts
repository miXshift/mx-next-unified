export interface Merchant {
  id: string;
  name: string;
  displayName: string;
  marketplace: string;
  availableData: string;
  status: 'Empty' | 'Modest';
  actions?: string;
}
