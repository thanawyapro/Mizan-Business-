import React, { useState } from 'react';
import { Card, Button, Badge } from '../ReusableUI';
import { Expense } from '../../types';
import { DollarSign, Wallet, ArrowDownRight, ArrowUpRight, Plus, Receipt, Lock } from 'lucide-react';

interface ExpensesScreenProps {
  expenses: Expense[];
  onAddExpense: (title: string, category: string, amount: number) => void;
  totalSalesToday: number;
  totalCashboxBalance: number;
  currency: string;
  onOpenCloseDayModal: () => void;
}

export default function ExpensesScreen({
  expenses,
  onAddExpense,
  totalSalesToday,
  totalCashboxBalance,
  currency,
  onOpenCloseDayModal,
}: ExpensesScreenProps) {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('نثرية');
  const [amount, setAmount] = useState('');

  const totalExpensesToday = expenses.reduce((sum, e) => sum + e.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = Number(amount);
    if (!title.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;
    onAddExpense(title, category, parsedAmount);
    setTitle('');
    setAmount('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. Cashbox balance & Income/Expenses status cards */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="p-5 border-r-4 border-r-emerald-600">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">رصيد الخزنة الفوري المتاح</span>
              <span className="text-2xl font-bold font-mono text-[#006c49] mt-1 block">
                {totalCashboxBalance.toLocaleString()} {currency}
              </span>
            </div>
            <div className="p-2 bg-emerald-50 text-[#006c49] rounded-lg border border-emerald-100">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">الرصيد الفعلي في الصندوق المادي للمحل الآن</p>
        </Card>

        <Card className="p-5 border-r-4 border-r-[#031635]">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">مجموع مقبوضات مبيعات اليوم</span>
              <span className="text-2xl font-bold font-mono text-[#031635] mt-1 block">
                {totalSalesToday.toLocaleString()} {currency}
              </span>
            </div>
            <div className="p-2 bg-[#eff4ff] text-[#031635] rounded-lg border border-slate-100">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">إجمالي المبيعات المدفوعة بالكامل اليوم</p>
        </Card>

        <Card className="p-5 border-r-4 border-r-amber-500">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">مجموع مدفوعات مصروفات اليوم</span>
              <span className="text-2xl font-bold font-mono text-amber-600 mt-1 block">
                {totalExpensesToday.toLocaleString()} {currency}
              </span>
            </div>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
              <ArrowDownRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">إجمالي كشوف ومستندات المصاريف المسجلة</p>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        
        {/* Record New Expense Form (Width: 4/12) */}
        <div className="col-span-4">
          <Card className="p-5">
            <h3 className="text-xs font-bold text-[#031635] mb-4 pb-2 border-b border-slate-50 flex items-center gap-1.5">
              <Receipt className="w-4 h-4" />
              تسجيل مستند صرف فوري
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1.5">بيان المصروف بالتفصيل</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: شراء أحبار طابعة فواتير أو قرطاسية"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#031635] focus:ring-1 focus:ring-[#031635]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1.5">الفئة / بند المصروف</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-[#031635] rounded-lg text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#031635]/10"
                >
                  <option value="نثرية">مصروف نثرية وضيافة</option>
                  <option value="رواتب">رواتب وأجور موظفين</option>
                  <option value="مرافق">كهرباء ومياه وتراخيص</option>
                  <option value="صيانة">صيانة وإصلاحات فنية</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-700 mb-1.5">القيمة المالية المصروفة</label>
                <div className="relative">
                  <input
                    type="number"
                    required
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono placeholder:text-slate-400 focus:outline-none focus:border-[#031635] focus:ring-1 focus:ring-[#031635]"
                  />
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-xs font-bold text-slate-400">
                    {currency}
                  </span>
                </div>
              </div>

              <Button
                id="submit-expense-btn"
                type="submit"
                variant="danger"
                className="w-full py-2.5 font-bold text-xs"
              >
                ترحيل المصروف فوراً من الخزنة
              </Button>
            </form>
          </Card>
        </div>

        {/* Cash Ledger Sheet (Width: 8/12) */}
        <div className="col-span-8">
          <Card className="p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-[#031635]">كشف حركة المقبوضات والمدفوعات اليومية</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">مطابقة فواتير المبيعات مع مستندات الصرف الجارية لموازنة الصندوق</p>
              </div>

              <Button
                id="close-day-direct-btn"
                onClick={onOpenCloseDayModal}
                variant="outline"
                className="px-4 py-2 text-xs font-bold border-amber-600 text-amber-700 hover:bg-amber-50"
              >
                <Lock className="w-3.5 h-3.5" />
                تقفيل اليومية والمطابقة الفورية
              </Button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                    <th className="p-2.5">الرقم المرجعي</th>
                    <th className="p-2.5">البيان والتفاصيل</th>
                    <th className="p-2.5 text-center">التصنيف</th>
                    <th className="p-2.5 text-center">المبلغ</th>
                    <th className="p-2.5 text-center">الوقت والتوقيت</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {expenses.length === 0 && totalSalesToday === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400 font-sans">
                        لم تسجل أي حركة نقدية في صندوق اليومية بعد.
                      </td>
                    </tr>
                  ) : (
                    <>
                      {expenses.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/50">
                          <td className="p-2.5 text-slate-500 font-bold">{e.id}</td>
                          <td className="p-2.5 font-sans font-bold text-slate-800 text-right">{e.title}</td>
                          <td className="p-2.5 text-center font-sans text-slate-500">{e.category}</td>
                          <td className="p-2.5 text-center text-red-600 font-bold">
                            -{e.amount.toFixed(2)} {currency}
                          </td>
                          <td className="p-2.5 text-center text-slate-400">{e.time}</td>
                        </tr>
                      ))}
                      {totalSalesToday > 0 && (
                        <tr className="bg-emerald-50/20 hover:bg-slate-50/50">
                          <td className="p-2.5 text-[#006c49] font-bold">SAL-TODAY</td>
                          <td className="p-2.5 font-sans font-bold text-slate-800 text-right">إجمالي مبيعات اليوم المحققة بالكامل</td>
                          <td className="p-2.5 text-center font-sans text-[#006c49] font-semibold">مبيعات</td>
                          <td className="p-2.5 text-center text-[#006c49] font-bold">
                            +{totalSalesToday.toFixed(2)} {currency}
                          </td>
                          <td className="p-2.5 text-center text-slate-400">مباشر</td>
                        </tr>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
