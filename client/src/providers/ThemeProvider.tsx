import { PropsWithChildren, useEffect } from 'react';
import { useUIStore } from '../store/useUIStore';

const prefersDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    const applied = theme === 'system' ? (prefersDark() ? 'dark' : 'light') : theme;
    root.dataset.theme = applied;
    root.classList.toggle('dark', applied === 'dark');
  }, [theme]);

  useEffect(() => {
    if (theme === 'system') {
      const listener = (event: MediaQueryListEvent) => {
        const root = document.documentElement;
        const applied = event.matches ? 'dark' : 'light';
        root.dataset.theme = applied;
        root.classList.toggle('dark', applied === 'dark');
      };
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
    return undefined;
  }, [theme]);

  return children;
};
