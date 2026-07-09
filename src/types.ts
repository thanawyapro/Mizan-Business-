export interface Product {
  code: string;
  name: string;
  category: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
  status: 'نشط' | 'محدود' | 'منفذ';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  time: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  balance: number;
  lastPurchase: string;
}

export interface InvoiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
}

export type BusinessType = 'محل تجاري' | 'مطعم/كافيه' | 'جيم' | 'صالون' | 'مخزن' | 'نشاط عام';

export type PaymentMethod = 'كاش' | 'فيزا' | 'محفظة' | 'آجل';
