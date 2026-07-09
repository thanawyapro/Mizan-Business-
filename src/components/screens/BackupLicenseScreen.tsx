import React, { useState } from 'react';
import { Card, Button, Badge, Input } from '../ReusableUI';
import { Database, ShieldCheck, Key, FileDown, FolderOpen, RefreshCcw, HelpCircle } from 'lucide-react';

interface BackupLicenseScreenProps {
  businessName: string;
  licenseType: string;
  licenseExpiry: string;
  onRunBackup: () => void;
  onRestoreBackup: () => void;
  onChooseFolder: () => void;
  onActivateLicense: (code: string) => void;
  onImportLicenseFile: () => void;
}

export default function BackupLicenseScreen({
  businessName,
  licenseType,
  licenseExpiry,
  onRunBackup,
  onRestoreBackup,
  onChooseFolder,
  onActivateLicense,
  onImportLicenseFile,
}: BackupLicenseScreenProps) {
  
  const [licenseCodeInput, setLicenseCodeInput] = useState('');
  const deviceCode = 'MIZAN-DESKTOP-4892A-CORE';

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseCodeInput.trim()) return;
    onActivateLicense(licenseCodeInput);
    setLicenseCodeInput('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#031635]">صيانة النظام الاحتياطي والترخيص</h2>
          <p className="text-xs text-slate-500">متابعة نسخ الأمان المتراكمة محلياً وإدارة تفاصيل اشتراك وتفعيل النسخة.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        {/* Local Backup Section */}
        <Card className="p-5 flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="text-xs font-bold text-[#031635] pb-2 border-b border-slate-50 flex items-center gap-2 font-sans">
              <Database className="w-4.5 h-4.5 text-indigo-600" />
              النسخ الاحتياطي لقاعدة البيانات المحلية (SQLite DB)
            </h3>

            <div className="bg-[#f8f9ff] border border-slate-100 rounded-xl p-4 font-mono text-xs space-y-3 mt-4 text-slate-600">
              <div>
                <span className="font-sans font-bold text-slate-700 block text-[10px]">آخر نسخة احتياطية ناجحة:</span>
                <span className="text-[11px] font-bold text-emerald-700">2026-07-09 12:00 م (تلقائي بنجاح)</span>
              </div>
              <div>
                <span className="font-sans font-bold text-slate-700 block text-[10px]">مسار حفظ النسخ الاحتياطية الافتراضي:</span>
                <span className="text-[10px] text-blue-600 font-bold block overflow-hidden text-ellipsis whitespace-nowrap">
                  C:/MizanERP/Backups/daily_core_db.db
                </span>
              </div>
            </div>

            <div className="mt-5 space-y-2.5">
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed font-medium">
                بما أن ميزان يعمل كلياً دون الحاجة إلى إنترنت، فجميع بياناتك مشفرة ومحفوظة بملف SQLite على قرصك الصلب. نوصي بأخذ نسخ احتياطية بانتظام.
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <Button
              id="run-backup-btn"
              onClick={onRunBackup}
              variant="primary"
              className="w-full py-2.5 font-bold text-xs"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              إنشاء نسخة احتياطية فورا
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                id="restore-backup-btn"
                onClick={onRestoreBackup}
                variant="outline"
                className="py-2 text-[10px] font-bold"
              >
                استرجاع نسخة سابقة
              </Button>

              <Button
                id="choose-folder-btn"
                onClick={onChooseFolder}
                variant="outline"
                className="py-2 text-[10px] font-bold"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                تعديل مجلد الحفظ
              </Button>
            </div>
          </div>
        </Card>

        {/* License & Plan Status Card */}
        <Card className="p-5 flex flex-col justify-between h-[450px] border-[#cbdbf5]">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-50 mb-4">
              <h3 className="text-xs font-bold text-[#031635] flex items-center gap-2 font-sans">
                <Key className="w-4.5 h-4.5 text-[#006c49]" />
                تفاصيل ترخيص المنشأة والشبكة
              </h3>
              <span className="bg-emerald-50 text-[#006c49] border border-emerald-200 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                تفعيل رسمي
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs text-slate-500">
              <div className="flex justify-between border-b border-slate-50 pb-1.5 items-center">
                <span className="font-sans text-[10px] font-semibold">اسم المنشأة المرخص لها:</span>
                <span className="font-bold text-slate-800 font-sans">{businessName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5 items-center">
                <span className="font-sans text-[10px] font-semibold">نوع الباقة / الاشتراك السنوي:</span>
                <span className="font-bold text-slate-800 font-sans">{licenseType}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-1.5 items-center">
                <span className="font-sans text-[10px] font-semibold">الأجهزة المصرح بربطها بالمحل:</span>
                <span className="font-bold text-slate-800">5 أجهزة نقاط بيع فرعية</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] font-semibold">تاريخ نهاية ترخيص الاشتراك:</span>
                <span className="font-bold text-red-600">{licenseExpiry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-sans text-[10px] font-semibold text-slate-400">كود تعريف الجهاز المعتمد:</span>
                <span className="font-bold text-slate-500 font-mono text-[10px]">{deviceCode}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3.5">
            {/* Activation form */}
            <form onSubmit={handleActivate} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="أدخل كود تفعيل الترخيص الجديد للتمديد..."
                value={licenseCodeInput}
                onChange={(e) => setLicenseCodeInput(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635]"
              />
              <Button id="submit-license-code" type="submit" variant="success" className="px-4 py-2 shrink-0 font-bold text-xs">
                تفعيل الكود
              </Button>
            </form>

            <Button
              id="import-lic-file-btn"
              onClick={onImportLicenseFile}
              variant="outline"
              className="w-full py-2.5 font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <FileDown className="w-4 h-4" />
              استيراد ملف الترخيص من جهازك (.lic)
            </Button>
          </div>
        </Card>

      </div>

    </div>
  );
}
