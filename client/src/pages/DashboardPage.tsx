import { useState } from 'react';
import {
  BoltIcon,
  DocumentTextIcon,
  InboxStackIcon,
  QueueListIcon
} from '@heroicons/react/24/outline';
import WelcomeWidget from '../widgets/WelcomeWidget';
import KPICard from '../widgets/KPICard';
import { cases, documents } from '../data/demoData';
import CaseCard from '../widgets/CaseCard';
import DocumentCard from '../widgets/DocumentCard';
import DocumentDropzone from '../widgets/DocumentDropzone';

const DashboardPage = () => {
  const [loadingKpi] = useState(false);

  return (
    <div className="space-y-8">
      <WelcomeWidget />
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text-primary">Итоги недели</h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600">Смотреть аналитику</button>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KPICard
            title="Активных дел"
            value="3"
            description="Следим за ключевыми направлениями"
            icon={<QueueListIcon className="h-6 w-6" />}
            loading={loadingKpi}
          />
          <KPICard
            title="Новых документов"
            value="12"
            description="За месяц"
            icon={<DocumentTextIcon className="h-6 w-6" />}
            loading={loadingKpi}
          />
          <KPICard
            title="Ожидающих действий"
            value="2"
            description="Нужны решения семьи"
            icon={<BoltIcon className="h-6 w-6" />}
            loading={loadingKpi}
          />
          <KPICard
            title="Входящих откликов"
            value="5"
            description="От ведомств за неделю"
            icon={<InboxStackIcon className="h-6 w-6" />}
            loading={loadingKpi}
          />
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text-primary">Текущие дела</h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600">Показать все</button>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {cases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-text-primary">Последние документы</h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600">Перейти в архив</button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} item={doc} />
          ))}
          <DocumentDropzone />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
