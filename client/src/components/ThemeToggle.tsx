import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { useUIStore, ThemeMode } from '../store/useUIStore';

const modes: { value: ThemeMode; label: string; icon: typeof SunIcon }[] = [
  { value: 'light', label: 'Светлая', icon: SunIcon },
  { value: 'dark', label: 'Тёмная', icon: MoonIcon },
  { value: 'system', label: 'Системная', icon: ComputerDesktopIcon }
];

const ThemeToggle = () => {
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);

  return (
    <div className="flex items-center gap-1 rounded-full bg-surface-muted/60 p-1">
      {modes.map(({ value, label, icon: Icon }) => {
        const active = value === theme;
        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-colors ${
              active
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                : 'text-slate-500 hover:bg-white/60 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
            aria-pressed={active}
          >
            <Icon className="h-4 w-4" aria-hidden />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
