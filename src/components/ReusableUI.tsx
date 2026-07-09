import React from 'react';

// --- CARD COMPONENT ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}
export function Card({ children, className = '', onClick, id }: CardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-5 ${
        onClick ? 'cursor-pointer hover:border-[#031635]/30' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

// --- BUTTON COMPONENT ---
interface ButtonProps {
  variant?: 'primary' | 'success' | 'danger' | 'secondary' | 'outline';
  children: React.ReactNode;
  className?: string;
  id?: string;
  type?: 'submit' | 'button' | 'reset';
  onClick?: (e: any) => void;
  disabled?: boolean;
}
export function Button({ variant = 'primary', children, className = '', id, type = 'button', onClick, disabled, ...props }: ButtonProps) {
  const baseStyle = 'px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 focus:outline-none flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#031635] text-white hover:bg-[#142646] hover:shadow-sm',
    success: 'bg-[#006c49] text-white hover:bg-[#005439] hover:shadow-sm',
    danger: 'bg-[#ba1a1a] text-white hover:bg-[#961212] hover:shadow-sm',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
    outline: 'border border-[#031635] text-[#031635] hover:bg-[#031635]/5',
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// --- INPUT COMPONENT ---
interface InputProps {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  type?: string;
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function Input({ label, error, className = '', id, type = 'text', value, defaultValue, placeholder, required, disabled, onChange, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className={`w-full px-3.5 py-2.5 bg-white border ${
          error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#031635]'
        } rounded-lg text-xs font-sans placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#031635]/10 transition-all duration-150 ${className}`}
        {...props}
      />
      {error && <p className="text-[10px] text-red-600 mt-1 font-semibold">{error}</p>}
    </div>
  );
}

// --- SELECT COMPONENT ---
interface SelectProps {
  label?: string;
  children: React.ReactNode;
  id?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}
export function Select({ label, children, className = '', id, value, onChange, disabled, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-3.5 py-2.5 bg-white border border-slate-200 focus:border-[#031635] rounded-lg text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#031635]/10 transition-all duration-150 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}

// --- BADGE COMPONENT ---
interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'neutral';
  children: React.ReactNode;
  className?: string;
}
export function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  const styles = {
    success: 'bg-[#eefcf5] text-[#006c49] border border-[#a2dbbe]',
    warning: 'bg-[#fffbeb] text-[#b45309] border border-[#fde68a]',
    error: 'bg-[#fef2f2] text-[#ba1a1a] border border-[#fca5a5]',
    neutral: 'bg-slate-50 text-slate-600 border border-slate-200',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}

// --- TABLE COMPONENTS ---
interface TableProps {
  headers: string[];
  children: React.ReactNode;
  className?: string;
}
export function Table({ headers, children, className = '' }: TableProps) {
  return (
    <div className={`w-full overflow-x-auto border border-slate-100 rounded-xl bg-white shadow-sm ${className}`}>
      <table className="w-full text-right text-xs border-collapse">
        <thead>
          <tr className="bg-slate-50 text-slate-600 border-b border-slate-100 font-bold">
            {headers.map((header, idx) => (
              <th key={idx} className="p-3 font-semibold text-slate-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {children}
        </tbody>
      </table>
    </div>
  );
}
