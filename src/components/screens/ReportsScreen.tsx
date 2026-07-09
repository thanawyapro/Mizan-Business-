import React, { useState } from 'react';
import { Card, Button, Badge } from '../ReusableUI';
import { FileText, FileSpreadsheet, Calendar, TrendingUp, DollarSign, Package, AlertCircle } from 'lucide-react';

interface ReportsScreenProps {
  currency: string;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

export default function ReportsScreen({
  currency,
  onExportPDF,
  onExportExcel,
}: ReportsScreenProps) {
  
  const [fromDate, setFromDate] = useState('2026-07-01');
  const [toDate, setToDate] = useState('2026-07-31');

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#031635]">قسم التقارير والتحليلات الشاملة</h2>
          <p className="text-xs text-slate-500">مراجعة المؤشرات المالية والتشغيلية العامة وحسابات الضرائب والموازنة العمومية لمتجرك.</p>
        </div>

        <div className="flex gap-2">
          <Button
            id="export-pdf-btn"
            onClick={onExportPDF}
            variant="primary"
            className="px-4 py-2 text-xs font-bold"
          >
            تصدير التقرير المالي (PDF)
          </Button>

          <Button
            id="export-excel-btn"
            onClick={onExportExcel}
            variant="success"
            className="px-4 py-2 text-xs font-bold"
          >
            <FileSpreadsheet className="w-4 h-4" />
            تصدير الجداول (Excel)
          </Button>
        </div>
      </div>

      {/* Date Range Selector */}
      <Card className="p-4 flex gap-4 items-center bg-white border border-slate-100">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-sans">
          <Calendar className="w-4 h-4 text-slate-400" />
          تحديد الفترة المحاسبية للتقرير والفرز:
        </span>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635] focus:ring-1 focus:ring-[#031635]"
          />
          <span className="text-xs text-slate-400 font-semibold font-sans">إلى</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635] focus:ring-1 focus:ring-[#031635]"
          />
        </div>
        <Badge variant="neutral">تحديث تلقائي للفترة</Badge>
      </Card>

      {/* Reports Bento Grid */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Sales Report Card */}
        <Card className="p-5 border-t-4 border-t-[#031635]">
          <div className="flex justify-between items-center mb-4.5 pb-2 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-[#031635] flex items-center gap-1.5 font-sans">
              <TrendingUp className="w-4 h-4" />
              حركة المبيعات والضريبة المضافة
            </h3>
            <span className="text-[10px] font-bold text-slate-400">سجلات الكاشير الجارية</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-500">
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">إجمالي مبيعات الفترة المحققة:</span>
              <span className="font-bold text-slate-800 text-sm">125,480.00 {currency}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">ضريبة القيمة المضافة المستحقة (15%):</span>
              <span className="font-bold text-slate-800 text-sm">18,822.00 {currency}</span>
            </div>

            <div className="h-[1px] bg-slate-100 my-1.5"></div>

            <div className="flex justify-between items-center text-xs font-sans">
              <span className="font-bold text-slate-700">عدد الفواتير الكلي الصادر:</span>
              <span className="font-mono font-bold text-emerald-700">890 فاتورة مبيعات</span>
            </div>
          </div>
        </Card>

        {/* Profit and Loss Card */}
        <Card className="p-5 border-t-4 border-t-[#006c49]">
          <div className="flex justify-between items-center mb-4.5 pb-2 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-[#031635] flex items-center gap-1.5 font-sans">
              <DollarSign className="w-4 h-4" />
              تقرير الأرباح والخسائر التقديري (P&L)
            </h3>
            <span className="text-[10px] font-bold text-slate-400">ملخص المركز المالي</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-500">
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">إيرادات البيع الإجمالية:</span>
              <span className="font-bold text-slate-800 text-sm">125,480.00 {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">تكلفة شراء وتوريد البضاعة المباعة:</span>
              <span className="font-bold text-red-600">-84,100.00 {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">مجموع المصروفات والتشغيل:</span>
              <span className="font-bold text-red-600">-12,450.00 {currency}</span>
            </div>

            <div className="h-[1px] bg-slate-100 my-1.5"></div>

            <div className="flex justify-between items-center font-sans">
              <span className="font-bold text-slate-700 text-xs">صافي الأرباح المسجلة (الربح الصافي):</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">+28,930.00 {currency}</span>
            </div>
          </div>
        </Card>

        {/* Inventory Movement Card */}
        <Card className="p-5 border-t-4 border-t-indigo-500">
          <div className="flex justify-between items-center mb-4.5 pb-2 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-[#031635] flex items-center gap-1.5 font-sans">
              <Package className="w-4 h-4" />
              حركة وتداول المخازن والمستودعات
            </h3>
            <span className="text-[10px] font-bold text-slate-400">جرد وتثمين السلع</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-500">
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">إجمالي قيمة بضاعة المستودع (بسعر التكلفة):</span>
              <span className="font-bold text-slate-800 text-sm">45,120.00 {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">إجمالي القيمة المقدرة (بسعر البيع):</span>
              <span className="font-bold text-slate-800 text-sm">59,340.00 {currency}</span>
            </div>

            <div className="h-[1px] bg-slate-100 my-1.5"></div>

            <div className="flex justify-between items-center font-sans">
              <span className="font-bold text-slate-700 text-xs">الأصناف المتوقع نفادها بالكامل قريباً:</span>
              <span className="font-mono font-bold text-amber-600">3 فئات / أصناف حرجة</span>
            </div>
          </div>
        </Card>

        {/* Expenses Report Card */}
        <Card className="p-5 border-t-4 border-t-amber-500">
          <div className="flex justify-between items-center mb-4.5 pb-2 border-b border-slate-50">
            <h3 className="text-xs font-extrabold text-[#031635] flex items-center gap-1.5 font-sans">
              <AlertCircle className="w-4 h-4" />
              تقرير بنود وهيكل المصروفات والتشغيل
            </h3>
            <span className="text-[10px] font-bold text-slate-400">تحليل ميزانية الصرف</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-slate-500">
            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">مصروفات بند أجور ورواتب موظفين:</span>
              <span className="font-bold text-slate-800 text-sm">8,500.00 {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">مصروفات بند خدمات ومرافق كهرباء:</span>
              <span className="font-bold text-slate-800 text-sm">2,450.00 {currency}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-sans text-slate-600 font-medium">بند صيانة وأعطال فنية دورية:</span>
              <span className="font-bold text-slate-800 text-sm">1,500.00 {currency}</span>
            </div>

            <div className="h-[1px] bg-slate-100 my-1.5"></div>

            <div className="flex justify-between items-center font-sans">
              <span className="font-bold text-slate-700 text-xs">معدل الصرف مقارنة بحصيلة المبيعات:</span>
              <span className="font-mono font-bold text-emerald-700">9.9% ميزانية سليمة</span>
            </div>
          </div>
        </Card>

      </div>

    </div>
  );
}
