import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ marginBottom: '20px', textAlign: 'center' }}>
          <Typography
            align="center"
            variant="subtitle2"
            color={theme.palette.text.secondary}
            gutterBottom
            sx={{ marginTop: '25px' }}
          >
            © {new Date().getFullYear()} QuickBill. All rights reserved.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Footer;
