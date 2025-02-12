import { v4 as uuidv4 } from 'uuid';
import { Account } from './reportTable.types';
import { format, subDays } from 'date-fns';

function getRandomDate(): string {
  const end = new Date();
  const start = subDays(end, 365); // 1 year ago

  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  return format(randomDate, 'yyyy-MM-dd');
}

export const mockData: Account[] = [
  {
    id: uuidv4(),
    dateAdded: getRandomDate(),
    status: 'active',
    activeMerchants: 2,
    inactiveMerchants: 1,
    totalMerchants: 3,
    merchantName: 'Zoomget',
    marketPlace: 'US',
    amazonAccountLogin: 'Amazon+Clients@dashapplications.com',
  },
  {
    id: uuidv4(),
    dateAdded: getRandomDate(),
    status: 'pending',
    activeMerchants: 2,
    inactiveMerchants: 1,
    totalMerchants: 3,
    merchantName: 'Zoomget',
    marketPlace: 'US',
    amazonAccountLogin: 'Amazon+Clients@dashapplications.com',
  },
  {
    id: uuidv4(),
    dateAdded: getRandomDate(),
    status: 'pending',
    activeMerchants: 0,
    inactiveMerchants: 0,
    totalMerchants: 0,
    merchantName: 'Zoomget',
    marketPlace: 'US',
    amazonAccountLogin: 'GlobalTrade',
  },
  {
    id: uuidv4(),
    dateAdded: getRandomDate(),
    status: 'active',
    activeMerchants: 5,
    inactiveMerchants: 2,
    totalMerchants: 7,
    merchantName: 'Zoomget',
    marketPlace: 'US',
    amazonAccountLogin: 'GlobalTrade',
  },
  {
    id: uuidv4(),
    dateAdded: getRandomDate(),
    status: 'suspended',
    activeMerchants: 0,
    inactiveMerchants: 3,
    totalMerchants: 3,
    merchantName: 'Zoomget',
    marketPlace: 'US',
    amazonAccountLogin: 'FastShip',
  },
];
