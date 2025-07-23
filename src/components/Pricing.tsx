import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface PricingPlan {
  title: string;
  price: number;
  currency: string;
  features: { name: string }[] | null; // allow null just in case
  planId: string;
}

type PricingProps = {
  showPayButton?: boolean;
};

const Pricing = ({ showPayButton = true }: PricingProps): JSX.Element => {
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    axios
      .get(`${baseUrl}pricing`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setPricing(data);
      })
      .catch((err) => {
        console.error('Error fetching pricing:', err);
        setPricing([]); // fallback
      })
      .finally(() => setLoading(false));
  }, []);

  const handlePayClick = async (planId: string, planName: string, amount: number) => {
    if (planName.toLowerCase().includes('free')) {
      try {
        const token = sessionStorage.getItem('token');
        const baseUrl = process.env.REACT_APP_BASE_URL;

        const res = await axios.post(
          `${baseUrl}start-free-trial/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 200) {
          navigate('/business-setup');
        }
      } catch (error) {
        console.error('❌ Free trial failed:', error);
        alert('Failed to start free trial. Try again.');
      }
    } else {
      localStorage.setItem('pendingPlanId', planId);
      localStorage.setItem('pendingPlanName', planName);
      localStorage.setItem('pendingAmount', amount.toString());

      navigate('/pay');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box id="pricing" sx={{ pt: 8, pb: 12, px: 3, backgroundColor: '#f9f9fb' }}>
      <Box mb={6} textAlign="center">
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ textTransform: 'uppercase', letterSpacing: 2, mb: 1 }}
        >
          Pricing
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" maxWidth={480} mx="auto">
          Choose a plan that works best for your business. Upgrade or downgrade anytime.
        </Typography>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {Array.isArray(pricing) &&
            pricing.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={item.planId}>
                <Box sx={{ position: 'relative' }}>
                  {index === 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: 'warning.main',
                        color: 'common.black',
                        px: 2,
                        py: 0.5,
                        borderRadius: '12px',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                        zIndex: 10,
                        textTransform: 'uppercase',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      }}
                    >
                      Most Popular
                    </Box>
                  )}

                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      boxShadow: 3,
                      borderTop: `6px solid ${index === 1 ? '#ffc107' : '#28a745'}`,
                      p: 3,
                      backgroundColor: '#fff',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                    aria-label={`${item.title} pricing plan`}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        align="center"
                        fontWeight={700}
                        textTransform="uppercase"
                        gutterBottom
                        sx={{ letterSpacing: 1 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h3"
                        align="center"
                        color="success.main"
                        fontWeight={800}
                        sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                      >
                        {item.currency}
                        {item.price}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        align="center"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                      >
                        per month
                      </Typography>

                      <Box>
                        {Array.isArray(item.features) &&
                          item.features.map((feature, idx) => (
                            <Typography
                              key={idx}
                              align="center"
                              variant="body2"
                              color="text.primary"
                              sx={{ mb: 0.7 }}
                            >
                              • {feature.name}
                            </Typography>
                          ))}
                      </Box>
                    </CardContent>

                    <Box flexGrow={1} />
                    {showPayButton && (
                      <CardActions sx={{ justifyContent: 'center', mt: 2 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="large"
                          onClick={() =>
                            handlePayClick(item.planId, item.title, item.price)
                          }
                          aria-label={`Pay for ${item.title} plan`}
                          fullWidth
                        >
                          {item.title.toLowerCase().includes('free')
                            ? 'Start Free Trial'
                            : `Pay ₹${item.price}`}
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                </Box>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Pricing;
