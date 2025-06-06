import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <SecurityIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FraudEye
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/upload"
          >
            Upload
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/results"
          >
            Results
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 