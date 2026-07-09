import React, { useState } from 'react';
import { Card, Button, Badge, Table } from '../ReusableUI';
import { Product } from '../../types';
import { Search, Plus, FileSpreadsheet, SlidersHorizontal, Info, Eye } from 'lucide-react';

interface ProductsScreenProps {
  products: Product[];
  currency: string;
  onOpenAddProductModal: () => void;
  onImportExcel: () => void;
  onAdjustment: () => void;
}

export default function ProductsScreen({
  products,
  currency,
  onOpenAddProductModal,
  onImportExcel,
  onAdjustment,
}: ProductsScreenProps) {

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Handle local searching and filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.includes(search) || p.code.includes(search);
    const matchesCategory = categoryFilter === '' || p.category === categoryFilter;
    const isLow = p.stock <= 10;
    const isOut = p.stock === 0;
    
    let matchesStatus = true;
    if (statusFilter === 'متوفر') matchesStatus = !isOut && !isLow;
    else if (statusFilter === 'محدود') matchesStatus = isLow && !isOut;
    else if (statusFilter === 'منفذ') matchesStatus = isOut;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#031635]">إدارة المنتجات والمستودعات</h2>
          <p className="text-xs text-slate-500">قائمة تفصيلية بجميع المواد والسلع المسجلة في الخازن مع إحصائيات فورية للأرصدة.</p>
        </div>

        <div className="flex gap-2">
          <Button
            id="add-prod-master-btn"
            onClick={onOpenAddProductModal}
            variant="primary"
            className="px-4 py-2 text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            إضافة صنف جديد
          </Button>

          <Button
            id="adjust-stock-btn"
            onClick={onAdjustment}
            variant="outline"
            className="px-4 py-2 text-xs font-bold"
          >
            تعديل تسوية المخزن
          </Button>

          <Button
            id="excel-import-btn"
            onClick={onImportExcel}
            variant="outline"
            className="px-4 py-2 text-xs font-bold border-emerald-600 text-[#006c49] hover:bg-emerald-50"
          >
            <FileSpreadsheet className="w-4 h-4" />
            استيراد من ملف Excel
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      <Card className="p-4 flex gap-4 items-center">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="البحث بالاسم التجاري للصنف أو الكود..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:border-[#031635]"
          />
          <span className="absolute inset-y-0 right-3.5 flex items-center text-slate-400">
            <Search className="w-3.5 h-3.5" />
          </span>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-600 focus:outline-none focus:border-[#031635] w-48 font-sans"
        >
          <option value="">جميع الفئات والأقسام</option>
          <option value="البقالة">البقالة</option>
          <option value="المشروبات">المشروبات</option>
          <option value="المنظفات">المنظفات</option>
          <option value="المجمدات">المجمدات</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3.5 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-600 focus:outline-none focus:border-[#031635] w-48 font-sans"
        >
          <option value="">جميع حالات المخزون</option>
          <option value="متوفر">متوفر ومستقر</option>
          <option value="محدود">كميات قاربت على النفاد</option>
          <option value="منفذ">كميات منفذة تماماً</option>
        </select>
      </Card>

      {/* Dense Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-right text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
              <th className="p-3">الكود</th>
              <th className="p-3">المنتج</th>
              <th className="p-3">القسم</th>
              <th className="p-3 text-center">الكمية</th>
              <th className="p-3 text-center">سعر الشراء</th>
              <th className="p-3 text-center">سعر البيع</th>
              <th className="p-3 text-center">الربح المتوقع</th>
              <th className="p-3 text-center">الحالة</th>
              <th className="p-3 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-slate-400 font-sans">
                  <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  لا توجد منتجات مسجلة مطابقة لهذه الفلاتر.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => {
                const profit = p.sellPrice - p.buyPrice;
                const isLow = p.stock <= 10;
                const isOut = p.stock === 0;

                return (
                  <tr key={p.code} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-3 font-bold text-slate-500">{p.code}</td>
                    <td className="p-3 font-sans font-bold text-slate-800 text-right">{p.name}</td>
                    <td className="p-3 font-sans text-slate-500 text-right">{p.category}</td>
                    <td className={`p-3 text-center font-bold text-xs ${isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-[#031635]'}`}>
                      {p.stock} وحدة
                    </td>
                    <td className="p-3 text-center text-slate-600">{p.buyPrice.toFixed(2)} {currency}</td>
                    <td className="p-3 text-center text-slate-600">{p.sellPrice.toFixed(2)} {currency}</td>
                    <td className="p-3 text-center text-emerald-700 font-bold">
                      +{profit.toFixed(2)} ({Math.round((profit / p.buyPrice) * 100)}%)
                    </td>
                    <td className="p-3 text-center">
                      <Badge variant={isOut ? 'error' : isLow ? 'warning' : 'success'}>
                        {isOut ? 'منفذ بالكامل' : isLow ? 'كمية حرجة' : 'نشط ومستقر'}
                      </Badge>
                    </td>
                    <td className="p-3 text-center font-sans">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => alert(`بيانات الصنف:\nالاسم: ${p.name}\nكود الصنف: ${p.code}\nالتكلفة: ${p.buyPrice} ${currency}\nسعر البيع: ${p.sellPrice} ${currency}`)}
                          className="p-1 text-slate-400 hover:text-[#031635] transition-colors cursor-pointer"
                          title="تفاصيل الصنف"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
