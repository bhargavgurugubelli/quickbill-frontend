import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  Box,
  Divider,
} from '@mui/material';

export type KitchenOrder = {
  id: number;
  customer_name: string;
  status: 'pending' | 'preparing' | 'ready';
  total_amount: string;
  created_at: string;
  items: { name: string; quantity: number }[];
};

type Props = {
  order: KitchenOrder;
  onStatusChange: (id: number, newStatus: 'preparing' | 'ready') => void;
};

const KitchenOrderCard: React.FC<Props> = ({ order, onStatusChange }) => {
  const statusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'preparing': return 'info';
      case 'ready': return 'success';
      default: return 'default';
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: 3, boxShadow: 1 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6" fontWeight={600}>
            {order.customer_name}
          </Typography>
          <Chip label={order.status.toUpperCase()} color={statusColor(order.status) as any} />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Created at: {new Date(order.created_at).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography fontWeight={500} mb={0.5}>Items Ordered:</Typography>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {order.items.map((item, index) => (
            <li key={index}>
              <Typography variant="body2">
                {item.name} × {item.quantity}
              </Typography>
            </li>
          ))}
        </ul>

        <Divider sx={{ my: 2 }} />

        <Typography fontWeight={500}>Total: ₹{order.total_amount}</Typography>

        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            size="small"
            color="info"
            onClick={() => onStatusChange(order.id, 'preparing')}
            disabled={order.status === 'preparing'}
          >
            Preparing
          </Button>
          <Button
            variant="contained"
            size="small"
            color="success"
            onClick={() => onStatusChange(order.id, 'ready')}
            disabled={order.status === 'ready'}
          >
            Ready
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default KitchenOrderCard;
