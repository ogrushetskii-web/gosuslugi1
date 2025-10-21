export interface Agency {
  id: string;
  name: string;
  accent: string;
}

export interface CaseItem {
  id: string;
  title: string;
  agencyId: string;
  status: 'ожидание' | 'рассмотрение' | 'ответ получен';
  deadline: string;
  progress: number;
  documents: string[];
  comment: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  previewColor: string;
  tags: string[];
  updatedAt: string;
}

export const agencies: Agency[] = [
  { id: 'mfc', name: 'МФЦ Центральный', accent: 'from-indigo-500 to-purple-500' },
  { id: 'pfr', name: 'ПФР Северный округ', accent: 'from-emerald-500 to-teal-500' },
  { id: 'nalog', name: 'ФНС №15', accent: 'from-amber-500 to-rose-500' }
];

export const cases: CaseItem[] = [
  {
    id: 'case-1',
    title: 'Оформление детского пособия',
    agencyId: 'pfr',
    status: 'рассмотрение',
    deadline: '2024-04-22',
    progress: 65,
    documents: ['Заявление', 'Справка о доходах'],
    comment: 'Специалист запросил уточнение по справке из школы. Мы уточнили информацию у классного руководителя.'
  },
  {
    id: 'case-2',
    title: 'Субсидия на ЖКХ',
    agencyId: 'mfc',
    status: 'ожидание',
    deadline: '2024-04-30',
    progress: 35,
    documents: ['Квитанции ЖКХ', 'Свидетельство о собственности'],
    comment: 'Заявка отправлена, ожидаем проверки платежных документов.'
  },
  {
    id: 'case-3',
    title: 'Паспорт гражданина РФ',
    agencyId: 'mfc',
    status: 'ответ получен',
    deadline: '2024-05-05',
    progress: 100,
    documents: ['Квитанция об оплате', 'Фото 3x4'],
    comment: 'Документы готовы к выдаче, забрать в МФЦ до 5 мая.'
  }
];

export const documents: DocumentItem[] = [
  {
    id: 'doc-1',
    title: 'Свидетельство о браке',
    previewColor: 'from-pink-500 to-rose-500',
    tags: ['семья', 'оригинал'],
    updatedAt: '2024-03-12 14:32'
  },
  {
    id: 'doc-2',
    title: 'Справка из школы',
    previewColor: 'from-blue-500 to-sky-500',
    tags: ['дети', 'образование'],
    updatedAt: '2024-04-01 09:20'
  },
  {
    id: 'doc-3',
    title: 'Копия паспорта Марии',
    previewColor: 'from-amber-500 to-orange-500',
    tags: ['личное', 'паспорт'],
    updatedAt: '2024-04-10 18:02'
  }
];

export const notifications = [
  'ПФР: обновлён статус рассмотрения пособия',
  'Новый документ добавлен: Квитанция ЖКХ за март',
  'Напоминание: завтра дедлайн по делу «Субсидия на ЖКХ»'
];
