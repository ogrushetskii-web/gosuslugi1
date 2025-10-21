import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import ToastContainer from '../components/ToastContainer';
import GlobalSearchDrawer from '../components/GlobalSearchDrawer';

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Header />
          <div className="px-8 pb-10 pt-6">
            <Breadcrumbs pathname={location.pathname} />
            <main className="mt-6 space-y-8">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      <ToastContainer />
      <GlobalSearchDrawer />
    </div>
  );
};

export default MainLayout;
