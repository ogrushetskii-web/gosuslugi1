import { DocumentItem } from '../data/demoData';

interface Props {
  item: DocumentItem;
}

const DocumentCard = ({ item }: Props) => {
  return (
    <article id={item.id} className="flex flex-col justify-between rounded-2xl bg-white p-5 shadow-sm card-hover dark:bg-slate-800">
      <div>
        <div
          className={`mb-4 h-24 rounded-xl bg-gradient-to-br ${item.previewColor} p-3 text-sm font-medium text-white shadow-inner`}
        >
          {item.title}
        </div>
        <h3 className="text-lg font-semibold text-text-primary">{item.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-surface-muted px-3 py-1 dark:bg-slate-700">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-text-secondary">Обновлено: {item.updatedAt}</p>
    </article>
  );
};

export default DocumentCard;
