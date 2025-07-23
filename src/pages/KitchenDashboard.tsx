import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';

type Order = {
  id: number;
  customer_name: string;
  status: 'pending' | 'preparing' | 'ready';
  total_amount: string;
  created_at: string;
  items: { name: string; quantity: number }[];
};

export default function KitchenDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/kitchen/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: 'Failed to load kitchen orders', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/kitchen/orders/${id}/update-status/`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSnack({ open: true, message: `Marked as ${newStatus}`, severity: 'success' });
      fetchOrders(); // refresh
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: 'Failed to update status', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 30000); // Auto-refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h5" gutterBottom>Kitchen Dashboard</Typography>

      {loading ? (
        <Stack alignItems="center" mt={6}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={2}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{order.customer_name}</Typography>
                  <Typography variant="body2">Total: ₹{order.total_amount}</Typography>
                  <Typography variant="body2">Created: {new Date(order.created_at).toLocaleString()}</Typography>

                  <Stack direction="row" spacing={1} mt={1} mb={1}>
                    <Chip label={order.status.toUpperCase()} color={statusColor(order.status)} />
                  </Stack>

                  <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {order.items.map((item, index) => (
                      <li key={index}>{item.name} × {item.quantity}</li>
                    ))}
                  </ul>

                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      color="info"
                      onClick={() => updateStatus(order.id, 'preparing')}
                      disabled={order.status === 'preparing'}
                    >
                      Preparing
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      onClick={() => updateStatus(order.id, 'ready')}
                      disabled={order.status === 'ready'}
                    >
                      Ready
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Snackbar for success/error messages */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
