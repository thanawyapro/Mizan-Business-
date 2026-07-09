import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  ShoppingBag, 
  Users, 
  Wallet, 
  FileText, 
  Database, 
  Key, 
  Settings, 
  UserCheck, 
  Truck, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  
  const navItems = [
    { id: 'dashboard', label: 'لوحة التحكم والمتابعة', icon: LayoutDashboard },
    { id: 'pos', label: 'نقطة البيع الفورية (POS)', icon: ShoppingCart },
    { id: 'products', label: 'المنتجات والمخزون والسلع', icon: Package },
    { id: 'purchases', label: 'فواتير المشتريات والتوريد', icon: ShoppingBag },
    { id: 'customers', label: 'دليل العملاء والحسابات الآجلة', icon: Users },
    { id: 'expenses', label: 'المصاريف وسجل الخزينة', icon: Wallet },
    { id: 'reports', label: 'التقارير والميزانية العمومية', icon: FileText },
    { id: 'backup', label: 'النسخ الاحتياطي والترخيص', icon: Database },
  ];

  const secondaryItems = [
    { id: 'suppliers', label: 'إدارة الموردين والطلبات', icon: Truck, target: 'purchases' },
    { id: 'employees', label: 'الموظفين وحسابات الوردية', icon: UserCheck, action: () => alert('جاري تحميل حزمة إدارة شئون الموظفين وبطاقات الدوام المحلي...') },
    { id: 'wizard', label: 'مساعد التهيئة الأساسية', icon: Settings, target: 'wizard' },
  ];

  return (
    <aside className="w-[280px] bg-[#031635] text-white border-l border-[#1a2b4b] flex flex-col justify-between shrink-0 font-sans z-20">
      <div>
        {/* Branding Area */}
        <div className="p-5 border-b border-[#1a2b4b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6cf8bb] to-[#00714d] flex items-center justify-center text-[#031635] font-black text-base">
              م
            </div>
            <div>
              <h2 className="text-sm font-black tracking-wide font-sans">ميزان ديسكتوب Core</h2>
              <span className="text-[9px] text-[#8293b8] font-bold uppercase font-mono">SQLite Local DB Engine</span>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                id={`sidebar-item-${item.id}`}
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-right group cursor-pointer ${
                  isActive
                    ? 'bg-[#1a2b4b] text-[#6cf8bb] font-bold border-r-4 border-r-[#6cf8bb]'
                    : 'text-[#8293b8] hover:bg-[#1a2b4b]/50 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#6cf8bb]' : 'text-[#8293b8] group-hover:text-white'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 bg-[#6cf8bb] rounded-full"></span>}
              </button>
            );
          })}

          <div className="h-[1px] bg-[#1a2b4b] my-2 mx-2"></div>

          {/* Secondary Placeholders */}
          {secondaryItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                id={`sidebar-sec-${item.id}`}
                key={item.id}
                onClick={() => {
                  if (item.target) onNavigate(item.target);
                  else if (item.action) item.action();
                }}
                className="w-full flex items-center px-3.5 py-2 rounded-lg text-[#8293b8] hover:bg-[#1a2b4b]/40 hover:text-white transition-all text-right cursor-pointer"
              >
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <Icon className="w-4 h-4 text-[#8293b8]" />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-[#1a2b4b] bg-[#1a2b4b]/20">
        <div className="flex items-center justify-between text-[11px] text-[#8293b8] mb-3">
          <span className="font-semibold">تاريخ تشغيل اليومية:</span>
          <span className="font-mono font-bold text-white">2026-07-09</span>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full py-2.5 bg-slate-800 hover:bg-[#ba1a1a]/20 hover:text-red-300 text-xs text-slate-300 font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700/50 hover:border-red-800/30"
        >
          <LogOut className="w-3.5 h-3.5" />
          تأمين الصندوق والخروج
        </button>
      </div>
    </aside>
  );
}
