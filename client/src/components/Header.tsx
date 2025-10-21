import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { NavLink } from 'react-router-dom';
import GlobalSearchInput from './GlobalSearchInput';
import ThemeToggle from './ThemeToggle';
import { useTranslation } from 'react-i18next';

const navItems = [
  { to: '/', label: 'Наши дела' },
  { to: '/cases', label: 'Дела' },
  { to: '/documents', label: 'Документы' },
  { to: '/settings', label: 'Настройки' }
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 bg-gray-50/80 px-8 py-6 backdrop-blur dark:bg-slate-900/80">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-text-primary">Наши дела</h1>
            <p className="text-sm text-text-secondary">Семейный контроль в одном месте</p>
          </div>
          <div className="flex items-center -space-x-4">
            {[
              { name: 'Алексей', initials: 'А', color: 'bg-blue-500' },
              { name: 'Мария', initials: 'М', color: 'bg-pink-500' }
            ].map((person) => (
              <div key={person.name} className="avatar-ring relative h-12 w-12 overflow-hidden rounded-full bg-white p-[2px]">
                <div className={`flex h-full w-full items-center justify-center rounded-full text-lg font-semibold text-white ${person.color}`}>
                  {person.initials}
                </div>
              </div>
            ))}
          </div>
        </div>
        <nav className="flex items-center gap-3 text-sm font-medium text-text-secondary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition-all ${
                  isActive
                    ? 'rainbow-border bg-white text-text-primary shadow-card'
                    : 'text-text-secondary hover:bg-white/70'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <GlobalSearchInput className="w-full max-w-xl" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm shadow-sm dark:bg-slate-800">
            <ShieldCheckIcon className="h-4 w-4 text-emerald-500" aria-hidden />
            <span className="text-text-secondary">{t('security')}</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
