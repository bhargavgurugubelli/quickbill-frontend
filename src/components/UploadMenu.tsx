import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
  Alert,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

export default function UploadMenu() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setMessage(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/sales/upload-menu/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setMessage(`✅ Upload successful! ${response.data.items_added} items added.`);
    } catch (err: any) {
      console.error('Upload error:', err);
      setError(`❌ Upload failed: ${err?.response?.data?.error || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>📄 Upload Menu PDF</Typography>

      <Paper elevation={2} sx={{ p: 2, my: 2 }}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </Paper>

      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={handleUpload}
        disabled={loading}
      >
        Upload
      </Button>

      {loading && <LinearProgress sx={{ mt: 2 }} />}

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}
