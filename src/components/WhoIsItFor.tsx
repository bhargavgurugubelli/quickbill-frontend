import { Box, Typography, Grid, Paper } from '@mui/material';

const segments = [
  {
    emoji: '🍽️',
    title: 'Dine-in Restaurants',
    description: 'Streamline table orders, billing, and kitchen coordination.',
  },
  {
    emoji: '🥡',
    title: 'Takeaway Counters',
    description: 'Generate quick bills and notify customers instantly.',
  },
  {
    emoji: '🍔',
    title: 'Fast Food Joints',
    description: 'Speed up service with 3-click order processing.',
  },
  {
    emoji: '🛺',
    title: 'Street Food Vendors',
    description: 'Create GST bills without complex setup or hardware.',
  },
];

const WhoIsItFor = () => {
  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 2, md: 8 },
        backgroundColor: '#fff',
        textAlign: 'center',
      }}
    >
      {/* 🧭 Section Title */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Who is it for?
      </Typography>

      {/* 🔠 Section Subtitle */}
      <Typography color="text.secondary" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
        QuickBill is built for all types of food businesses — from street vendors to multi-outlet restaurants, all in one place.
      </Typography>

      {/* 🧩 Business Types Grid */}
      <Grid container spacing={4} justifyContent="center">
        {segments.map((segment) => (
          <Grid item xs={12} sm={6} md={3} key={segment.title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '2.5rem' }}>
                {segment.emoji}
              </Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
                {segment.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, fontSize: '0.95rem' }}>
                {segment.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WhoIsItFor;
