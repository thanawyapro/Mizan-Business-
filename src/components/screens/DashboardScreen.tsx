import React from 'react';
import { Card, Button, Badge } from '../ReusableUI';
import { Product, Expense } from '../../types';
import { 
  TrendingUp, 
  Coins, 
  DollarSign, 
  AlertTriangle, 
  Plus, 
  FileText, 
  Activity, 
  TrendingDown, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Percent 
} from 'lucide-react';

interface DashboardScreenProps {
  products: Product[];
  expenses: Expense[];
  totalSalesToday: number;
  totalCashboxBalance: number;
  currency: string;
  onNavigate: (screen: string) => void;
  onOpenAddProductModal: () => void;
  onOpenCloseDayModal: () => void;
}

export default function DashboardScreen({
  products,
  expenses,
  totalSalesToday,
  totalCashboxBalance,
  currency,
  onNavigate,
  onOpenAddProductModal,
  onOpenCloseDayModal,
}: DashboardScreenProps) {

  // Calculate stats dynamically
  const totalExpensesToday = expenses.reduce((sum, e) => sum + e.amount, 0);
  const lowStockCount = products.filter(p => p.stock <= 10).length;
  
  // Hardcoded estimates for premium looks
  const expectedProfitToday = Math.round(totalSalesToday * 0.28); 
  const outstandingInvoices = 10350;

  // Best sellers mock
  const bestSellers = [
    { name: 'أرز بسمتي فاخر 1 كجم', category: 'البقالة', qty: 140, price: 60.0 },
    { name: 'شاي أحمر خشن 250 جرام', category: 'المشروبات', qty: 98, price: 45.0 },
    { name: 'زيت عباد الشمس 1.5 لتر', category: 'البقالة', qty: 35, price: 95.0 }
  ];

  // Mock activities
  const recentActivities = [
    { action: 'إصدار فاتورة بيع نقدية رقم #2308', actor: 'منيرة السبيعي', time: 'منذ دقيقة', color: 'bg-emerald-500' },
    { action: 'إضافة منتج "مكرونة كوع فاخرة" بالخطأ وتعديله', actor: 'المدير المالي', time: 'منذ 10 دقائق', color: 'bg-[#031635]' },
    { action: 'إصدار فاتورة شراء من المورد "شركة المراعي"', actor: 'المدير المالي', time: 'منذ ساعة', color: 'bg-blue-500' },
    { action: 'تعديل الصلاحيات الفورية للكاشير الفرعي', actor: 'المدير المالي', time: 'منذ ساعتين', color: 'bg-slate-500' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* 1. KPI Cards Row */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { 
            title: 'مبيعات اليوم', 
            val: `${totalSalesToday.toLocaleString()} ${currency}`, 
            change: '+12.4%', 
            color: 'border-r-4 border-r-[#031635]', 
            sub: 'معدل سلة مستمر',
            icon: TrendingUp
          },
          { 
            title: 'صافي الربح المتوقع', 
            val: `${expectedProfitToday.toLocaleString()} ${currency}`, 
            change: '+8.1%', 
            color: 'border-r-4 border-r-[#006c49]', 
            sub: 'حسب هوامش بيع المنتجات',
            icon: DollarSign
          },
          { 
            title: 'المصاريف اليومية', 
            val: `${totalExpensesToday.toLocaleString()} ${currency}`, 
            change: '-3%', 
            color: 'border-r-4 border-r-amber-500', 
            sub: 'فواتير ورواتب اليوم',
            icon: TrendingDown
          },
          { 
            title: 'النقدية بالخزنة الفورية', 
            val: `${totalCashboxBalance.toLocaleString()} ${currency}`, 
            change: 'محدث فوري', 
            color: 'border-r-4 border-r-emerald-600', 
            sub: 'الرصيد الفعلي المتوفر',
            icon: Coins
          },
          { 
            title: 'فواتير ذمم آجلة معلقة', 
            val: `${outstandingInvoices.toLocaleString()} ${currency}`, 
            change: '+5%', 
            color: 'border-r-4 border-r-indigo-500', 
            sub: 'مستحقة التحصيل قريباً',
            icon: FileText
          },
          { 
            title: 'منتجات قربت تخلص', 
            val: `${lowStockCount} أصناف`, 
            change: 'عاجل', 
            color: 'border-r-4 border-r-[#ba1a1a]', 
            sub: 'تحتاج لإعادة طلب فوراً',
            icon: AlertTriangle
          }
        ].map((kpi, idx) => {
          const KpiIcon = kpi.icon;
          return (
            <div key={idx} className="h-full">
              <Card className={`p-4 bg-white border border-slate-100 h-full ${kpi.color}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-bold text-slate-500">{kpi.title}</span>
                  <KpiIcon className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <span className="block text-base font-bold font-mono text-[#0b1c30] tracking-tight my-1">
                  {kpi.val}
                </span>
                <div className="flex justify-between items-center text-[9px] font-medium mt-1">
                  <span className="text-slate-400">{kpi.sub}</span>
                  <span className={`font-bold ${kpi.change.includes('+') ? 'text-[#006c49]' : kpi.change.includes('-') ? 'text-[#ba1a1a]' : 'text-[#4e5e81]'}`}>
                    {kpi.change}
                  </span>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* 2. Quick Actions Panel */}
      <Card className="bg-white border border-slate-100 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="bg-[#cbdbf5] text-[#031635] text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
            إجراءات سريعة
          </span>
          <p className="text-xs text-slate-500 font-medium">لوحة اختصارات فورية للعمليات الأكثر تكراراً لتقليل وقت الوصول بالمحل</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            id="quick-pos-btn"
            onClick={() => onNavigate('pos')}
            variant="primary"
            className="px-4 py-2 text-xs font-bold"
          >
            فاتورة بيع (نقطة البيع)
          </Button>

          <Button 
            id="quick-add-prod-btn"
            onClick={onOpenAddProductModal}
            variant="success"
            className="px-4 py-2 text-xs font-bold"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج جديد
          </Button>

          <Button 
            id="quick-expense-btn"
            onClick={() => onNavigate('expenses')}
            variant="outline"
            className="px-4 py-2 text-xs font-bold"
          >
            مصروف جديد
          </Button>

          <Button 
            id="quick-close-day-btn"
            onClick={onOpenCloseDayModal}
            variant="outline"
            className="px-4 py-2 text-xs font-bold border-amber-600 text-amber-700 hover:bg-amber-50"
          >
            تقفيل اليوم المالي
          </Button>
        </div>
      </Card>

      {/* 3. Charts & Analytics Grid */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Sales Chart Mockup */}
        <Card className="col-span-8 p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xs font-bold text-[#031635]">منحنى حركة المبيعات والمصاريف الأسبوعية</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">مؤشر بياني فوري مسحوب من قاعدة بيانات المبيعات والمصروفات</p>
            </div>
            <Badge variant="neutral">آخر 7 أيام جارية</Badge>
          </div>

          {/* Line Chart Component Emulator */}
          <div className="h-[220px] w-full bg-[#f8f9ff] rounded-xl border border-slate-100 flex flex-col justify-between p-4 relative overflow-hidden">
            {/* Mock Graph Lines via SVG */}
            <svg className="absolute bottom-6 left-0 right-0 w-full h-[140px]" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#031635" stopOpacity="0.12"/>
                  <stop offset="100%" stopColor="#031635" stopOpacity="0.0"/>
                </linearGradient>
              </defs>
              {/* Sales area */}
              <path d="M0,85 Q15,45 30,55 T60,25 T90,15 L100,12 L100,100 L0,100 Z" fill="url(#chartGrad)"/>
              {/* Sales line */}
              <path d="M0,85 Q15,45 30,55 T60,25 T90,15 L100,12" fill="none" stroke="#031635" strokeWidth="2.5" strokeLinecap="round"/>
              {/* Expense line */}
              <path d="M0,92 Q20,78 40,83 T80,72 L100,70" fill="none" stroke="#ba1a1a" strokeWidth="1.5" strokeDasharray="3 3"/>
            </svg>

            <div className="flex justify-between text-[9px] text-slate-400 font-bold z-10 font-mono">
              <span>15,000</span>
              <span>10,000</span>
              <span>5,000</span>
              <span>0</span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold border-t border-slate-100 pt-2 z-10">
              <span>السبت</span>
              <span>الأحد</span>
              <span>الاثنين</span>
              <span>الثلاثاء</span>
              <span>الأربعاء</span>
              <span>الخميس</span>
              <span>الجمعة</span>
            </div>
          </div>
        </Card>

        {/* Alerts & Critical Inventory */}
        <Card className="col-span-4 p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-[#031635] mb-3">تنبيهات النظام والمخازن الحرجة</h3>
            <div className="space-y-3">
              <div className="flex gap-2.5 p-3 bg-red-50 text-red-800 rounded-lg border-r-4 border-r-[#ba1a1a] text-[10px] leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-[#ba1a1a] shrink-0" />
                <span>
                  صنف <strong>فاصوليا خضراء مجمدة</strong> نفذت كميته بالكامل من مستودع المتجر الرئيسي.
                </span>
              </div>
              
              <div className="flex gap-2.5 p-3 bg-amber-50 text-amber-800 rounded-lg border-r-4 border-r-amber-500 text-[10px] leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  هناك عدد <strong>2 عملاء</strong> تجاوزوا الحد الائتماني المعتمد للفواتير الآجلة.
                </span>
              </div>

              <div className="flex gap-2.5 p-3 bg-blue-50 text-blue-800 rounded-lg border-r-4 border-r-indigo-500 text-[10px] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  اكتمل التنسيق التلقائي للنسخة الاحتياطية بنجاح على القرص المحلي الآمن اليوم.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <button 
              onClick={() => onNavigate('products')} 
              className="text-xs font-bold text-[#031635] hover:underline cursor-pointer"
            >
              عرض تفاصيل وحركة المستودع كاملة ←
            </button>
          </div>
        </Card>

      </div>

      {/* 4. Best Selling Products Table & Activities Feed */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Best Selling Products */}
        <Card className="col-span-7 p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-bold text-[#031635]">المنتجات الأكثر طلباً ومبيعاً هذا الأسبوع</h3>
            <span className="text-[10px] font-semibold text-slate-400">حسب عدد الفواتير</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
                  <th className="p-2.5">اسم المنتج</th>
                  <th className="p-2.5">القسم</th>
                  <th className="p-2.5 text-center">الكمية المباعة</th>
                  <th className="p-2.5 text-center">سعر البيع</th>
                  <th className="p-2.5 text-center">إجمالي المبيعات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {bestSellers.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#f8f9ff]">
                    <td className="p-2.5 font-sans font-bold text-slate-800">{item.name}</td>
                    <td className="p-2.5 font-sans text-slate-500">{item.category}</td>
                    <td className="p-2.5 text-center font-bold text-[#031635]">{item.qty} وحدة</td>
                    <td className="p-2.5 text-center text-slate-600">{item.price.toFixed(2)}</td>
                    <td className="p-2.5 text-center font-bold text-[#006c49]">
                      {(item.qty * item.price).toLocaleString()} {currency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent activity feed */}
        <Card className="col-span-5 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-bold text-[#031635]">سجل العمليات الأخير بالمتجر</h3>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              مراقبة حية
            </span>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act, idx) => (
              <div key={idx} className="flex gap-3 text-xs items-start justify-between">
                <div className="flex gap-2.5 items-start">
                  <div className={`w-2 h-2 ${act.color} rounded-full mt-1.5 shrink-0`}></div>
                  <div>
                    <span className="font-semibold block text-slate-800 text-[11px]">{act.action}</span>
                    <span className="text-[10px] text-slate-400 font-medium">بواسطة: {act.actor}</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 font-mono font-bold whitespace-nowrap">{act.time}</span>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
}
