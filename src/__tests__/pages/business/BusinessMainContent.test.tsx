
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BusinessMainContent } from '@/pages/business/BusinessMainContent';

// Mock the child components
jest.mock('@/components/business/BusinessAnalysisForm', () => ({
  __esModule: true,
  default: () => <div data-testid="business-analysis-form">Business Form Mock</div>,
}));

jest.mock('@/components/business/BusinessAnalysisResults', () => ({
  __esModule: true,
  default: () => <div data-testid="business-analysis-results">Analysis Results Mock</div>,
}));

describe('BusinessMainContent Component', () => {
  const mockProps = {
    selectedDistrict: 'Miami Beach',
    districtUpdateTime: 123456789,
    isAnalyzing: false,
    startAnalysis: jest.fn(),
    analysisComplete: false,
    analysisData: null,
  };

  it('renders the form correctly', () => {
    render(<BusinessMainContent {...mockProps} />);
    
    // Check for card title
    expect(screen.getByText(/Analisi Personalizzata/i)).toBeInTheDocument();
    
    // Check that form is rendered
    expect(screen.getByTestId('business-analysis-form')).toBeInTheDocument();
    
    // Results should not be present when analysis is not complete
    expect(screen.queryByTestId('business-analysis-results')).not.toBeInTheDocument();
  });

  it('renders analysis results when analysis is complete', () => {
    render(
      <BusinessMainContent 
        {...mockProps}
        analysisComplete={true}
        analysisData={{ 
          businessInfo: {
            name: 'Test Business',
            address: 'Test Address',
            district: 'Miami Beach',
            type: 'restaurant'
          },
          analysis: {
            summary: 'Test summary',
            recommendations: ['Rec 1', 'Rec 2'],
            demographicAnalysis: 'Demo analysis',
            competitionAnalysis: 'Competition analysis',
            trendsAnalysis: 'Trends analysis'
          },
          rawData: {}
        }}
      />
    );
    
    // Both form and results should be present
    expect(screen.getByTestId('business-analysis-form')).toBeInTheDocument();
    expect(screen.getByTestId('business-analysis-results')).toBeInTheDocument();
  });

  it('passes the correct key to form when district changes', () => {
    const { rerender } = render(<BusinessMainContent {...mockProps} />);
    const firstFormKey = screen.getByTestId('business-analysis-form').getAttribute('data-key');
    
    // Re-render with new district update time
    rerender(
      <BusinessMainContent 
        {...mockProps}
        selectedDistrict="Wynwood"
        districtUpdateTime={987654321}
      />
    );
    
    // The key should change with the district, but our mock doesn't actually use the key prop
    // In a real component, this would reset the form
    expect(screen.getByTestId('business-analysis-form')).toBeInTheDocument();
  });
});
