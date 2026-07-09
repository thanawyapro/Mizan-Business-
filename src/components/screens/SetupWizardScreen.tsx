import React from 'react';
import { Card, Button, Input, Select } from '../ReusableUI';
import { Store, Utensils, Dumbbell, Sparkles, Warehouse, Activity, Check } from 'lucide-react';
import { BusinessType } from '../../types';

interface SetupWizardScreenProps {
  businessName: string;
  setBusinessName: (val: string) => void;
  businessType: BusinessType;
  setBusinessType: (val: BusinessType) => void;
  currency: string;
  setCurrency: (val: string) => void;
  taxEnabled: boolean;
  setTaxEnabled: (val: boolean) => void;
  onStartUsing: () => void;
}

export default function SetupWizardScreen({
  businessName,
  setBusinessName,
  businessType,
  setBusinessType,
  currency,
  setCurrency,
  taxEnabled,
  setTaxEnabled,
  onStartUsing,
}: SetupWizardScreenProps) {

  // Map business types to custom icons and descriptions
  const businessTypes: { id: BusinessType; label: string; desc: string; icon: any }[] = [
    { id: 'محل تجاري', label: 'محل تجاري', desc: 'تجارة تجزئة ومواد غذائية وبقالة', icon: Store },
    { id: 'مطعم/كافيه', label: 'مطعم/كافيه', desc: 'إدارة طاولات ومطابخ وتحضير وجبات', icon: Utensils },
    { id: 'جيم', label: 'جيم / مركز رياضي', desc: 'إدارة اشتراكات ومجموعات وتدريب', icon: Dumbbell },
    { id: 'صالون', label: 'صالون تجميل', desc: 'خدمات تجميل وحجوزات عملاء', icon: Sparkles },
    { id: 'مخزن', label: 'مستودع ومخازن', desc: 'إدارة مخازن وقطع غيار وكميات كبيرة', icon: Warehouse },
    { id: 'نشاط عام', label: 'نشاط تجاري عام', desc: 'إدارة حسابات عامة وخدمات حرة', icon: Activity },
  ];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (businessName.trim() === '') return;
    onStartUsing();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-br from-[#cbdbf5]/25 to-[#f8f9ff]">
      <div className="w-[680px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
        <div className="mb-6 pb-4 border-b border-slate-100">
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-3 py-1 rounded-full">
            مساعد التهيئة الأولية للبرنامج
          </span>
          <h2 className="text-2xl font-black text-[#031635] mt-2 font-sans">تجهيز بيئة عملك على ميزان ديسكتوب</h2>
          <p className="text-xs text-slate-500 mt-1">يرجى تحديد تفاصيل نشاطك لتخصيص الواجهات والعمليات المحاسبية الفورية تلقائياً.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6">
          {/* Business Type selection cards */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2.5">
              نوع النشاط التجاري
            </label>
            <div className="grid grid-cols-3 gap-3">
              {businessTypes.map((type) => {
                const IconComponent = type.icon;
                const isSelected = businessType === type.id;
                return (
                  <button
                    id={`type-card-${type.id}`}
                    key={type.id}
                    type="button"
                    onClick={() => setBusinessType(type.id)}
                    className={`p-4 rounded-xl text-right border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-2 border-[#031635] bg-[#eff4ff]'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#031635]' : 'text-slate-400'}`} />
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#031635] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="block font-bold text-xs text-[#031635]">{type.label}</span>
                      <span className="block text-[9px] text-slate-400 font-medium mt-0.5 leading-tight">{type.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business name and currency */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="biz-name-input"
              label="اسم المنشأة التجاري"
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="مثال: متجر ميزان الفاخر"
            />

            <Select
              id="currency-select"
              label="العملة الافتراضية للتقارير"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="جنيه مصري">جنيه مصري (EGP)</option>
              <option value="ريال سعودي">ريال سعودي (SAR)</option>
              <option value="درهم إماراتي">درهم إماراتي (AED)</option>
              <option value="دينار أردني">دينار أردني (JOD)</option>
              <option value="دولار أمريكي">دولار أمريكي (USD)</option>
            </Select>
          </div>

          {/* Tax option toggle */}
          <div className="bg-[#f8f9ff] p-4.5 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-[#031635]">تفعيل ضريبة القيمة المضافة افتراضيًا (15%)</span>
              <span className="block text-[10px] text-slate-500 mt-0.5 font-medium leading-normal">
                سيقوم البرنامج بحساب ضريبة القيمة المضافة بنسبة 15% على جميع فواتير المبيعات ونقاط البيع تلقائياً.
              </span>
            </div>
            <button
              id="tax-toggle-btn"
              type="button"
              onClick={() => setTaxEnabled(!taxEnabled)}
              className={`w-12 h-6.5 rounded-full transition-colors relative focus:outline-none cursor-pointer ${
                taxEnabled ? 'bg-[#006c49]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5.5 h-5.5 bg-white rounded-full absolute top-0.5 transition-all duration-200 ${
                  taxEnabled ? 'right-0.5' : 'right-6'
                }`}
              />
            </button>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-[10px] text-slate-400 font-semibold max-w-sm leading-normal">
              بمجرد النقر على "بدء الاستخدام"، سيتم تشكيل قاعدة بيانات السلع المحلية وافتتاحية الصندوق المالي تلقائياً.
            </span>
            <Button id="start-using-btn" type="submit" variant="primary" className="px-6 py-3 font-bold text-sm">
              بدء الاستخدام الآن
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
