
import React from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useDistrictSelection } from '@/hooks/useDistrictSelection';

const mockData = {
  'Miami Beach': [
    { name: 'Gen', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'Mag', value: 1890 }
  ],
  'Wynwood': [
    { name: 'Gen', value: 3500 },
    { name: 'Feb', value: 4200 },
    { name: 'Mar', value: 3800 },
    { name: 'Apr', value: 5000 },
    { name: 'Mag', value: 4700 }
  ],
  'Brickell': [
    { name: 'Gen', value: 5200 },
    { name: 'Feb', value: 4900 },
    { name: 'Mar', value: 6100 },
    { name: 'Apr', value: 5600 },
    { name: 'Mag', value: 7000 }
  ],
  'Little Havana': [
    { name: 'Gen', value: 2400 },
    { name: 'Feb', value: 2100 },
    { name: 'Mar', value: 1700 },
    { name: 'Apr', value: 1900 },
    { name: 'Mag', value: 2300 }
  ],
  'Downtown': [
    { name: 'Gen', value: 6500 },
    { name: 'Feb', value: 7200 },
    { name: 'Mar', value: 6700 },
    { name: 'Apr', value: 8100 },
    { name: 'Mag', value: 8500 }
  ],
};

const defaultDistrict = 'Miami Beach';

const LatestAnalytics = () => {
  const { selectedDistrict } = useDistrictSelection();
  
  // Use the selected district data, or fall back to default
  const data = mockData[selectedDistrict as keyof typeof mockData] || mockData[defaultDistrict];
  
  return (
    <div>
      <div className="text-sm font-medium mb-2">Trend di Visitatori - {selectedDistrict}</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              fontSize: '12px'
            }}
            formatter={(value) => [`${value} visitatori`, 'Visitatori']}
          />
          <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm">
          <div>
            <div className="text-muted-foreground">Media mensile</div>
            <div className="font-medium">
              {Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length)}
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Picco più alto</div>
            <div className="font-medium">
              {Math.max(...data.map(item => item.value))}
            </div>
          </div>
          
          <div>
            <div className="text-muted-foreground">Variazione</div>
            <div className={`font-medium ${
              data[data.length-1].value > data[0].value ? 'text-green-500' : 'text-red-500'
            }`}>
              {data[data.length-1].value > data[0].value ? '+' : ''}
              {Math.round((data[data.length-1].value - data[0].value) / data[0].value * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestAnalytics;
