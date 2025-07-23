import { Box, Typography, Grid } from '@mui/material';

const StepsSection = () => {
  return (
    <Box
      sx={{
        mt: { xs: 6, md: 8 }, // ✅ Add top margin to create space from above section
        py: 8,
        px: { xs: 2, md: 8 },
        backgroundColor: '#F9F9FB',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        textAlign="center"
        sx={{ mb: 4 }}
      >
        Why Restaurants Love Quick Bill
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h3" component="div">🧾</Typography>
            <Typography variant="h6" fontWeight={600} mt={1}>
              3-Click Billing
            </Typography>
            <Typography color="text.secondary">
              Create bills in seconds with auto-filled item rates.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h3" component="div">🍽️</Typography>
            <Typography variant="h6" fontWeight={600} mt={1}>
              Kitchen Sync
            </Typography>
            <Typography color="text.secondary">
              Instantly notify kitchen staff when an order is placed.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h3" component="div">📲</Typography>
            <Typography variant="h6" fontWeight={600} mt={1}>
              WhatsApp Alerts
            </Typography>
            <Typography color="text.secondary">
              Send real-time messages to customers about their orders.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box textAlign="center">
            <Typography variant="h3" component="div">📊</Typography>
            <Typography variant="h6" fontWeight={600} mt={1}>
              Daily Sales Summary
            </Typography>
            <Typography color="text.secondary">
              Automatically view your total daily sales and performance.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepsSection;
