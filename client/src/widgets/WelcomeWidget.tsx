import { BellAlertIcon } from '@heroicons/react/24/outline';
import { notifications } from '../data/demoData';

const WelcomeWidget = () => {
  return (
    <section className="rainbow-border relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-pink-500/20 blur-3xl" />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wide text-indigo-500">Виджет уведомлений</p>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">Привет, команда мечты!</h2>
          <p className="mt-2 max-w-xl text-sm text-text-secondary">
            Все ключевые дела семьи собраны здесь. Следите за дедлайнами, добавляйте документы и радуйтесь шагам навстречу мечтам.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-text-secondary">
          {notifications.map((item, index) => (
            <div key={item} className="flex items-center gap-3 rounded-full bg-surface-muted px-4 py-2 dark:bg-slate-700">
              <BellAlertIcon className="h-4 w-4 text-pink-500" />
              <span>{index + 1}. {item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WelcomeWidget;
