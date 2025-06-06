import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/fraud/results');
        setResults(response.data.fraudulent_transactions);
        setError(null);
      } catch (err) {
        setError('Error fetching results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
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
        Fraud Detection Results
      </Typography>
      
      {results.length === 0 ? (
        <Alert severity="info">
          No fraudulent transactions detected
        </Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell>Merchant ID</TableCell>
                <TableCell>Customer ID</TableCell>
                <TableCell>Fraud Probability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((transaction) => (
                <TableRow key={transaction.transaction_id}>
                  <TableCell>{transaction.transaction_id}</TableCell>
                  <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(transaction.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>{transaction.merchant_id}</TableCell>
                  <TableCell>{transaction.customer_id}</TableCell>
                  <TableCell>
                    {(transaction.fraud_probability * 100).toFixed(2)}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default Results; 