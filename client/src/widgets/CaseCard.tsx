import {
  CalendarDaysIcon,
  DocumentArrowUpIcon,
  EnvelopeIcon,
  FolderOpenIcon,
  PaperAirplaneIcon,
  ShareIcon
} from '@heroicons/react/24/outline';
import { agencies, CaseItem } from '../data/demoData';
import clsx from 'clsx';

interface Props {
  item: CaseItem;
}

const statusClasses: Record<CaseItem['status'], string> = {
  ожидание: 'status-waiting',
  рассмотрение: 'status-review',
  'ответ получен': 'status-received'
};

const CaseCard = ({ item }: Props) => {
  const agency = agencies.find((agencyItem) => agencyItem.id === item.agencyId);
  const progress = Math.min(100, Math.max(0, item.progress));

  return (
    <article id={item.id} className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">{item.title}</h3>
          <p className="text-sm text-text-secondary">{agency?.name}</p>
        </div>
        <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold', statusClasses[item.status])}>
          {item.status}
        </span>
      </header>
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>Прогресс</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface-muted dark:bg-slate-700">
          <div className="gradient-progress h-full rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-text-secondary">
        <CalendarDaysIcon className="h-5 w-5 text-indigo-500" />
        <span>Дедлайн: {new Date(item.deadline).toLocaleDateString()}</span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        {item.documents.map((doc) => (
          <span key={doc} className="rounded-full bg-surface-muted px-3 py-1 dark:bg-slate-700">
            {doc}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-surface-muted p-4 text-sm text-text-secondary dark:bg-slate-700">
        <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">Последний комментарий</p>
        <p className="mt-2 text-text-primary">{item.comment}</p>
      </div>
      <footer className="mt-6 flex flex-wrap items-center gap-3 text-sm">
        <button className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-indigo-600 transition hover:bg-indigo-100 dark:bg-indigo-900/40 dark:text-indigo-200">
          <FolderOpenIcon className="h-4 w-4" /> Открыть
        </button>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-text-secondary shadow-sm transition hover:bg-surface-muted dark:bg-slate-800">
          <DocumentArrowUpIcon className="h-4 w-4" /> Добавить документ
        </button>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-text-secondary shadow-sm transition hover:bg-surface-muted dark:bg-slate-800">
          <ShareIcon className="h-4 w-4" /> Поделиться
        </button>
        <button className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-text-secondary shadow-sm transition hover:bg-surface-muted dark:bg-slate-800">
          <EnvelopeIcon className="h-4 w-4" /> Сгенерировать письмо
        </button>
        <button className="ml-auto flex items-center gap-2 text-xs uppercase tracking-wide text-indigo-500">
          <PaperAirplaneIcon className="h-4 w-4" /> Отправить напоминание
        </button>
      </footer>
    </article>
  );
};

export default CaseCard;
