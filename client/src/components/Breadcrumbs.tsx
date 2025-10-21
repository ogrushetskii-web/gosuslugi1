import { Link } from 'react-router-dom';

interface Props {
  pathname: string;
}

const Breadcrumbs = ({ pathname }: Props) => {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    return { label: segment || 'home', href };
  });

  return (
    <nav aria-label="breadcrumbs" className="text-sm text-text-secondary">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link className="text-indigo-500 hover:underline" to="/">
            Главная
          </Link>
        </li>
        {crumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2 capitalize">
            <span aria-hidden>/</span>
            {index === crumbs.length - 1 ? (
              <span className="font-medium text-text-primary">{crumb.label}</span>
            ) : (
              <Link className="text-indigo-500 hover:underline" to={crumb.href}>
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
