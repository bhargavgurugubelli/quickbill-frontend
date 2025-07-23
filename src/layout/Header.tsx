// src/layout/Header.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import MobileOtpDrawer from '../components/MobileOtpDrawer';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ background: '#fff', color: '#000', boxShadow: 'none' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700} color="#D82C4E">
            QuickBill
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: '#D82C4E', color: '#D82C4E' }}
            onClick={() => setDrawerOpen(true)}
          >
            GetStarted
          </Button>
        </Toolbar>
      </AppBar>

      <MobileOtpDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;
