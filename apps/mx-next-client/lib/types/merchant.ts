export interface Merchant {
  lastChecked: any;
  id: string;
  name: string;
  marketplace: string;
  status: string;
  authStatus: 'authorized' | 'needsAuth' | 'lostAccess';
  dataTypes?: {
    ads: boolean;
    retail: boolean;
  };
}
