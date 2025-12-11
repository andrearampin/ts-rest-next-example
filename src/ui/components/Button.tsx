import Spinner from './Spinner';

const BASE_STYLES =
  'px-4 py-2 rounded font-medium transition-colors duration-200 flex items-center justify-center gap-2';

const VARIANT_STYLES = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 disabled:bg-gray-100',
} as const;

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${BASE_STYLES} ${VARIANT_STYLES[variant]}`}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
