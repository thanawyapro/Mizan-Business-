import React, { useState } from 'react';
import { Card, Button, Badge } from '../ReusableUI';
import { Product, CartItem, Customer, PaymentMethod } from '../../types';
import { Search, ShoppingCart, Trash2, Plus, Minus, Tag, CreditCard, Receipt, RotateCcw } from 'lucide-react';

interface POSScreenProps {
  products: Product[];
  customers: Customer[];
  posCart: CartItem[];
  setPosCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  posDiscount: number;
  setPosDiscount: (val: number) => void;
  posPaymentMethod: PaymentMethod;
  setPosPaymentMethod: (val: PaymentMethod) => void;
  selectedPOSCustomer: string;
  setSelectedPOSCustomer: (val: string) => void;
  taxEnabled: boolean;
  currency: string;
  onCheckout: () => void;
  onSuspend: () => void;
  onReturnInvoice: () => void;
}

export default function POSScreen({
  products,
  customers,
  posCart,
  setPosCart,
  posDiscount,
  setPosDiscount,
  posPaymentMethod,
  setPosPaymentMethod,
  selectedPOSCustomer,
  setSelectedPOSCustomer,
  taxEnabled,
  currency,
  onCheckout,
  onSuspend,
  onReturnInvoice,
}: POSScreenProps) {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [barcodeQuery, setBarcodeQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // Categories list
  const categories = ['الكل', 'البقالة', 'المشروبات', 'المنظفات', 'المجمدات'];

  // Add item to cart
  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    const existing = posCart.find((item) => item.product.code === product.code);
    if (existing) {
      setPosCart(
        posCart.map((item) =>
          item.product.code === product.code
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setPosCart([...posCart, { product, quantity: 1 }]);
    }
  };

  // Update Qty
  const updateQty = (code: string, delta: number) => {
    setPosCart(
      posCart
        .map((item) => {
          if (item.product.code === code) {
            const nextQty = item.quantity + delta;
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove from cart
  const removeFromCart = (code: string) => {
    setPosCart(posCart.filter((item) => item.product.code !== code));
  };

  // Calculate totals
  const subtotal = posCart.reduce((sum, item) => sum + item.product.sellPrice * item.quantity, 0);
  const tax = taxEnabled ? subtotal * 0.15 : 0;
  const total = subtotal + tax - posDiscount;

  // Filter products based on category and search query
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'الكل' || p.category === selectedCategory;
    const matchesSearch = p.name.includes(searchQuery) || p.code.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  // Handle barcode input enter emulator
  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barcodeQuery.trim()) return;
    const found = products.find((p) => p.code === barcodeQuery.trim());
    if (found) {
      addToCart(found);
      setBarcodeQuery('');
    }
  };

  return (
    <div className="grid grid-cols-12 gap-6 animate-fadeIn">
      
      {/* LEFT COLUMN: ACTIVE BILL CART & TOTALS (Width: 5/12) */}
      <div className="col-span-5 bg-white border border-[#cbdbf5] rounded-xl p-5 flex flex-col justify-between h-[660px]">
        
        {/* Cart Header */}
        <div>
          <div className="flex justify-between items-center pb-3.5 border-b border-slate-100 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">سلة المبيعات الجارية</span>
              <span className="text-xs font-bold text-[#031635] font-mono">INV-{new Date().getFullYear()}-0348</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 font-bold font-sans">العميل:</span>
              <select
                value={selectedPOSCustomer}
                onChange={(e) => setSelectedPOSCustomer(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#031635] bg-white font-bold text-slate-700"
              >
                <option value="عميل نقدي">عميل نقدي (افتراضي)</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cart Table Container */}
          <div className="h-[260px] overflow-y-auto pr-1">
            {posCart.length === 0 ? (
              <div className="h-full flex flex-col justify-center items-center text-slate-300 py-12">
                <ShoppingCart className="w-12 h-12 text-slate-200" />
                <span className="text-xs font-bold mt-3 text-slate-400">سلة المبيعات فارغة تماماً</span>
                <span className="text-[10px] text-slate-400 mt-1">انقر على أي منتج من الشبكة لإضافته فوراً</span>
              </div>
            ) : (
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-100 font-bold">
                    <th className="p-2">الصنف</th>
                    <th className="p-2 text-center">الكمية</th>
                    <th className="p-2 text-center">السعر</th>
                    <th className="p-2 text-center">الإجمالي</th>
                    <th className="p-2 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {posCart.map((item) => (
                    <tr key={item.product.code} className="border-b border-slate-50 font-mono text-[11px] group">
                      <td className="p-2 font-sans">
                        <span className="block font-bold text-slate-800 leading-snug">{item.product.name}</span>
                        <span className="text-[9px] text-slate-400">كود: {item.product.code}</span>
                      </td>
                      <td className="p-2 text-center">
                        <div className="inline-flex items-center gap-1.5 bg-slate-100 rounded-full px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.code, -1)}
                            className="w-4 h-4 rounded-full bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-red-50 hover:text-red-600 cursor-pointer"
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-bold text-xs text-[#031635] px-1">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.product.code, 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-4 h-4 rounded-full bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-emerald-50 hover:text-emerald-600 cursor-pointer disabled:opacity-40"
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </td>
                      <td className="p-2 text-center text-slate-600">{item.product.sellPrice.toFixed(2)}</td>
                      <td className="p-2 text-center font-bold text-[#031635]">
                        {(item.product.sellPrice * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.code)}
                          className="text-slate-300 hover:text-red-600 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Totals & Payments */}
        <div>
          {/* Summary Box */}
          <div className="bg-[#f8f9ff] p-4 rounded-xl border border-[#e5eeff] space-y-2.5 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">مجموع الفاتورة قبل الضريبة</span>
              <span className="font-mono font-bold text-slate-700">{subtotal.toFixed(2)} {currency}</span>
            </div>
            
            {taxEnabled && (
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 font-semibold">ضريبة القيمة المضافة (15%)</span>
                <span className="font-mono font-bold text-slate-700">{tax.toFixed(2)} {currency}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">خصم نقدي مباشر</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={posDiscount === 0 ? '' : posDiscount}
                  onChange={(e) => setPosDiscount(Number(e.target.value))}
                  placeholder="0.00"
                  className="w-20 px-2 py-0.5 border border-slate-200 rounded-md font-mono text-center text-xs focus:outline-none focus:border-[#031635]"
                />
                <span className="font-bold text-slate-400 text-[10px]">{currency}</span>
              </div>
            </div>

            <div className="h-[1px] bg-slate-100 my-1.5"></div>

            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#031635]">المطلوب سداده فورا</span>
              <span className="text-lg font-bold font-mono text-[#006c49]">{total.toFixed(2)} {currency}</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="mb-4">
            <span className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">طريقة الدفع والتسوية</span>
            <div className="grid grid-cols-4 gap-2">
              {(['كاش', 'فيزا', 'محفظة', 'آجل'] as PaymentMethod[]).map((method) => {
                const isActive = posPaymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPosPaymentMethod(method)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all text-center cursor-pointer ${
                      isActive
                        ? 'bg-[#031635] text-white border-[#031635]'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Checkout Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              id="checkout-confirm-btn"
              onClick={onCheckout}
              variant="success"
              className="py-3 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Receipt className="w-4 h-4" />
              حفظ الفاتورة والطباعة (F12)
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                id="suspend-invoice-btn"
                onClick={onSuspend}
                variant="outline"
                className="py-3 font-bold text-[10px]"
              >
                تعليق الفاتورة (F9)
              </Button>

              <Button
                id="return-invoice-btn"
                onClick={onReturnInvoice}
                variant="outline"
                className="py-3 font-bold text-[10px] border-amber-600 text-amber-700 hover:bg-amber-50"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                مرتجع مبيعات
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: PRODUCT SELECTOR GRID (Width: 7/12) */}
      <div className="col-span-7 space-y-4">
        
        {/* Category Filters row */}
        <div className="flex gap-2 pb-1 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#031635] text-white'
                    : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Search and Barcode inputs */}
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-8 relative">
            <input
              type="text"
              placeholder="ابحث هنا عن منتج بالاسم التجاري أو الكود..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 focus:border-[#031635] rounded-xl text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#031635]"
            />
            <span className="absolute inset-y-0 right-3.5 flex items-center text-slate-400">
              <Search className="w-4 h-4" />
            </span>
          </div>

          <form onSubmit={handleBarcodeSubmit} className="col-span-4 flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1 text-slate-400 focus-within:border-[#031635] focus-within:ring-1 focus-within:ring-[#031635]">
            <span className="text-[9px] font-bold text-slate-500 whitespace-nowrap">القارئ:</span>
            <input
              type="text"
              placeholder="انتظار الباركود..."
              value={barcodeQuery}
              onChange={(e) => setBarcodeQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none font-mono text-xs text-slate-700 placeholder:text-slate-300"
            />
          </form>
        </div>

        {/* Dynamic Product Grid Area */}
        <div className="grid grid-cols-3 gap-4 overflow-y-auto h-[510px] pr-1">
          {filteredProducts.length === 0 ? (
            <div className="col-span-3 text-center py-20 bg-white border border-slate-100 rounded-xl flex flex-col justify-center items-center text-slate-400">
              <Search className="w-10 h-10 text-slate-300 mb-2" />
              <span className="text-xs font-bold">لا توجد نتائج مطابقة لبحثك</span>
              <span className="text-[10px] text-slate-400 mt-1">تأكد من كتابة الاسم أو الباركود بشكل دقيق</span>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isLow = product.stock <= 10;
              const isOut = product.stock === 0;

              return (
                <button
                  id={`pos-item-${product.code}`}
                  key={product.code}
                  type="button"
                  onClick={() => addToCart(product)}
                  disabled={isOut}
                  className={`p-4 bg-white border rounded-xl shadow-sm text-right flex flex-col justify-between transition-all duration-150 cursor-pointer group ${
                    isOut
                      ? 'opacity-50 cursor-not-allowed border-red-100 bg-red-50/10'
                      : 'border-slate-100 hover:border-[#031635] hover:shadow-md'
                  }`}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono font-bold text-slate-400">كود: {product.code}</span>
                      <Badge variant={isOut ? 'error' : isLow ? 'warning' : 'success'}>
                        {isOut ? 'نفذ' : isLow ? 'محدود' : 'متوفر'}
                      </Badge>
                    </div>
                    <span className="block text-[12px] font-bold text-slate-800 mt-2.5 h-9 overflow-hidden leading-snug font-sans text-right group-hover:text-[#031635]">
                      {product.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-end mt-4 pt-2.5 border-t border-slate-50 w-full">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-semibold">سعر البيع</span>
                      <span className="font-mono font-bold text-xs text-[#031635]">{product.sellPrice.toFixed(2)} {currency}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                      مخزون: {product.stock}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
