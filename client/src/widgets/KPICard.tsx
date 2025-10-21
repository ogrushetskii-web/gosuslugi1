import { ReactNode } from 'react';

interface Props {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

const KPICard = ({ title, value, description, icon, loading, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start rounded-xl bg-white p-6 text-left shadow-sm transition card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-slate-800"
    >
      <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 p-3 text-white shadow-md">
        {icon}
      </div>
      <p className="mt-4 text-sm font-medium text-text-secondary">{title}</p>
      {loading ? (
        <div className="mt-3 h-8 w-2/3 skeleton" />
      ) : (
        <p className="mt-3 text-3xl font-semibold text-text-primary">{value}</p>
      )}
      <p className="mt-2 text-xs text-text-secondary">{description}</p>
    </button>
  );
};

export default KPICard;
