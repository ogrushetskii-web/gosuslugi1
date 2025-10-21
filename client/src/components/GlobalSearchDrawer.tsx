import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUIStore } from '../store/useUIStore';
import { cases, documents } from '../data/demoData';
import { Link } from 'react-router-dom';

const GlobalSearchDrawer = () => {
  const search = useUIStore((state) => state.search);
  const setSearch = useUIStore((state) => state.setSearch);
  const open = Boolean(search.trim());
  const keyword = search.toLowerCase();
  const caseMatches = cases.filter((item) =>
    [item.title, item.documents.join(' ')].join(' ').toLowerCase().includes(keyword)
  );
  const documentMatches = documents.filter((doc) =>
    [doc.title, doc.tags.join(' ')].join(' ').toLowerCase().includes(keyword)
  );

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={() => setSearch('')}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-6"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-6"
            >
              <Dialog.Panel className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800">
                <Dialog.Title className="text-lg font-semibold text-text-primary">
                  Поиск по порталу
                </Dialog.Title>
                <p className="mt-2 text-sm text-text-secondary">
                  Результаты по запросу «{search}»
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Дела</h3>
                    <div className="mt-3 space-y-3">
                      {caseMatches.length === 0 && (
                        <p className="text-sm text-slate-400">Ничего не найдено. Попробуйте уточнить запрос.</p>
                      )}
                      {caseMatches.map((item) => (
                        <Link
                          key={item.id}
                          to={`/cases#${item.id}`}
                          onClick={() => setSearch('')}
                          className="block rounded-xl border border-border-subtle bg-surface p-4 text-sm text-text-primary shadow-sm card-hover"
                        >
                          <p className="font-semibold text-text-primary">{item.title}</p>
                          <p className="text-xs text-text-secondary">Документы: {item.documents.join(', ')}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-text-secondary">Документы</h3>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {documentMatches.length === 0 && (
                        <p className="text-sm text-slate-400">Документы не найдены.</p>
                      )}
                      {documentMatches.map((doc) => (
                        <Link
                          key={doc.id}
                          to={`/documents#${doc.id}`}
                          onClick={() => setSearch('')}
                          className="block rounded-xl border border-border-subtle bg-surface p-4 text-sm text-text-primary shadow-sm card-hover"
                        >
                          <p className="font-semibold text-text-primary">{doc.title}</p>
                          <p className="text-xs text-text-secondary">Теги: {doc.tags.join(', ')}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  className="mt-6 w-full rounded-full border border-border-subtle bg-surface py-3 text-sm text-text-secondary hover:bg-surface-muted"
                  onClick={() => setSearch('')}
                >
                  Закрыть
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default GlobalSearchDrawer;
