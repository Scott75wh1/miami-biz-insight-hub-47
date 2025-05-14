
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApiStatusCard } from '@/pages/business/ApiStatusCard';

describe('ApiStatusCard Component', () => {
  it('renders API status information correctly', () => {
    render(<ApiStatusCard />);
    
    // Check card title
    expect(screen.getByText(/Stato APIs/i)).toBeInTheDocument();
    
    // Check for each API status
    expect(screen.getByText(/openAI/i)).toBeInTheDocument();
    expect(screen.getByText(/googlePlaces/i)).toBeInTheDocument();
    expect(screen.getByText(/censusGov/i)).toBeInTheDocument();
    expect(screen.getByText(/yelp/i)).toBeInTheDocument();
    expect(screen.getByText(/googleTrends/i)).toBeInTheDocument();
    
    // Check for at least one "Attiva" status
    expect(screen.getByText(/Attiva/i)).toBeInTheDocument();
    
    // Check for "Demo" status
    expect(screen.getAllByText(/Demo/i).length).toBeGreaterThan(0);
    
    // Check for the information alert
    expect(screen.getByText(/Configura tutte le API nelle impostazioni/i)).toBeInTheDocument();
  });
});
