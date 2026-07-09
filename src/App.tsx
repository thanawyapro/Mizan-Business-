import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { Card, Button, Badge } from './components/ReusableUI';
import { Product, Customer, Expense, CartItem, BusinessType, PaymentMethod, InvoiceItem } from './types';

// Import Screens
import LoginScreen from './components/screens/LoginScreen';
import SetupWizardScreen from './components/screens/SetupWizardScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import POSScreen from './components/screens/POSScreen';
import ProductsScreen from './components/screens/ProductsScreen';
import PurchasesScreen from './components/screens/PurchasesScreen';
import ExpensesScreen from './components/screens/ExpensesScreen';
import CustomersScreen from './components/screens/CustomersScreen';
import ReportsScreen from './components/screens/ReportsScreen';
import BackupLicenseScreen from './components/screens/BackupLicenseScreen';

import { X, Check, Printer, Database, AlertTriangle, Receipt, Plus, Coins, ShieldCheck } from 'lucide-react';

export default function App() {
  // Global App States
  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(true); // Already set up to look active, can revert to wizard

  // Business Meta Configuration
  const [businessName, setBusinessName] = useState<string>('متجر ميزان الفاخر');
  const [businessType, setBusinessType] = useState<BusinessType>('محل تجاري');
  const [currency, setCurrency] = useState<string>('جنيه مصري');
  const [taxEnabled, setTaxEnabled] = useState<boolean>(true);
  const [licenseExpiry, setLicenseExpiry] = useState<string>('2027-07-09');
  const [licenseType, setLicenseType] = useState<string>('باقة الأعمال الذهبية المتكاملة');

  // Database States (Mock Data)
  const [products, setProducts] = useState<Product[]>([
    { code: 'PROD-001', name: 'أرز بسمتي فاخر 1 كجم', category: 'البقالة', stock: 45, buyPrice: 40.0, sellPrice: 60.0, status: 'نشط' },
    { code: 'PROD-002', name: 'شاي أحمر خشن 250 جرام', category: 'المشروبات', stock: 120, buyPrice: 32.0, sellPrice: 45.0, status: 'نشط' },
    { code: 'PROD-003', name: 'زيت عباد الشمس 1.5 لتر', category: 'البقالة', stock: 8, buyPrice: 70.0, sellPrice: 95.0, status: 'محدود' },
    { code: 'PROD-004', name: 'فاصوليا خضراء مجمدة 400 جرام', category: 'المجمدات', stock: 0, buyPrice: 15.0, sellPrice: 22.0, status: 'منفذ' },
    { code: 'PROD-005', name: 'صابون مائع للأيدي 500 مل', category: 'المنظفات', stock: 65, buyPrice: 18.0, sellPrice: 26.0, status: 'نشط' },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'CUST-001', name: 'عبدالرحمن القحطاني', phone: '0504893721', balance: 450.0, lastPurchase: '2026-07-09' },
    { id: 'CUST-002', name: 'نورة السديري', phone: '0568291039', balance: -150.0, lastPurchase: '2026-07-08' },
    { id: 'CUST-003', name: 'مكتب العاصمة للمقاولات', phone: '0548102948', balance: 3500.0, lastPurchase: '2026-07-05' },
    { id: 'CUST-004', name: 'ريان الغامدي', phone: '0558194038', balance: 0.0, lastPurchase: '2026-07-01' },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 'EXP-2301', title: 'شراء أحبار ومستلزمات طابعة فواتير المحل', category: 'نثرية', amount: 45.0, time: '10:15 ص' },
    { id: 'EXP-2302', title: 'صيانة تكييف الصالة والمستودع', category: 'صيانة', amount: 150.0, time: '11:30 ص' },
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Cashbox & Daily balance tracker
  const [totalSalesToday, setTotalSalesToday] = useState<number>(3420.00);
  const [totalCashboxBalance, setTotalCashboxBalance] = useState<number>(10450.00);

  // POS State Workspace
  const [posCart, setPosCart] = useState<CartItem[]>([]);
  const [posDiscount, setPosDiscount] = useState<number>(0);
  const [posPaymentMethod, setPosPaymentMethod] = useState<PaymentMethod>('كاش');
  const [selectedPOSCustomer, setSelectedPOSCustomer] = useState<string>('عميل نقدي');

  // Purchase State Workspace
  const [purchaseInvoiceItems, setPurchaseInvoiceItems] = useState<InvoiceItem[]>([
    { name: 'حليب كامل الدسم طويل الأجل المراعي', quantity: 60, unitPrice: 18.0 },
    { name: 'جبنة موزاريلا مبشورة 200 جرام المراعي', quantity: 40, unitPrice: 22.0 },
  ]);
  const [supplierName, setSupplierName] = useState<string>('شركة المراعي المحدودة');
  const [purchaseInvoicePaid, setPurchaseInvoicePaid] = useState<number>(1500.0);

  // Dialog / Modal Visibility States
  const [isAddProductOpen, setIsAddProductOpen] = useState<boolean>(false);
  const [isCloseDayOpen, setIsCloseDayOpen] = useState<boolean>(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState<boolean>(false);

  // New product form states
  const [newProdCode, setNewProdCode] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('البقالة');
  const [newProdStock, setNewProdStock] = useState('50');
  const [newProdBuyPrice, setNewProdBuyPrice] = useState('15');
  const [newProdSellPrice, setNewProdSellPrice] = useState('22');

  // Receipt meta (for printer simulation)
  const [lastOrderDetails, setLastOrderDetails] = useState<{
    items: CartItem[];
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    paymentMethod: string;
    customer: string;
    invoiceNo: string;
  } | null>(null);

  // Shift closing states
  const [drawerCashInput, setDrawerCashInput] = useState<string>('10450');

  // Handler Functions
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleStartUsing = () => {
    setIsSetupCompleted(true);
    setCurrentScreen('dashboard');
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdCode || !newProdName) return;

    const stock = Number(newProdStock);
    const buyPrice = Number(newProdBuyPrice);
    const sellPrice = Number(newProdSellPrice);

    const isLow = stock <= 10;
    const isOut = stock === 0;

    const newProd: Product = {
      code: newProdCode,
      name: newProdName,
      category: newProdCategory,
      stock,
      buyPrice,
      sellPrice,
      status: isOut ? 'منفذ' : isLow ? 'محدود' : 'نشط',
    };

    setProducts([newProd, ...products]);
    setIsAddProductOpen(false);

    // Reset Form
    setNewProdCode('');
    setNewProdName('');
    setNewProdStock('50');
    setNewProdBuyPrice('15');
    setNewProdSellPrice('22');
  };

  const handleAddExpense = (title: string, category: string, amount: number) => {
    const nextExpense: Expense = {
      id: `EXP-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      amount,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setExpenses([nextExpense, ...expenses]);
    setTotalCashboxBalance((prev) => prev - amount);
  };

  const handlePOSCheckout = () => {
    if (posCart.length === 0) return;

    const subtotal = posCart.reduce((sum, item) => sum + item.product.sellPrice * item.quantity, 0);
    const tax = taxEnabled ? subtotal * 0.15 : 0;
    const total = subtotal + tax - posDiscount;

    // Deduct stock levels of products in DB
    const updatedProducts = products.map((prod) => {
      const cartMatch = posCart.find((item) => item.product.code === prod.code);
      if (cartMatch) {
        const nextStock = Math.max(0, prod.stock - cartMatch.quantity);
        return {
          ...prod,
          stock: nextStock,
          status: nextStock === 0 ? 'منفذ' : nextStock <= 10 ? ('محدود' as const) : ('نشط' as const),
        };
      }
      return prod;
    });

    setProducts(updatedProducts);

    // If payment method is 'كاش', add to cashbox balance
    if (posPaymentMethod === 'كاش') {
      setTotalCashboxBalance((prev) => prev + total);
    }

    // Add to daily sales
    setTotalSalesToday((prev) => prev + total);

    // Prepare receipt details
    const orderNum = `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastOrderDetails({
      items: [...posCart],
      subtotal,
      tax,
      discount: posDiscount,
      total,
      paymentMethod: posPaymentMethod,
      customer: selectedPOSCustomer,
      invoiceNo: orderNum,
    });

    // Empty pos workspace
    setPosCart([]);
    setPosDiscount(0);
    setPosPaymentMethod('كاش');
    setSelectedPOSCustomer('عميل نقدي');

    setIsReceiptOpen(true);
  };

  const handleSavePurchaseInvoice = () => {
    const totalCost = purchaseInvoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    
    // Deduct cash paid from cashbox balance
    setTotalCashboxBalance((prev) => prev - purchaseInvoicePaid);

    // Reset purchase invoice workspace
    setPurchaseInvoiceItems([
      { name: 'حليب كامل الدسم طويل الأجل المراعي', quantity: 60, unitPrice: 18.0 },
      { name: 'جبنة موزاريلا مبشورة 200 جرام المراعي', quantity: 40, unitPrice: 22.0 },
    ]);
    setPurchaseInvoicePaid(1500.0);

    alert(`تم حفظ وتأكيد فاتورة الشراء بنجاح بقيمة ${totalCost.toLocaleString()} ${currency}، وتم زيادة المخزون تلقائياً.`);
  };

  return (
    <div className="w-[1440px] h-[900px] mx-auto bg-slate-100 flex flex-row overflow-hidden select-none border border-slate-200 shadow-2xl relative font-sans">
      
      {/* Sidebar (RTL means right-aligned sidebar, so we use flex-row) */}
      {isLoggedIn && currentScreen !== 'wizard' && (
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onLogout={handleLogout}
        />
      )}

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full bg-[#f8f9ff] overflow-hidden">
        
        {/* Header Layout */}
        {isLoggedIn && currentScreen !== 'wizard' && (
          <Header
            currentScreen={currentScreen}
            businessName={businessName}
            onOpenCloseDayModal={() => setIsCloseDayOpen(true)}
          />
        )}

        {/* Dynamic Route Rendering Viewport */}
        <main className={`flex-1 overflow-y-auto ${isLoggedIn && currentScreen !== 'wizard' ? 'p-6' : ''}`}>
          
          {/* Screen 1: Login & License Check */}
          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={handleLoginSuccess}
              onImportLicense={() => alert('محاكي: تم تحميل ترخيص ميزان السنوي (.lic) بنجاح وجرى توثيق النسخة للجهاز.')}
              licenseExpiry={licenseExpiry}
            />
          )}

          {/* Screen 2: First Setup Wizard */}
          {currentScreen === 'wizard' && (
            <SetupWizardScreen
              businessName={businessName}
              setBusinessName={setBusinessName}
              businessType={businessType}
              setBusinessType={setBusinessType}
              currency={currency}
              setCurrency={setCurrency}
              taxEnabled={taxEnabled}
              setTaxEnabled={setTaxEnabled}
              onStartUsing={handleStartUsing}
            />
          )}

          {/* Screen 3: Main Dashboard */}
          {isLoggedIn && currentScreen === 'dashboard' && (
            <DashboardScreen
              products={products}
              expenses={expenses}
              totalSalesToday={totalSalesToday}
              totalCashboxBalance={totalCashboxBalance}
              currency={currency}
              onNavigate={(screen) => setCurrentScreen(screen)}
              onOpenAddProductModal={() => setIsAddProductOpen(true)}
              onOpenCloseDayModal={() => setIsCloseDayOpen(true)}
            />
          )}

          {/* Screen 4: POS Checkout */}
          {isLoggedIn && currentScreen === 'pos' && (
            <POSScreen
              products={products}
              customers={customers}
              posCart={posCart}
              setPosCart={setPosCart}
              posDiscount={posDiscount}
              setPosDiscount={setPosDiscount}
              posPaymentMethod={posPaymentMethod}
              setPosPaymentMethod={setPosPaymentMethod}
              selectedPOSCustomer={selectedPOSCustomer}
              setSelectedPOSCustomer={setSelectedPOSCustomer}
              taxEnabled={taxEnabled}
              currency={currency}
              onCheckout={handlePOSCheckout}
              onSuspend={() => alert('تم تعليق الفاتورة بنجاح في انتظار مراجعة العميل (المسار المعلق #034)')}
              onReturnInvoice={() => alert('محاكي: جاري تحميل شاشة الفواتير السابقة لاختيار الفاتورة المراد إصدار مرتجع لها...')}
            />
          )}

          {/* Screen 5: Products & Inventory */}
          {isLoggedIn && currentScreen === 'products' && (
            <ProductsScreen
              products={products}
              currency={currency}
              onOpenAddProductModal={() => setIsAddProductOpen(true)}
              onImportExcel={() => alert('تم استيراد عدد 240 صنف جديد من ملف الجرد بنجاح دون أي كميات متعارضة.')}
              onAdjustment={() => alert('محاكي: تم تفويض تعديل تسوية المخزون وإبلاغ المدير المالي.')}
            />
          )}

          {/* Screen 6: Purchases */}
          {isLoggedIn && currentScreen === 'purchases' && (
            <PurchasesScreen
              purchaseInvoiceItems={purchaseInvoiceItems}
              setPurchaseInvoiceItems={setPurchaseInvoiceItems}
              supplierName={supplierName}
              setSupplierName={setSupplierName}
              purchaseInvoicePaid={purchaseInvoicePaid}
              setPurchaseInvoicePaid={setPurchaseInvoicePaid}
              currency={currency}
              onSavePurchaseInvoice={handleSavePurchaseInvoice}
            />
          )}

          {/* Screen 7: Expenses & Cashbox */}
          {isLoggedIn && currentScreen === 'expenses' && (
            <ExpensesScreen
              expenses={expenses}
              onAddExpense={handleAddExpense}
              totalSalesToday={totalSalesToday}
              totalCashboxBalance={totalCashboxBalance}
              currency={currency}
              onOpenCloseDayModal={() => setIsCloseDayOpen(true)}
            />
          )}

          {/* Screen 8: Customers */}
          {isLoggedIn && currentScreen === 'customers' && (
            <CustomersScreen
              customers={customers}
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              currency={currency}
              onPrintStatement={(c) => alert(`تم توليد وطباعة كشف الحساب المالي للعميل: ${c.name} بالكامل بنجاح.`)}
              onAddCustomer={() => {
                const nextId = `CUST-00${customers.length + 1}`;
                const newCustomer: Customer = {
                  id: nextId,
                  name: `عميل إضافي جديد #${customers.length + 1}`,
                  phone: '050' + Math.floor(1000000 + Math.random() * 9000000),
                  balance: 0.0,
                  lastPurchase: '2026-07-09'
                };
                setCustomers([...customers, newCustomer]);
              }}
            />
          )}

          {/* Screen 9: Reports */}
          {isLoggedIn && currentScreen === 'reports' && (
            <ReportsScreen
              currency={currency}
              onExportPDF={() => alert('تم استخراج ملف ميزان الضرائب والأرباح بصيغة PDF بنجاح.')}
              onExportExcel={() => alert('تم تصدير ملفات الجرد اليومي والضرائب لبرنامج Excel بنجاح.')}
            />
          )}

          {/* Screen 10: Backup & License */}
          {isLoggedIn && currentScreen === 'backup' && (
            <BackupLicenseScreen
              businessName={businessName}
              licenseType={licenseType}
              licenseExpiry={licenseExpiry}
              onRunBackup={() => alert('تم أخذ نسخة احتياطية محلية ناجحة لقاعدة البيانات SQLite وتصديرها للملف.')}
              onRestoreBackup={() => alert('جاري تحميل كود الاسترداد السريع لقاعدة البيانات...')}
              onChooseFolder={() => alert('تم تغيير المسار الافتراضي للنسخ الاحتياطية بنجاح.')}
              onActivateLicense={(code) => alert(`تم التحقق من الكود المالي: [${code}]، وجرى تمديد صلاحية النسخة لعام إضافي.`)}
              onImportLicenseFile={() => alert('تم استيراد ملف الترخيص (.lic) وتحديث باقة الأجهزة الفورية.')}
            />
          )}

        </main>
      </div>

      {/* --- POPUP DIALOGS / MODALS --- */}

      {/* MODAL 1: ADD PRODUCT DIALOG */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-[540px] border border-slate-100 p-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-[#031635]">بطاقة صنف مالي جديد</span>
              <button 
                onClick={() => setIsAddProductOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">رمز الباركود / كود الصنف</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: PROD-901"
                    value={newProdCode}
                    onChange={(e) => setNewProdCode(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">اسم المنتج التجاري</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أرز منسف هندي"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#031635]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">فئة القسم المعتمد</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#031635]"
                  >
                    <option value="البقالة">البقالة</option>
                    <option value="المشروبات">المشروبات</option>
                    <option value="المنظفات">المنظفات</option>
                    <option value="المجمدات">المجمدات</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">الكمية الافتتاحية للمخزن</label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">سعر التكلفة والشراء</label>
                  <input
                    type="number"
                    required
                    placeholder="15.00"
                    value={newProdBuyPrice}
                    onChange={(e) => setNewProdBuyPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">سعر البيع المقترح لعميلك</label>
                  <input
                    type="number"
                    required
                    placeholder="22.00"
                    value={newProdSellPrice}
                    onChange={(e) => setNewProdSellPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end gap-3.5">
                <Button
                  id="cancel-add-prod-btn"
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  variant="secondary"
                  className="px-5 text-xs font-bold"
                >
                  إلغاء التعديل
                </Button>
                
                <Button
                  id="submit-add-prod-btn"
                  type="submit"
                  variant="primary"
                  className="px-5 text-xs font-bold"
                >
                  حفظ الصنف للجريدة
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SHIFT CLOSING & VARIANCE RECONCILIATION */}
      {isCloseDayOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-[500px] border border-slate-100 p-6">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <span className="text-xs font-bold text-[#031635] flex items-center gap-1.5 font-sans">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                تقفيل الوردية اليومية ومطابقة صندوق الخزنة
              </span>
              <button 
                onClick={() => setIsCloseDayOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="bg-amber-50 border border-amber-200 text-amber-900 p-3 rounded-lg text-[10px] leading-relaxed">
                يرجى جرد النقدية السائلة المتوفرة بالخزنة المادية الآن وإدخالها لمطابقتها مع الأرصدة الدفترية والمسجلة في قاعدة البيانات SQLite لمنع التلاعب.
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>الرصيد الدفتري المتوقع بالخزنة:</span>
                  <span className="font-bold text-slate-800">{totalCashboxBalance.toLocaleString()} {currency}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-500 font-mono">
                  <span>إجمالي مبيعات اليوم المحققة:</span>
                  <span className="font-bold text-slate-800">{totalSalesToday.toLocaleString()} {currency}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1.5">المبلغ الفعلي المالي المتواجد حالياً بالخزنة:</label>
                <div className="relative">
                  <input
                    type="number"
                    value={drawerCashInput}
                    onChange={(e) => setDrawerCashInput(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-[#031635] focus:ring-1 focus:ring-[#031635]"
                  />
                  <span className="absolute inset-y-0 left-3.5 flex items-center text-xs font-bold text-slate-400">
                    {currency}
                  </span>
                </div>
              </div>

              {/* Count variance */}
              {(() => {
                const diff = Number(drawerCashInput) - totalCashboxBalance;
                return (
                  <div className={`p-3 rounded-lg border font-semibold text-[11px] ${
                    diff === 0 
                      ? 'bg-emerald-50 border-emerald-200 text-[#006c49]' 
                      : diff > 0 
                        ? 'bg-blue-50 border-blue-200 text-blue-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <span>نتيجة المطابقة والفرز: </span>
                    {diff === 0 ? (
                      <span>مكتمل بنجاح دون أي فروق مالية (صندوق متطابق).</span>
                    ) : diff > 0 ? (
                      <span>هناك فائض غير مقيد قدره <strong className="font-mono">+{diff.toFixed(2)} {currency}</strong>.</span>
                    ) : (
                      <span>هناك عجز غير مبرر بالخزنة قدره <strong className="font-mono">{diff.toFixed(2)} {currency}</strong>.</span>
                    )}
                  </div>
                );
              })()}

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">ملاحظات وسبب الفروق (إن وجد)</label>
                <textarea
                  placeholder="أدخل أي ملاحظات على الوردية لتصديرها مع التقرير اليومي للمدير المالي..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder:text-slate-400 h-16 focus:outline-none focus:border-[#031635]"
                />
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end gap-3">
                <Button
                  id="cancel-close-day"
                  onClick={() => setIsCloseDayOpen(false)}
                  variant="secondary"
                  className="px-5 font-bold"
                >
                  الرجوع للوردية الجارية
                </Button>

                <Button
                  id="confirm-close-day"
                  onClick={() => {
                    const diff = Number(drawerCashInput) - totalCashboxBalance;
                    alert(`تم تقفيل الوردية المالية بنجاح للغلق اليومي.\nالفرق المالي الموثق: ${diff.toFixed(2)} ${currency}.\nتم ترحيل البيانات للقرص الصلب.`);
                    setTotalSalesToday(0);
                    setTotalCashboxBalance(Number(drawerCashInput));
                    setIsCloseDayOpen(false);
                  }}
                  variant="primary"
                  className="px-5 font-bold"
                >
                  تأكيد إغلاق الوردية والترحيل
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: POS THERMAL RECEIPT EMULATOR */}
      {isReceiptOpen && lastOrderDetails && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-xl w-[380px] border border-slate-100 p-6">
            
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-100 mb-3.5">
              <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200/50 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                فاتورة مبيعات معتمدة
              </span>
              <button 
                onClick={() => setIsReceiptOpen(false)} 
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thermal Slip Content */}
            <div className="bg-slate-50 border border-dashed border-slate-200 p-4.5 rounded-lg text-xs space-y-3 font-mono text-slate-700">
              <div className="text-center pb-2.5 border-b border-dashed border-slate-200">
                <h4 className="font-sans font-black text-sm text-[#031635]">{businessName}</h4>
                <p className="font-sans text-[10px] text-slate-400 mt-1">فاتورة مبيعات مبسطة رقمية</p>
                <p className="text-[9px] text-slate-400 mt-0.5">الرقم: {lastOrderDetails.invoiceNo}</p>
              </div>

              {/* Items listing */}
              <div className="space-y-2 border-b border-dashed border-slate-200 pb-2.5">
                {lastOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10px]">
                    <div className="text-right font-sans">
                      <span className="font-bold text-slate-800 block text-[11px]">{item.product.name}</span>
                      <span className="text-slate-400 font-mono">{item.quantity} وحدة × {item.product.sellPrice.toFixed(2)}</span>
                    </div>
                    <span className="font-bold text-slate-800 font-mono">{(item.product.sellPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1 text-[11px] border-b border-dashed border-slate-200 pb-2.5">
                <div className="flex justify-between">
                  <span className="font-sans text-slate-500">مجموع المبيعات:</span>
                  <span>{lastOrderDetails.subtotal.toFixed(2)} {currency}</span>
                </div>
                
                {lastOrderDetails.tax > 0 && (
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-500">ضريبة القيمة المضافة (15%):</span>
                    <span>{lastOrderDetails.tax.toFixed(2)} {currency}</span>
                  </div>
                )}

                {lastOrderDetails.discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span className="font-sans">خصم خاص مباشر:</span>
                    <span>-{lastOrderDetails.discount.toFixed(2)} {currency}</span>
                  </div>
                )}

                <div className="flex justify-between text-xs font-black text-[#031635] pt-1 font-sans">
                  <span>المبلغ المدفوع كلياً:</span>
                  <span className="font-mono text-[#006c49]">{lastOrderDetails.total.toFixed(2)} {currency}</span>
                </div>
              </div>

              <div className="text-center pt-1.5 text-[9px] text-slate-400 font-sans">
                <p>طريقة التسوية: [{lastOrderDetails.paymentMethod}]</p>
                <p className="mt-1 font-medium text-slate-500">شكراً لزيارتكم متجرنا الفخم</p>
                <p className="text-[8px] mt-0.5">v3.4.1 - Mizan Local Embedded Core</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 space-y-2">
              <Button
                id="thermal-print-direct"
                onClick={() => {
                  alert('محاكي: جاري إرسال الفاتورة لخط طابعة Thermal المباشرة عبر بروتوكول ESC/POS المحلى...');
                  setIsReceiptOpen(false);
                }}
                variant="primary"
                className="w-full py-2.5 font-bold text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                طباعة الفاتورة الفورية (ESC/POS)
              </Button>

              <Button
                id="close-receipt-popup"
                onClick={() => setIsReceiptOpen(false)}
                variant="secondary"
                className="w-full py-2 text-xs font-semibold"
              >
                إغلاق والرجوع لبيع تالي
              </Button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
