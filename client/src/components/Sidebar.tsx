import { useState } from 'react';
import { CheckCircleIcon, PlusIcon } from '@heroicons/react/24/outline';

const tasks = [
  { id: 1, label: 'Подготовить сканы паспортов', completed: false },
  { id: 2, label: 'Оплатить госпошлину за загранпаспорт', completed: true },
  { id: 3, label: 'Проверить статус субсидии', completed: false }
];

const events = [
  { date: 'Сегодня', label: 'Приём в МФЦ', color: 'bg-indigo-500' },
  { date: 'Завтра', label: 'Созвон с куратором', color: 'bg-emerald-500' }
];

const toggles = [
  { id: 'push', label: 'Push' },
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' }
];

const Sidebar = () => {
  const [notifications, setNotifications] = useState({ push: true, email: true, sms: false });

  return (
    <aside className="hidden w-80 flex-shrink-0 flex-col gap-6 bg-transparent p-6 lg:flex">
      <section className="rounded-xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Задачи на сегодня</h2>
          <button className="text-sm text-indigo-500 hover:text-indigo-600">Добавить</button>
        </div>
        <ul className="mt-4 space-y-3">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked={task.completed}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-500 focus:ring-indigo-400"
              />
              <span
                className={`text-sm ${
                  task.completed ? 'text-slate-400 line-through' : 'text-text-primary'
                }`}
              >
                {task.label}
              </span>
            </li>
          ))}
        </ul>
      </section>
      <section className="rounded-xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-text-primary">Календарь</h2>
        <div className="mt-4 rounded-lg bg-surface-muted p-4 text-sm text-text-secondary dark:bg-slate-700">
          <p className="text-base font-semibold text-text-primary">15 апреля 2024</p>
          <p>Ближайшие события:</p>
          <ul className="mt-3 space-y-2">
            {events.map((event) => (
              <li key={event.label} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${event.color}`} aria-hidden />
                <span>{event.date}</span>
                <span className="text-text-primary">— {event.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rounded-xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Уведомления</h2>
          <button className="flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white shadow-sm dark:bg-white dark:text-slate-900">
            <PlusIcon className="h-3 w-3" />
            Управлять
          </button>
        </div>
        <div className="mt-4 space-y-3">
          {toggles.map((toggle) => (
            <button
              key={toggle.id}
              onClick={() =>
                setNotifications((prev) => ({ ...prev, [toggle.id]: !prev[toggle.id as keyof typeof prev] }))
              }
              className={`flex w-full items-center justify-between rounded-full border border-border-subtle px-4 py-2 text-sm transition-colors ${
                notifications[toggle.id as keyof typeof notifications]
                  ? 'rainbow-border bg-white font-medium text-text-primary'
                  : 'text-text-secondary hover:bg-surface-muted'
              }`}
              aria-pressed={notifications[toggle.id as keyof typeof notifications]}
            >
              <span>{toggle.label}</span>
              <span
                className={`flex h-5 w-10 items-center rounded-full p-1 transition ${
                  notifications[toggle.id as keyof typeof notifications] ? 'bg-indigo-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`h-4 w-4 rounded-full bg-white shadow transition ${
                    notifications[toggle.id as keyof typeof notifications] ? 'translate-x-5' : ''
                  }`}
                />
              </span>
            </button>
          ))}
        </div>
        <button className="mt-6 w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
          Настроить 2FA
        </button>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface-muted p-3 text-xs text-text-secondary dark:bg-slate-700">
          <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
          <span>Шифрование включено для всех документов семьи</span>
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
