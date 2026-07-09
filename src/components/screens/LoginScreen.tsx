import React, { useState } from 'react';
import { Card, Button, Input } from '../ReusableUI';
import { ShieldAlert, Key, FileDown, CheckCircle2 } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onImportLicense: () => void;
  licenseExpiry: string;
}

export default function LoginScreen({ onLoginSuccess, onImportLicense, licenseExpiry }: LoginScreenProps) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('يرجى ملء جميع الحقول لتسجيل الدخول الفوري');
      return;
    }
    onLoginSuccess();
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-gradient-to-tr from-[#cbdbf5]/30 via-[#f8f9ff] to-[#f8f9ff]">
      <div className="w-[460px] bg-white rounded-2xl shadow-xl border border-slate-100 p-8 flex flex-col">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#031635] tracking-tight font-sans">مـيـزان</h1>
          <p className="text-xs text-slate-500 mt-2 font-medium">نظام تخطيط الموارد المتقدم لإدارة نقاط البيع والمحاسبة</p>
          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-[#eff4ff] text-[#031635] text-[10px] px-2.5 py-1 rounded-full font-bold">
            <span className="w-1.5 h-1.5 bg-[#6cf8bb] rounded-full animate-pulse"></span>
            نظام سطح المكتب غير المتصل (Offline Core)
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin} className="space-y-4 mb-6">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200 font-semibold">
              {error}
            </div>
          )}
          
          <Input
            id="username-field"
            label="اسم المستخدم"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="أدخل اسم المستخدم"
          />

          <Input
            id="password-field"
            label="كلمة المرور"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="أدخل كلمة المرور الفعّالة"
          />

          <Button type="submit" variant="primary" className="w-full py-3 text-sm font-bold mt-2">
            تسجيل الدخول الآمن
          </Button>
        </form>

        {/* License status card */}
        <Card className="bg-[#eff4ff] border-[#cbdbf5] p-4.5 mb-6">
          <div className="flex justify-between items-center mb-2.5">
            <span className="text-[10px] font-bold text-[#4e5e81] tracking-wider uppercase">حالة ترخيص النسخة للجهاز الحالي</span>
            <span className="bg-emerald-100 text-[#00714d] text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              مرخص ونشط
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-semibold">رقم تعريف الجهاز الفريد:</span>
              <span className="font-mono font-bold text-slate-700">MIZAN-DESKTOP-4892A</span>
            </div>
            <div className="text-left">
              <span className="text-slate-400 block text-[10px] font-semibold text-left">تاريخ انتهاء الترخيص:</span>
              <span className="font-mono font-bold text-slate-700">{licenseExpiry}</span>
            </div>
          </div>
        </Card>

        {/* Secondary Import Button */}
        <Button
          id="btn-import-lic"
          type="button"
          variant="outline"
          onClick={onImportLicense}
          className="w-full py-2.5 text-xs font-bold"
        >
          <FileDown className="w-4 h-4" />
          استيراد ملف الترخيص السنوي (.lic)
        </Button>

        {/* Footer Credit & Engine Status */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-center flex flex-col gap-1">
          <span className="text-[10px] text-slate-400 font-mono font-medium">v3.4.1 - Embedded Local Database System (SQLite)</span>
          <span className="text-[9px] text-slate-400 font-sans">حقوق الطبع محفوظة © {new Date().getFullYear()} ميزان ديسكتوب</span>
        </div>
      </div>
    </div>
  );
}
