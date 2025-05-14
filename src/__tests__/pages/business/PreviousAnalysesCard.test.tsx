
import React from 'react';
import { render, screen } from '@testing-library/react';
import { PreviousAnalysesCard } from '@/pages/business/PreviousAnalysesCard';

describe('PreviousAnalysesCard Component', () => {
  const mockAnalyses = [
    { name: 'Ristorante Italiano', date: new Date(2025, 4, 10), district: 'Miami Beach' },
    { name: 'Caffetteria Milano', date: new Date(2025, 3, 15), district: 'Wynwood' }
  ];

  it('renders previous analyses correctly', () => {
    render(<PreviousAnalysesCard previousAnalyses={mockAnalyses} />);
    
    // Check card title
    expect(screen.getByText(/Analisi Precedenti/i)).toBeInTheDocument();
    
    // Check if analyses are rendered
    expect(screen.getByText(/Ristorante Italiano/i)).toBeInTheDocument();
    expect(screen.getByText(/Caffetteria Milano/i)).toBeInTheDocument();
    
    // Check if districts are displayed
    expect(screen.getByText(/Miami Beach/i)).toBeInTheDocument();
    expect(screen.getByText(/Wynwood/i)).toBeInTheDocument();
    
    // Check if dates are formatted correctly (depends on locale - testing basic presence)
    expect(screen.getByText(new Date(2025, 4, 10).toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(new Date(2025, 3, 15).toLocaleDateString())).toBeInTheDocument();
  });

  it('displays empty state when no analyses are available', () => {
    render(<PreviousAnalysesCard previousAnalyses={[]} />);
    
    // Check for empty state message
    expect(screen.getByText(/Nessuna analisi precedente/i)).toBeInTheDocument();
  });
});
