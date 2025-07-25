import React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import NoSsr from '@mui/material/NoSsr';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollTo = (id: string): void => {
    setTimeout(() => {
      const element = document.querySelector(`#${id}`) as HTMLElement;
      if (!element) return;
      window.scrollTo({ left: 0, top: element.offsetTop, behavior: 'smooth' });
    });
  };

  return (
    <Box
      id="page-top"
      sx={{
        backgroundColor: theme.palette.background.default,
        height: '100%',
      }}
    >
      {/* ✅ Header */}
      <Header />

      {/* ✅ Page Content */}
      <Box
        width={1}
        margin="0 auto"
        sx={{ paddingTop: '64px' }} // Push content below fixed navbar
      >
        {children}
      </Box>

      {/* ✅ Footer */}
      <Footer />

      {/* ✅ Scroll-to-top button */}
      <NoSsr>
        <Zoom in={trigger}>
          <Box
            onClick={() => scrollTo('page-top')}
            role="presentation"
            sx={{ position: 'fixed', bottom: 24, right: 32 }}
          >
            <Fab
              color="primary"
              size="small"
              aria-label="scroll back to top"
              sx={{
                color: theme.palette.common.white,
                '&:hover': {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </Fab>
          </Box>
        </Zoom>
      </NoSsr>
    </Box>
  );
};

export default Layout;
