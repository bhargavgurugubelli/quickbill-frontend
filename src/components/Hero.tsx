// src/components/Hero.tsx
import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from '@mui/material';

const Hero = () => {
  return (
    <Box sx={{ pt: 10, pb: 5, backgroundColor: '#fff' }}>
      <Container maxWidth="xl" disableGutters sx={{ px: 0 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6} sx={{ pl: 0 }}>
            <Box sx={{ pl: { xs: 4, md: 10 }, pr: { xs: 2 } }}>
              <Typography
                variant="h2"
                component="h1"
                fontWeight={800}
                sx={{ color: '#1e1e1e', mb: 3, lineHeight: 1.2 }}
              >
                Restaurant billing<br />software that’s 10x<br />smarter & faster
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: '#555', mb: 4, fontWeight: 400 }}
              >
                A 3-click billing system built for speed, kitchen efficiency, and instant WhatsApp alerts.
                It’s time to upgrade your workflow with <strong>Quick Bill</strong>.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#D82C4E',
                    color: '#fff',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#b1223e',
                    },
                  }}
                >
                  TAKE A FREE DEMO
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderColor: '#D82C4E',
                    color: '#D82C4E',
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 2,
                    '&:hover': {
                      borderColor: '#b1223e',
                      color: '#b1223e',
                    },
                  }}
                >
                  EXPLORE FEATURES
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
