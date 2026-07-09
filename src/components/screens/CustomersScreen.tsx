import React from 'react';
import { Card, Button, Badge } from '../ReusableUI';
import { Customer } from '../../types';
import { Users, FileText, Search, CreditCard, ChevronLeft, Eye } from 'lucide-react';

interface CustomersScreenProps {
  customers: Customer[];
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  currency: string;
  onPrintStatement: (customer: Customer) => void;
  onAddCustomer: () => void;
}

export default function CustomersScreen({
  customers,
  selectedCustomer,
  setSelectedCustomer,
  currency,
  onPrintStatement,
  onAddCustomer,
}: CustomersScreenProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#031635]">دليل وحسابات العملاء والذمم الآجلة</h2>
          <p className="text-xs text-slate-500">متابعة حسابات المديونية، والائتمان الممنوح للعملاء، وسجلات الشراء والتحصيل المعتمدة.</p>
        </div>

        <Button
          id="add-customer-btn"
          onClick={onAddCustomer}
          variant="primary"
          className="px-4 py-2 text-xs font-bold"
        >
          <Users className="w-4 h-4" />
          إضافة عميل جديد
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Main Customers Table (Width: 8/12) */}
        <div className="col-span-8">
          <Card className="p-0 overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                  <th className="p-3">اسم العميل المعتمد</th>
                  <th className="p-3">رقم الجوال والاتصال</th>
                  <th className="p-3 text-center">الرصيد / مديونية العميل</th>
                  <th className="p-3 text-center">تاريخ آخر حركة شراء</th>
                  <th className="p-3 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] font-mono">
                {customers.map((c) => {
                  const isDebtor = c.balance > 0; // customer owes us money (red)
                  const isCreditor = c.balance < 0; // we owe customer money or customer has credit (green)
                  
                  return (
                    <tr 
                      key={c.id} 
                      className={`hover:bg-[#f8f9ff]/50 transition-colors cursor-pointer ${
                        selectedCustomer?.id === c.id ? 'bg-[#eff4ff]' : ''
                      }`}
                      onClick={() => setSelectedCustomer(c)}
                    >
                      <td className="p-3 font-sans font-bold text-slate-800 text-right">
                        <div className="flex items-center gap-2">
                          <div className="w-6.5 h-6.5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                            {c.name.charAt(0)}
                          </div>
                          <span>{c.name}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-500 text-right">{c.phone}</td>
                      <td className={`p-3 text-center font-bold text-xs ${
                        isDebtor ? 'text-red-600' : isCreditor ? 'text-[#006c49]' : 'text-slate-400 font-sans'
                      }`}>
                        {c.balance === 0 
                          ? 'مسدد بالكامل' 
                          : `${Math.abs(c.balance).toLocaleString()} ${currency} ${isDebtor ? 'آجل' : 'دائن'}`
                        }
                      </td>
                      <td className="p-3 text-center text-slate-500">{c.lastPurchase}</td>
                      <td className="p-3 text-center font-sans">
                        <Button
                          id={`statement-btn-${c.id}`}
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCustomer(c);
                          }}
                          className="px-2 py-1 text-[10px] font-bold"
                        >
                          <FileText className="w-3 h-3" />
                          كشف الحساب
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Customer Profile Side Panel (Width: 4/12) */}
        <div className="col-span-4">
          <Card className="p-5 h-[480px] flex flex-col justify-between border-[#cbdbf5]">
            {selectedCustomer ? (
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="pb-3 border-b border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">ملف العميل المختار</span>
                    <h4 className="text-sm font-bold text-[#031635] mt-1">{selectedCustomer.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">كود المشترك: {selectedCustomer.id} | جوال: {selectedCustomer.phone}</span>
                  </div>

                  <div className="bg-[#f8f9ff] p-4 rounded-xl border border-slate-100 font-mono text-xs space-y-2 mt-3.5">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-slate-500 font-medium">الرصيد المالي الدفتري:</span>
                      <span className={`font-bold text-sm ${
                        selectedCustomer.balance > 0 ? 'text-red-600' : selectedCustomer.balance < 0 ? 'text-[#006c49]' : 'text-slate-500'
                      }`}>
                        {selectedCustomer.balance.toLocaleString()} {currency}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-slate-500 font-medium">حالة السداد الائتماني:</span>
                      <span className={`font-semibold text-[10px] px-2 py-0.5 rounded-full ${
                        selectedCustomer.balance > 0 ? 'bg-red-50 text-[#ba1a1a]' : selectedCustomer.balance < 0 ? 'bg-emerald-50 text-[#006c49]' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {selectedCustomer.balance > 0 ? 'مستحق الدفع والتحصيل' : selectedCustomer.balance < 0 ? 'رصيد دائن مسبق الدفع' : 'حساب سليم ومطابق'}
                      </span>
                    </div>
                  </div>

                  {/* Mock ledger statements */}
                  <div className="mt-4">
                    <span className="text-[10px] font-bold text-slate-500 block mb-2 uppercase tracking-wide">أحدث الحركات المقيدة</span>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between font-mono items-center border border-slate-100">
                        <div>
                          <span className="text-slate-700 font-bold font-sans block text-[10px]">فاتورة مبيعات آجل #2308</span>
                          <span className="text-[9px] text-slate-400">2026-07-09 10:45 ص</span>
                        </div>
                        <span className="font-bold text-[#ba1a1a]">+120.00</span>
                      </div>

                      <div className="p-2.5 bg-slate-50 rounded-lg flex justify-between font-mono items-center border border-slate-100">
                        <div>
                          <span className="text-slate-700 font-bold font-sans block text-[10px]">سداد نقدي مباشر للخزينة</span>
                          <span className="text-[9px] text-slate-400">2026-07-08 04:30 م</span>
                        </div>
                        <span className="font-bold text-[#006c49]">-250.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Button
                    id="print-statement-drawer-btn"
                    onClick={() => onPrintStatement(selectedCustomer)}
                    variant="primary"
                    className="w-full py-2.5 font-bold text-xs"
                  >
                    طباعة كشف الحساب المالي المعتمد
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-center items-center text-slate-400 text-center py-12">
                <Users className="w-12 h-12 text-slate-200 mb-3" />
                <span className="text-xs font-bold">بوابة الاستعلام السريع للعملاء</span>
                <span className="text-[10px] text-slate-400 mt-1 max-w-xs leading-normal">
                  انقر على أي عميل من الجدول المقابل لفتح لوحة تفاصيل المديونية وتحميل كشف حسابه الدفتري فوراً.
                </span>
              </div>
            )}
          </Card>
        </div>

      </div>

    </div>
  );
}
