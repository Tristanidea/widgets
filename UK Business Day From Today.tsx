import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BusinessDaysCalculator = () => {
  const [days, setDays] = useState(30);
  const [result, setResult] = useState('');

  const ukHolidays2024 = [
    '2024-01-01', // New Year's Day
    '2024-03-29', // Good Friday
    '2024-04-01', // Easter Monday
    '2024-05-06', // Early May Bank Holiday
    '2024-05-27', // Spring Bank Holiday
    '2024-08-26', // Summer Bank Holiday
    '2024-12-25', // Christmas Day
    '2024-12-26', // Boxing Day
  ];

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isHoliday = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return ukHolidays2024.includes(dateString);
  };

  const addBusinessDays = (startDate, daysToAdd) => {
    let currentDate = new Date(startDate);
    let remainingDays = daysToAdd;

    while (remainingDays > 0) {
      currentDate.setDate(currentDate.getDate() + 1);
      if (!isWeekend(currentDate) && !isHoliday(currentDate)) {
        remainingDays--;
      }
    }

    return currentDate;
  };

  const calculateDate = () => {
    const startDate = new Date();
    const resultDate = addBusinessDays(startDate, parseInt(days));
    setResult(resultDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  };

  return (
    <div className="p-16 bg-gray-50">
      <Card className="w-full max-w-md bg-white border-purple-500 border-2">
        <CardHeader className="border-b border-purple-500/20">
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Calendar className="h-5 w-5" />
            UK Business Days Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-600">From Today ({new Date().toLocaleDateString('en-GB')})</div>
              <div className="flex gap-4">
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className="w-24 bg-gray-50 border-purple-500/50 text-gray-800 focus-visible:ring-purple-500"
                  min="1"
                  aria-label="Number of business days"
                />
                <Button 
                  onClick={calculateDate}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Calculate
                </Button>
              </div>
            </div>
            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-purple-500/20">
                <p className="font-medium text-gray-700 mb-1">Result:</p>
                <p className="text-gray-800">{result}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDaysCalculator;
