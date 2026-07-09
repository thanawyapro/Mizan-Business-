import React from 'react';
import { Bell, Clock, Database, Shield, Lock } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  businessName: string;
  onOpenCloseDayModal: () => void;
}

export default function Header({ currentScreen, businessName, onOpenCloseDayModal }: HeaderProps) {
  // Screen title map
  const screenTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'لوحة التحكم والمتابعة العامة', subtitle: 'إحصائيات فورية وتنبيهات الأرصدة والنشاط' },
    pos: { title: 'شاشة الكاشير والمبيعات الفورية', subtitle: 'إصدار الفواتير والتسوية النقدية' },
    products: { title: 'إدارة المنتجات والمستودعات', subtitle: 'السلع، الكميات المتوفرة، الجرد وتحديد الأسعار' },
    purchases: { title: 'فواتير المشتريات والتوريد', subtitle: 'توثيق شحنات البضائع والمدفوعات الآجلة للموردين' },
    customers: { title: 'حسابات العملاء والذمم الآجلة', subtitle: 'كشوف مديونيات العملاء والتسديد الائتماني' },
    expenses: { title: 'المصاريف وسجل الخزينة الفورية', subtitle: 'تقييد مستندات الصرف وموازنة النقدية بالصندوق' },
    reports: { title: 'التقارير والميزانية العمومية', subtitle: 'حسابات الضرائب والأرباح والخسائر والمركز المالي' },
    backup: { title: 'صيانة قاعدة البيانات والتراخيص', subtitle: 'النسخ المحلي لقاعدة البيانات وإدارة تفاصيل الترخيص' },
    wizard: { title: 'مساعد تهيئة النظام المالي', subtitle: 'تعديل بيانات النشاط وتخصيص الضرائب الافتراضية' },
  };

  const currentInfo = screenTitles[currentScreen] || { title: 'النظام المحاسبي المتكامل', subtitle: 'ميزان ديسكتوب المطور' };

  return (
    <header className="h-[64px] bg-white border-b border-slate-100 px-6 flex justify-between items-center shrink-0 font-sans z-10 shadow-xs">
      
      {/* Right Side: Page Breadcrumbs / Metadata */}
      <div>
        <h1 className="text-sm font-black text-[#031635] tracking-tight">{currentInfo.title}</h1>
        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{currentInfo.subtitle}</p>
      </div>

      {/* Left Side: Shift status, alerts, notifications, clock */}
      <div className="flex items-center gap-4">
        {/* Active shift details */}
        <div className="flex items-center gap-2 bg-[#f8f9ff] border border-[#cbdbf5]/50 px-3.5 py-1.5 rounded-lg text-xs">
          <span className="w-1.5 h-1.5 bg-[#006c49] rounded-full animate-pulse"></span>
          <span className="text-slate-400 font-medium">الوردية المفتوحة:</span>
          <span className="font-bold text-slate-700 font-sans">الكاشير: منيرة السبيعي</span>
          <button
            type="button"
            onClick={onOpenCloseDayModal}
            className="mr-2 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            تقفيل الوردية
          </button>
        </div>

        {/* Local database backup safe flag */}
        <div className="flex items-center gap-1.5 bg-emerald-50 text-[#006c49] px-2.5 py-1.5 rounded-lg border border-emerald-100 text-[10px] font-bold">
          <Database className="w-3.5 h-3.5" />
          <span>البيانات آمنة ومحفوظة محلياً</span>
        </div>

        {/* Notifications Icon with active bell */}
        <button
          type="button"
          onClick={() => alert('لا توجد إشعارات معلقة جديدة. قاعدة البيانات والترخيص بحالة ممتازة.')}
          className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 hover:text-[#031635] hover:bg-slate-100 transition-all relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full border border-white"></span>
        </button>

        {/* Embedded UTC clock */}
        <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-[11px] bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 font-mono">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>2026-07-09 | 12:00 م</span>
        </div>
      </div>

    </header>
  );
}
