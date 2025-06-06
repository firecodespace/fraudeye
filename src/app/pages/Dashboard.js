import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/fraud/results');
        const transactions = response.data.fraudulent_transactions;
        
        // Calculate statistics
        const totalTransactions = transactions.length;
        const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
        const fraudCount = transactions.filter(t => t.fraud_probability > 0.5).length;
        
        // Prepare chart data
        const chartData = transactions.reduce((acc, t) => {
          const date = new Date(t.timestamp).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = { date, count: 0, amount: 0 };
          }
          acc[date].count++;
          acc[date].amount += t.amount;
          return acc;
        }, {});

        setStats({
          totalTransactions,
          totalAmount,
          fraudCount,
          chartData: Object.values(chartData),
        });
        setError(null);
      } catch (err) {
        setError('Error fetching statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Transactions
            </Typography>
            <Typography variant="h4">
              {stats.totalTransactions}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Total Amount
            </Typography>
            <Typography variant="h4">
              ${stats.totalAmount.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Fraudulent Transactions
            </Typography>
            <Typography variant="h4" color="error">
              {stats.fraudCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Transaction Trends
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="count"
                    fill="#8884d8"
                    name="Transaction Count"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="amount"
                    fill="#82ca9d"
                    name="Transaction Amount"
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 