
import React from 'react';
import { render, screen } from '@testing-library/react';
import MyBusinessPageContainer from '@/pages/business/MyBusinessPageContainer';

// Mock the hooks
jest.mock('@/hooks/useBusinessAnalysis', () => ({
  useBusinessAnalysis: () => ({
    isAnalyzing: false,
    analysisComplete: false,
    analysisData: null,
    startAnalysis: jest.fn(),
  }),
}));

jest.mock('@/hooks/useDistrictSelection', () => ({
  useDistrictSelection: () => ({
    selectedDistrict: 'Miami Beach',
  }),
}));

jest.mock('@/hooks/useDataCollection', () => ({
  useDataCollection: () => ({
    dataState: {},
    refreshData: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

// Mock the child components
jest.mock('@/components/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

jest.mock('@/pages/business/BusinessPageHeader', () => ({
  BusinessPageHeader: () => <div data-testid="business-page-header">Header Mock</div>,
}));

jest.mock('@/pages/business/BusinessMainContent', () => ({
  BusinessMainContent: () => <div data-testid="business-main-content">Main Content Mock</div>,
}));

jest.mock('@/pages/business/BusinessSidebar', () => ({
  BusinessSidebar: () => <div data-testid="business-sidebar">Sidebar Mock</div>,
}));

describe('MyBusinessPageContainer Component', () => {
  beforeEach(() => {
    // Setup window event listeners mock
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  it('renders all main components correctly', () => {
    render(<MyBusinessPageContainer />);
    
    // Check if layout and main components are rendered
    expect(screen.getByTestId('layout')).toBeInTheDocument();
    expect(screen.getByTestId('business-page-header')).toBeInTheDocument();
    expect(screen.getByTestId('business-main-content')).toBeInTheDocument();
    expect(screen.getByTestId('business-sidebar')).toBeInTheDocument();
  });

  it('sets up district change event listener', () => {
    render(<MyBusinessPageContainer />);
    
    // Check if event listener was added
    expect(window.addEventListener).toHaveBeenCalledWith('districtChanged', expect.any(Function));
    
    // Check if cleanup is properly set
    expect(window.removeEventListener).toHaveBeenCalledTimes(0); // Should be called on unmount
  });
});
