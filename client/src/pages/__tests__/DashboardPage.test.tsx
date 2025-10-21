import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import DashboardPage from '../DashboardPage';

const renderWithRouter = (ui: React.ReactNode) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('DashboardPage', () => {
  it('renders KPI cards', () => {
    renderWithRouter(<DashboardPage />);
    expect(screen.getByText('Активных дел')).toBeInTheDocument();
    expect(screen.getByText('Последние документы')).toBeInTheDocument();
  });
});
