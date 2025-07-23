import { useState, useEffect } from 'react';
import {
  Container, TextField, Typography, Button, Box, Grid, IconButton
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

type MenuItem = {
  id: number;
  name: string;
  rate: number;
};

type InvoiceItem = {
  item: MenuItem | null;
  quantity: number;
};

export default function CreateInvoice() {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([{ item: null, quantity: 1 }]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/menu-items/')
      .then((res) => setMenuItems(res.data))
      .catch(() => alert('Failed to load menu items'));
  }, []);

  const handleItemChange = (index: number, value: MenuItem | null) => {
    const updated = [...items];
    updated[index].item = value;
    setItems(updated);
  };

  const handleQuantityChange = (index: number, value: number) => {
    const updated = [...items];
    updated[index].quantity = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { item: null, quantity: 1 }]);
  };

  const removeItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const calculateTotal = () => {
    return items.reduce((sum, entry) => {
      if (entry.item) {
        return sum + entry.item.rate * entry.quantity;
      }
      return sum;
    }, 0);
  };

  const handleSubmit = async () => {
    const payload = {
      customer_name: customerName,
      customer_phone: customerPhone,
      items: items
        .filter((entry) => entry.item)
        .map((entry) => ({
          item_id: entry.item?.id,
          quantity: entry.quantity,
        })),
      total_amount: calculateTotal(),
    };

    try {
      const res = await axios.post('http://127.0.0.1:8000/api/sales/create-invoice/', payload);
      window.location.href = `/invoice-success/${res.data.invoice_id}`;
    } catch (err) {
      alert('Failed to create invoice');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create Sales Invoice</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Customer Phone"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
          />
        </Grid>
      </Grid>

      {items.map((entry, index) => (
        <Box key={index} display="flex" alignItems="center" mb={2} gap={2}>
          <Autocomplete
            sx={{ flex: 2 }}
            options={menuItems}
            getOptionLabel={(option) => option.name}
            value={entry.item}
            onChange={(_, value) => handleItemChange(index, value)}
            renderInput={(params) => <TextField {...params} label="Item" />}
          />
          <TextField
            sx={{ width: 100 }}
            label="Rate"
            value={entry.item?.rate ?? ''}
            InputProps={{ readOnly: true }}
          />
          <TextField
            sx={{ width: 100 }}
            type="number"
            label="Qty"
            value={entry.quantity}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          />
          <Typography width={80}>
            ₹{entry.item ? entry.item.rate * entry.quantity : 0}
          </Typography>
          <IconButton onClick={() => removeItem(index)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="outlined" onClick={addItem}>+ Add Item</Button>
        <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        fullWidth
        onClick={handleSubmit}
        disabled={!customerName || !customerPhone || calculateTotal() === 0}
      >
        Submit Invoice
      </Button>
    </Container>
  );
}
