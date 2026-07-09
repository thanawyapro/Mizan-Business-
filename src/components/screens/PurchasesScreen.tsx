import React from 'react';
import { Card, Button, Badge, Input, Select } from '../ReusableUI';
import { InvoiceItem } from '../../types';
import { ShoppingBag, Plus, Trash2, Receipt, AlertCircle } from 'lucide-react';

interface PurchasesScreenProps {
  purchaseInvoiceItems: InvoiceItem[];
  setPurchaseInvoiceItems: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  supplierName: string;
  setSupplierName: (val: string) => void;
  purchaseInvoicePaid: number;
  setPurchaseInvoicePaid: (val: number) => void;
  currency: string;
  onSavePurchaseInvoice: () => void;
}

export default function PurchasesScreen({
  purchaseInvoiceItems,
  setPurchaseInvoiceItems,
  supplierName,
  setSupplierName,
  purchaseInvoicePaid,
  setPurchaseInvoicePaid,
  currency,
  onSavePurchaseInvoice,
}: PurchasesScreenProps) {

  // Calculate invoice subtotal and totals
  const totalCost = purchaseInvoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const remainingCost = totalCost - purchaseInvoicePaid;

  const addNewItem = () => {
    setPurchaseInvoiceItems([
      ...purchaseInvoiceItems,
      { name: 'منتج غذائي إضافي مستورد', quantity: 10, unitPrice: 25.0 }
    ]);
  };

  const removeItem = (idx: number) => {
    setPurchaseInvoiceItems(purchaseInvoiceItems.filter((_, i) => i !== idx));
  };

  const updateItemQty = (idx: number, qty: number) => {
    setPurchaseInvoiceItems(
      purchaseInvoiceItems.map((item, i) => i === idx ? { ...item, quantity: qty } : item)
    );
  };

  const updateItemPrice = (idx: number, price: number) => {
    setPurchaseInvoiceItems(
      purchaseInvoiceItems.map((item, i) => i === idx ? { ...item, unitPrice: price } : item)
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#031635]">إصدار وإدارة فواتير المشتريات</h2>
          <p className="text-xs text-slate-500">مراجعة وتوثيق شحنات التوريد الواردة للمتجر لزيادة وتحديث الأرصدة المخزنية الفورية.</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Left Form (Width: 8/12) */}
        <div className="col-span-8 space-y-4">
          <Card className="p-5 space-y-4">
            
            {/* Supplier metadata */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                id="supplier-select"
                label="المورد المعتمد حالياً"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
              >
                <option value="شركة المراعي المحدودة">شركة المراعي المحدودة</option>
                <option value="مصانع حلواني إخوان">مصانع حلواني إخوان</option>
                <option value="شركة نادك الوطنية">شركة نادك الوطنية</option>
                <option value="مجموعة الخليج للسلع الغذائية">مجموعة الخليج للسلع الغذائية</option>
              </Select>

              <Input
                id="supplier-ref-input"
                label="رقم فاتورة الشراء المرجعية (لدى المورد)"
                type="text"
                defaultValue="PUR-M789-2026"
                placeholder="أدخل الرقم المرجعي المطبوع"
              />
            </div>

            {/* Supply Items Table */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#031635]">المواد والسلع الموردة للمستودع</span>
                <Badge variant="neutral">جرد كميات الشراء</Badge>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-lg">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-600 font-bold">
                    <tr>
                      <th className="p-2.5">اسم المادة الموردة</th>
                      <th className="p-2.5 text-center">الكمية</th>
                      <th className="p-2.5 text-center">سعر التكلفة المفرد</th>
                      <th className="p-2.5 text-center">سعر البيع المقترح لعميلك</th>
                      <th className="p-2.5 text-center">إجمالي التكلفة</th>
                      <th className="p-2.5 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {purchaseInvoiceItems.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-2.5 font-sans font-semibold text-slate-800">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => {
                              const nextName = e.target.value;
                              setPurchaseInvoiceItems(
                                purchaseInvoiceItems.map((v, i) => i === idx ? { ...v, name: nextName } : v)
                              );
                            }}
                            className="w-full bg-transparent focus:outline-none border-b border-transparent focus:border-slate-300 font-sans font-bold text-slate-800"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            value={item.quantity === 0 ? '' : item.quantity}
                            onChange={(e) => updateItemQty(idx, Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 border border-slate-200 rounded text-center text-xs focus:outline-none focus:border-[#031635]"
                          />
                        </td>
                        <td className="p-2.5 text-center">
                          <input
                            type="number"
                            value={item.unitPrice === 0 ? '' : item.unitPrice}
                            onChange={(e) => updateItemPrice(idx, Number(e.target.value))}
                            className="w-20 px-1.5 py-0.5 border border-slate-200 rounded text-center text-xs focus:outline-none focus:border-[#031635]"
                          />
                        </td>
                        <td className="p-2.5 text-center font-sans font-semibold text-emerald-700">
                          {(item.unitPrice * 1.3).toFixed(2)}
                        </td>
                        <td className="p-2.5 text-center font-bold text-[#031635]">
                          {(item.quantity * item.unitPrice).toFixed(2)}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            type="button"
                            onClick={() => removeItem(idx)}
                            disabled={purchaseInvoiceItems.length <= 1}
                            className="text-slate-300 hover:text-red-600 transition-colors disabled:opacity-40 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addNewItem}
                className="mt-3.5 text-xs font-bold text-[#031635] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                إضافة بند مادة جديدة في قائمة الشراء
              </button>
            </div>
          </Card>
        </div>

        {/* Right Financial Settlement (Width: 4/12) */}
        <div className="col-span-4 bg-white border border-[#cbdbf5] rounded-xl p-5 flex flex-col justify-between h-[480px]">
          <div>
            <h3 className="text-xs font-bold text-[#031635] mb-3 pb-2 border-b border-slate-50 flex items-center gap-1.5">
              <Receipt className="w-4 h-4" />
              حساب وتأكيد فاتورة التوريد
            </h3>

            <div className="space-y-3 font-mono text-xs text-slate-500 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-sans text-slate-500">إجمالي قيمة التوريد للمورد:</span>
                <span className="font-bold text-slate-800 text-sm">
                  {totalCost.toFixed(2)} {currency}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-sans text-slate-500">القيمة المسددة نقداً من الخزينة:</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={purchaseInvoicePaid === 0 ? '' : purchaseInvoicePaid}
                    onChange={(e) => setPurchaseInvoicePaid(Number(e.target.value))}
                    className="w-24 px-2 py-1 border border-slate-200 rounded-md text-xs font-mono text-center focus:outline-none focus:border-[#031635]"
                  />
                  <span className="font-bold text-slate-400 text-[10px]">{currency}</span>
                </div>
              </div>

              <div className="h-[1px] bg-slate-100 my-2"></div>

              <div className="flex justify-between items-center">
                <span className="font-sans font-bold text-slate-700">المبلغ المتبقي بالآجل:</span>
                <span className={`font-bold text-sm ${remainingCost > 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {remainingCost.toFixed(2)} {currency}
                </span>
              </div>
            </div>

            {remainingCost > 0 && (
              <div className="mt-4 p-3 bg-amber-50 text-amber-800 rounded-lg border border-amber-200/50 flex gap-2 text-[10px] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  سيتم ترحيل مبلغ <strong>{remainingCost.toFixed(2)} {currency}</strong> ذمم آجلة دائنة لصالح المورد <strong>{supplierName}</strong> في سجل الموردين.
                </span>
              </div>
            )}
          </div>

          <div>
            <Button
              id="save-purch-btn"
              onClick={onSavePurchaseInvoice}
              variant="primary"
              className="w-full py-3 font-bold text-xs"
            >
              حفظ الفاتورة وترحيل الأرصدة للمورد
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}
