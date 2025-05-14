
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BusinessSidebar } from '@/pages/business/BusinessSidebar';

// Mock the child components
jest.mock('@/pages/business/ApiStatusCard', () => ({
  ApiStatusCard: () => <div data-testid="api-status-card">API Status Mock</div>,
}));

jest.mock('@/pages/business/PreviousAnalysesCard', () => ({
  PreviousAnalysesCard: ({ previousAnalyses }) => (
    <div data-testid="previous-analyses-card">
      Previous Analyses Mock - Count: {previousAnalyses.length}
    </div>
  ),
}));

jest.mock('@/pages/business/MarketTrendsCard', () => ({
  MarketTrendsCard: ({ selectedDistrict, isAnalyzing }) => (
    <div data-testid="market-trends-card">
      Market Trends Mock - District: {selectedDistrict} - 
      {isAnalyzing ? 'Analyzing' : 'Not Analyzing'}
    </div>
  ),
}));

describe('BusinessSidebar Component', () => {
  const mockPreviousAnalyses = [
    { name: 'Business 1', date: new Date(), district: 'Miami Beach' },
    { name: 'Business 2', date: new Date(), district: 'Wynwood' }
  ];

  it('renders all sidebar components correctly', () => {
    render(
      <BusinessSidebar
        previousAnalyses={mockPreviousAnalyses}
        isAnalyzing={false}
        selectedDistrict="Miami Beach"
      />
    );
    
    // Check if all cards are rendered
    expect(screen.getByTestId('api-status-card')).toBeInTheDocument();
    expect(screen.getByTestId('previous-analyses-card')).toBeInTheDocument();
    expect(screen.getByTestId('market-trends-card')).toBeInTheDocument();
    
    // Check if previous analyses count is correct
    expect(screen.getByText(/Count: 2/i)).toBeInTheDocument();
    
    // Check if district and analyzing state is passed correctly
    expect(screen.getByText(/District: Miami Beach/i)).toBeInTheDocument();
    expect(screen.getByText(/Not Analyzing/i)).toBeInTheDocument();
  });

  it('passes analyzing state correctly', () => {
    render(
      <BusinessSidebar
        previousAnalyses={mockPreviousAnalyses}
        isAnalyzing={true}
        selectedDistrict="Miami Beach"
      />
    );
    
    expect(screen.getByText(/Analyzing/i)).toBeInTheDocument();
  });

  it('passes empty previous analyses correctly', () => {
    render(
      <BusinessSidebar
        previousAnalyses={[]}
        isAnalyzing={false}
        selectedDistrict="Miami Beach"
      />
    );
    
    expect(screen.getByText(/Count: 0/i)).toBeInTheDocument();
  });
});
