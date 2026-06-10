export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400 focus:ring-green-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 disabled:border-blue-300 disabled:text-blue-300 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
