import { Product, ProductStatus } from './types';

export const toINR = (val: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

export const formatDate = (date: Date): string => {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
};

export const parseDate = (ddmmyyyy: string): Date => {
  const [d, m, y] = ddmmyyyy.split('/').map(Number);
  return new Date(y, m - 1, d);
};

export const getProductStatus = (product: Product, predictedDemand?: number): ProductStatus => {
  const expiry = parseDate(product.expiryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (expiry < today) return 'EXPIRED';
  if (product.currentStock < product.minThreshold) return 'LOW_STOCK';
  if (predictedDemand && product.currentStock > predictedDemand * 2) return 'OVERFLOW';
  return 'OK';
};

export const generateId = () => crypto.randomUUID();

// Seed data
export const seedProducts = (): Product[] => [
  { id: generateId(), name: 'Amul Butter 500g', category: 'Dairy', sku: 'DAI-001', currentStock: 45, unitPrice: 270, minThreshold: 20, expiryDate: '25/03/2026', addedDate: '01/01/2026' },
  { id: generateId(), name: 'Aashirvaad Atta 5kg', category: 'Grains', sku: 'GRN-001', currentStock: 120, unitPrice: 325, minThreshold: 30, expiryDate: '15/09/2026', addedDate: '01/01/2026' },
  { id: generateId(), name: 'Britannia Bread', category: 'Bakery', sku: 'BAK-001', currentStock: 8, unitPrice: 45, minThreshold: 15, expiryDate: '20/03/2026', addedDate: '15/03/2026' },
  { id: generateId(), name: 'Tata Tea Gold 500g', category: 'Beverages', sku: 'BEV-001', currentStock: 200, unitPrice: 285, minThreshold: 25, expiryDate: '01/12/2026', addedDate: '01/02/2026' },
  { id: generateId(), name: 'Fortune Sunflower Oil 1L', category: 'Oil & Ghee', sku: 'OIL-001', currentStock: 55, unitPrice: 155, minThreshold: 20, expiryDate: '10/06/2026', addedDate: '01/03/2026' },
  { id: generateId(), name: 'Parle-G Biscuits', category: 'Snacks', sku: 'SNK-001', currentStock: 5, unitPrice: 10, minThreshold: 50, expiryDate: '01/03/2026', addedDate: '01/01/2026' },
  { id: generateId(), name: 'Haldiram Namkeen 400g', category: 'Snacks', sku: 'SNK-002', currentStock: 35, unitPrice: 120, minThreshold: 15, expiryDate: '30/07/2026', addedDate: '01/02/2026' },
  { id: generateId(), name: 'MDH Garam Masala 100g', category: 'Spices', sku: 'SPI-001', currentStock: 60, unitPrice: 85, minThreshold: 10, expiryDate: '01/01/2027', addedDate: '01/01/2026' },
];

export const seedSuppliers = (): Supplier[] => [
  { id: generateId(), name: 'Amul India Ltd.', contact: '+91 98765 43210', email: 'supply@amul.coop', category: 'Dairy', rating: 5 },
  { id: generateId(), name: 'ITC Foods Division', contact: '+91 98765 43211', email: 'procurement@itc.in', category: 'Grains', rating: 4 },
  { id: generateId(), name: 'Britannia Industries', contact: '+91 98765 43212', email: 'orders@britannia.co.in', category: 'Bakery', rating: 4 },
  { id: generateId(), name: 'Tata Consumer Products', contact: '+91 98765 43213', email: 'sales@tataconsumer.com', category: 'Beverages', rating: 5 },
];

import { Supplier } from './types';
