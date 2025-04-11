export interface Account {
  id: string;
  dateAdded: string;
  status: 'active' | 'pending' | 'suspended' | 'deleted' | 'review';
  activeMerchants: number;
  inactiveMerchants: number;
  totalMerchants: number;
  amazonAccountLogin: string;
  merchantName?: string;
  marketPlace?: string;
}
