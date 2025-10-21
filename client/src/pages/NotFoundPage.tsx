import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
    <h1 className="text-6xl font-bold text-text-primary">404</h1>
    <p className="mt-4 text-lg text-text-secondary">Страница не найдена, но семейные дела ждут вашего внимания.</p>
    <Link
      to="/"
      className="mt-6 rounded-full bg-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-600"
    >
      Вернуться на главную
    </Link>
  </div>
);

export default NotFoundPage;
