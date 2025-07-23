import { Box, Typography, Grid, Paper } from '@mui/material';

const features = [
  {
    emoji: '📦',
    title: 'Inventory Tracking',
    description: 'Track your stock levels and avoid running out of key ingredients.',
  },
  {
    emoji: '💬',
    title: 'WhatsApp Alerts',
    description: 'Automatically notify customers when their food is ready.',
  },
  {
    emoji: '📈',
    title: 'Sales Reports',
    description: 'Get real-time reports of daily, weekly, and monthly sales.',
  },
  {
    emoji: '🧾',
    title: 'GST Invoices',
    description: 'Create professional, GST-compliant invoices in just a few clicks.',
  },
];

const MoreFeatures = () => {
  return (
    <Box
      sx={{
        py: 10,
        px: { xs: 2, md: 8 },
        backgroundColor: '#F9F9FB',
        textAlign: 'center',
      }}
    >
      {/* 🔠 Title */}
      <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
        Do a lot more with one restaurant <br />
        <Box component="span" sx={{ color: '#6a0dad' }}>
          billing software
        </Box>
      </Typography>

      {/* 🧾 Subheading */}
      <Typography color="text.secondary" sx={{ mb: 6 }}>
        QuickBill makes it easy to manage your entire food business — from orders to delivery, in one place.
      </Typography>

      {/* 📦 Feature Grid */}
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
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
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: '3rem',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: 'white',
                  },
                }}
              >
                {feature.emoji}
              </Typography>
              <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
                {feature.title}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, fontSize: '1rem' }}>
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MoreFeatures;
