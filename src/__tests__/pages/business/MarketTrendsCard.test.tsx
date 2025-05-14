
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarketTrendsCard } from '@/pages/business/MarketTrendsCard';

describe('MarketTrendsCard Component', () => {
  it('renders loading skeletons when analyzing', () => {
    render(<MarketTrendsCard isAnalyzing={true} selectedDistrict="Miami Beach" />);
    
    // Check card title
    expect(screen.getByText(/Tendenze di Mercato/i)).toBeInTheDocument();
    
    // Should show skeletons when analyzing
    const skeletons = document.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
    
    // No trend data should be visible during analysis
    expect(screen.queryByText(/Crescita del settore/i)).not.toBeInTheDocument();
  });

  it('renders market trends data when not analyzing', () => {
    render(<MarketTrendsCard isAnalyzing={false} selectedDistrict="Miami Beach" />);
    
    // Check card title
    expect(screen.getByText(/Tendenze di Mercato/i)).toBeInTheDocument();
    
    // Check for trend data items
    expect(screen.getByText(/Crescita del settore/i)).toBeInTheDocument();
    expect(screen.getByText(/Nuove aperture in/i)).toBeInTheDocument();
    expect(screen.getByText(/Chiusure nell/i)).toBeInTheDocument();
    expect(screen.getByText(/Clientela media/i)).toBeInTheDocument();
    
    // Check if district is displayed correctly in the data
    expect(screen.getByText(/Miami Beach/i)).toBeInTheDocument();
  });

  it('handles undefined district gracefully', () => {
    render(<MarketTrendsCard isAnalyzing={false} selectedDistrict={undefined} />);
    
    // Should still render without errors
    expect(screen.getByText(/Tendenze di Mercato/i)).toBeInTheDocument();
  });
});
