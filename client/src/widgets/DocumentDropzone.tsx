import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';

const DocumentDropzone = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-subtle bg-white p-6 text-center text-sm text-text-secondary shadow-sm card-hover dark:bg-slate-800">
      <ArrowUpOnSquareIcon className="h-10 w-10 text-indigo-500" />
      <p className="mt-3 font-semibold text-text-primary">Перетащите файлы сюда</p>
      <p className="mt-2 text-xs text-text-secondary">Мы автоматически распознаем текст и предложим теги</p>
      <button className="mt-4 rounded-full bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-600">
        Выбрать файлы
      </button>
    </div>
  );
};

export default DocumentDropzone;
