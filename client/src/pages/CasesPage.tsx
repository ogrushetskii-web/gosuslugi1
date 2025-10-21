import { FunnelIcon } from '@heroicons/react/24/outline';
import { cases } from '../data/demoData';
import CaseCard from '../widgets/CaseCard';

const statuses = ['все', 'ожидание', 'рассмотрение', 'ответ получен'];

const CasesPage = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Все семейные дела</h1>
          <p className="text-sm text-text-secondary">Фильтры по статусам, ведомствам и дедлайнам помогут сфокусироваться.</p>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-sm text-text-secondary shadow-sm hover:bg-surface-muted dark:bg-slate-800">
          <FunnelIcon className="h-4 w-4" /> Настроить фильтры
        </button>
      </header>
      <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
        {statuses.map((status) => (
          <button
            key={status}
            className={`rounded-full px-4 py-2 ${status === 'все' ? 'rainbow-border bg-white font-semibold text-text-primary' : 'bg-white shadow-sm hover:bg-surface-muted dark:bg-slate-800'}`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {cases.map((item) => (
          <CaseCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CasesPage;
