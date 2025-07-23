// ...imports (unchanged)
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  useMediaQuery,
  Tabs,
  Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ...interfaces (unchanged)
interface SummaryData {
  total_invoices: number;
  total_amount: number;
}

interface KitchenOrder {
  id: number;
  customer_name: string;
  items: string;
  status: 'pending' | 'preparing' | 'ready';
}

export default function Dashboard() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [tab, setTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('has_paid');
    localStorage.removeItem('new_user_mobile');
    localStorage.removeItem('pendingPlanId');
    localStorage.removeItem('pendingPlanName');
    localStorage.removeItem('pendingAmount');
    window.location.href = '/';
  };

  useEffect(() => {
    const hasPaid = localStorage.getItem('has_paid');
    const token = localStorage.getItem('access_token');

    if (hasPaid !== 'true' || !token) {
      navigate('/pricing-table');
      return;
    }

    const fetchData = async () => {
      try {
        const resSummary = await axios.get('http://127.0.0.1:8000/api/sales/summary/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(resSummary.data);

        const resOrders = await axios.get('http://127.0.0.1:8000/api/kitchen/orders/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(resOrders.data);

        const resUser = await axios.get('http://127.0.0.1:8000/api/user-info/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMobileNumber(resUser.data.mobile_number);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const updateStatus = async (id: number, newStatus: 'preparing' | 'ready') => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `http://127.0.0.1:8000/api/kitchen/orders/${id}/update-status/`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const resOrders = await axios.get('http://127.0.0.1:8000/api/kitchen/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(resOrders.data);
    } catch (error) {
      console.error('Failed to update kitchen order status:', error);
    }
  };

  const KitchenOrderCard = ({
    order,
    onStatusChange,
  }: {
    order: KitchenOrder;
    onStatusChange: (id: number, newStatus: 'preparing' | 'ready') => void;
  }) => (
    <Box
      key={order.id}
      sx={{
        p: 2,
        mb: 2,
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: '#fff',
      }}
    >
      <Typography fontWeight={600}>{order.customer_name}</Typography>
      <Typography variant="body2" color="text.secondary" mt={0.5}>
        Items: {order.items}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Status: <strong>{order.status}</strong>
      </Typography>
      <Box mt={1} display="flex" gap={1}>
        <Button
          size="small"
          variant="outlined"
          color="info"
          onClick={() => onStatusChange(order.id, 'preparing')}
          disabled={order.status === 'preparing'}
        >
          Preparing
        </Button>
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => onStatusChange(order.id, 'ready')}
          disabled={order.status === 'ready'}
        >
          Ready
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box display="flex">
      {!isMobile && (
        <Box
          sx={{
            width: 220,
            height: '100vh',
            background: '#f4f4f4',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid #ddd',
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              {mobileNumber ? `+91-${mobileNumber}` : 'Loading...'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Trial Plan • 5 Days
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      )}

      <Box flex={1} p={isMobile ? 1 : 3}>
        {isMobile && (
          <AppBar position="static" color="default" elevation={1} sx={{ mb: 2 }}>
            <Toolbar>
              <IconButton edge="start" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
              <IconButton color="error" onClick={handleLogout}><LogoutIcon /></IconButton>
            </Toolbar>
          </AppBar>
        )}

        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <Box width={250} p={2}>
            <Typography variant="body2" color="text.secondary">
              {mobileNumber ? `+91-${mobileNumber}` : 'Loading...'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Trial Plan • 5 Days
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Drawer>

        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          sx={{ background: '#f4f4f4', borderRadius: 2, mb: 3 }}
        >
          <Tab label="Sales Summary" />
          <Tab label="Kitchen Orders" />
        </Tabs>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress color="success" />
          </Box>
        ) : (
          <>
            {tab === 0 && (
              <>
                <Grid container spacing={2} mb={4}>
                  <Grid item xs={6}>
                    <Box sx={{ p: 3, backgroundColor: '#e6f4ea', borderRadius: 2, textAlign: 'center', boxShadow: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">Total Invoices</Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {summary?.total_invoices ?? 0}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ p: 3, backgroundColor: '#fff3e6', borderRadius: 2, textAlign: 'center', boxShadow: 2 }}>
                      <Typography variant="subtitle1" color="text.secondary">Total Amount</Typography>
                      <Typography variant="h5" fontWeight={700}>
                        ₹{(summary?.total_amount ?? 0).toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="success" startIcon={<AddIcon />} onClick={() => navigate('/sales/create')}>
                      + Create Invoice
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" startIcon={<UploadFileIcon />} onClick={() => navigate('/upload-menu')}>
                      Upload Menu PDF
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}

            {tab === 1 && (
              <Box>
                {orders.length === 0 ? (
                  <Typography>No kitchen orders found.</Typography>
                ) : (
                  orders.map((order) => (
                    <KitchenOrderCard key={order.id} order={order} onStatusChange={updateStatus} />
                  ))
                )}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
