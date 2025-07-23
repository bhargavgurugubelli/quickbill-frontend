import { Box, Typography, Grid } from '@mui/material';

const ThreeSteps = () => {
  return (
    <Box
      sx={{
        mt: { xs: 6, md: 8 },
        py: 8,
        px: { xs: 2, md: 8 },
        backgroundColor: '#fff',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          fontSize: '2.2rem',
          textAlign: 'center',
          mb: 6,
        }}
      >
        Generate GST bills in{' '}
        <Box component="span" sx={{ color: '#6a0dad' }}>
          3 simple steps
        </Box>
      </Typography>

      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6}>
          <img
            src="/images/steps-image.jpg"
            alt="Billing Steps"
            style={{
              width: '100%',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>
              1️⃣ Select Customer
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Choose from saved contacts or add new customers with GST, PAN details, etc.
            </Typography>
          </Box>

          <Box mb={3}>
            <Typography variant="h6" fontWeight={600}>
              2️⃣ Add Items
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Search and select menu items. Rates auto-fill. Quantity and taxes calculated instantly.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              3️⃣ Share Invoice
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>
              Send invoice to the customer via WhatsApp or print/download PDF instantly.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ThreeSteps;
