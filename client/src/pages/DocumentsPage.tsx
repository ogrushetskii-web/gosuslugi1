import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import DocumentCard from '../widgets/DocumentCard';
import DocumentDropzone from '../widgets/DocumentDropzone';
import { documents } from '../data/demoData';

const tags = ['все', 'личное', 'дети', 'финансы', 'медицина'];

const DocumentsPage = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Документы семьи</h1>
          <p className="text-sm text-text-secondary">Загружайте файлы, отслеживайте версии и правьте теги в один клик.</p>
        </div>
        <button className="flex items-center gap-2 rounded-full border border-border-subtle bg-white px-4 py-2 text-sm text-text-secondary shadow-sm hover:bg-surface-muted dark:bg-slate-800">
          <AdjustmentsHorizontalIcon className="h-4 w-4" /> Фильтры
        </button>
      </header>
      <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`rounded-full px-4 py-2 ${tag === 'все' ? 'rainbow-border bg-white font-semibold text-text-primary' : 'bg-white shadow-sm hover:bg-surface-muted dark:bg-slate-800'}`}
          >
            #{tag}
          </button>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {documents.map((doc) => (
          <DocumentCard key={doc.id} item={doc} />
        ))}
        <DocumentDropzone />
      </div>
    </div>
  );
};

export default DocumentsPage;
