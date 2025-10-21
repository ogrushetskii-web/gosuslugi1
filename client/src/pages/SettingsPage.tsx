import { Link } from 'react-router-dom';
import {
  ArrowDownTrayIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Настройки семьи</h1>
          <p className="text-sm text-text-secondary">Управляйте безопасностью, уведомлениями и экспортом данных.</p>
        </div>
        <Link
          to="/settings/security"
          className="rainbow-border rounded-full bg-white px-5 py-2 text-sm font-medium text-text-primary shadow-sm"
        >
          Центр безопасности
        </Link>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
          <div className="flex items-center gap-3 text-text-primary">
            <UsersIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Члены семьи</h2>
          </div>
          <p className="mt-3 text-sm text-text-secondary">Добавляйте партнёров и управляйте их ролями партнёр или админ.</p>
          <button className="mt-4 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600">
            Пригласить партнёра
          </button>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
          <div className="flex items-center gap-3 text-text-primary">
            <LockClosedIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Безопасность</h2>
          </div>
          <p className="mt-3 text-sm text-text-secondary">
            Включите двухфакторную аутентификацию TOTP, настройте контроль доступа и просматривайте журнал действий.
          </p>
          <button className="mt-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-sm">
            Настроить 2FA
          </button>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
          <div className="flex items-center gap-3 text-text-primary">
            <ShieldCheckIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Уведомления</h2>
          </div>
          <p className="mt-3 text-sm text-text-secondary">Выберите каналы: push, email, sms и настройте расписание.</p>
          <button className="mt-4 rounded-full border border-border-subtle px-4 py-2 text-sm text-text-secondary shadow-sm hover:bg-surface-muted dark:bg-slate-800">
            Открыть настройки
          </button>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
          <div className="flex items-center gap-3 text-text-primary">
            <GlobeAltIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Язык и форматы</h2>
          </div>
          <p className="mt-3 text-sm text-text-secondary">Поддерживаем ru, en, nl с автоматическим подбором даты и валюты.</p>
          <div className="mt-4 flex gap-2 text-xs">
            {['ru', 'en', 'nl'].map((lang) => (
              <button key={lang} className="rounded-full bg-white px-4 py-2 text-text-primary shadow-sm hover:bg-surface-muted dark:bg-slate-700">
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-white p-6 shadow-sm card-hover dark:bg-slate-800">
          <div className="flex items-center gap-3 text-text-primary">
            <ArrowDownTrayIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Экспорт данных</h2>
          </div>
          <p className="mt-3 text-sm text-text-secondary">Соберите архив дел, документов и истории действий одним кликом.</p>
          <button className="mt-4 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 dark:bg-white dark:text-slate-900">
            Скачать архив
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
