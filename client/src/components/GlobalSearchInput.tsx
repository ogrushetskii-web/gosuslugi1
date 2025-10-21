import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '../store/useUIStore';

interface Props {
  className?: string;
}

const GlobalSearchInput = ({ className }: Props) => {
  const { t } = useTranslation();
  const search = useUIStore((state) => state.search);
  const setSearch = useUIStore((state) => state.setSearch);

  return (
    <label
      htmlFor="global-search"
      className={`relative flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-sm shadow-sm focus-within:ring-2 focus-within:ring-indigo-400 ${className ?? ''}`}
    >
      <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" aria-hidden />
      <input
        id="global-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full bg-transparent text-sm text-text-primary placeholder:text-slate-400 focus:outline-none"
        aria-label={t('searchPlaceholder')}
      />
    </label>
  );
};

export default GlobalSearchInput;
