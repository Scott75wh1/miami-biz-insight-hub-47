
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BusinessPageHeader } from '@/pages/business/BusinessPageHeader';

// Mock the toast functionality
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('BusinessPageHeader Component', () => {
  const mockProps = {
    selectedDistrict: 'Miami Beach',
    analysisComplete: true,
    analysisData: { businessInfo: { name: 'Test Business' } },
    refreshBusinessData: jest.fn(),
    handleExportData: jest.fn(),
  };

  it('renders correctly with complete analysis', () => {
    render(<BusinessPageHeader {...mockProps} />);
    
    // Check for district name in header
    expect(screen.getByText(/Miami Beach/i)).toBeInTheDocument();
    
    // Check for action buttons when analysis is complete
    expect(screen.getByText(/Aggiorna/i)).toBeInTheDocument();
    expect(screen.getByText(/Esporta/i)).toBeInTheDocument();
  });

  it('renders correctly without analysis data', () => {
    render(
      <BusinessPageHeader 
        {...mockProps}
        analysisComplete={false}
        analysisData={null}
      />
    );
    
    // Check for district name in header
    expect(screen.getByText(/Miami Beach/i)).toBeInTheDocument();
    
    // Action buttons should not be present
    expect(screen.queryByText(/Aggiorna/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Esporta/i)).not.toBeInTheDocument();
  });

  it('calls refreshBusinessData when Aggiorna button is clicked', () => {
    render(<BusinessPageHeader {...mockProps} />);
    
    const refreshButton = screen.getByText(/Aggiorna/i);
    fireEvent.click(refreshButton);
    
    expect(mockProps.refreshBusinessData).toHaveBeenCalledTimes(1);
  });

  it('calls handleExportData when Esporta button is clicked', () => {
    render(<BusinessPageHeader {...mockProps} />);
    
    const exportButton = screen.getByText(/Esporta/i);
    fireEvent.click(exportButton);
    
    expect(mockProps.handleExportData).toHaveBeenCalledTimes(1);
  });
});
