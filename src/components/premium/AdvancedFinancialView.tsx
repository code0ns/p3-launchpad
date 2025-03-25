
import { useState } from 'react';
import { ProFeature } from './ProFeature';
import { Card, CardTitle, CardContent } from '@/components/ui/card-custom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample profit data for the chart
const sampleData = [
  { date: 'Jan', income: 500, expenses: 300, profit: 200 },
  { date: 'Feb', income: 700, expenses: 400, profit: 300 },
  { date: 'Mar', income: 600, expenses: 500, profit: 100 },
  { date: 'Apr', income: 900, expenses: 600, profit: 300 },
  { date: 'May', income: 1200, expenses: 700, profit: 500 },
  { date: 'Jun', income: 1100, expenses: 800, profit: 300 },
];

export function AdvancedFinancialView() {
  return (
    <ProFeature title="Advanced Financial View" description="Track profit trends and categorize your transactions">
      <Card>
        <CardContent className="pt-4">
          <CardTitle className="mb-4">Profit Trend</CardTitle>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sampleData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#8884d8" fill="#8884d833" name="Income" />
                <Area type="monotone" dataKey="expenses" stroke="#82ca9d" fill="#82ca9d33" name="Expenses" />
                <Area type="monotone" dataKey="profit" stroke="#000" fill="#00000033" name="Profit" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Upgrade to Pro to track your profit trends and add transaction categories
          </div>
        </CardContent>
      </Card>
    </ProFeature>
  );
}
