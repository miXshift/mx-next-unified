export interface AmazonConnectionData {
  accountName: string;
  amazonEmail: string;
  logoutConfirmed: boolean;
}

export interface AmazonAccount {
  id: string;
  name: string;
  email: string;
  connectedAt: string;
}
