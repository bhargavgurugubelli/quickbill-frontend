import React, { useState, useEffect } from 'react';
import {
  Drawer, Box, Typography, IconButton, TextField, Button, Divider, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const MobileOtpDrawer: React.FC<Props> = ({ open, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!mobile) return;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/send-otp/`, { mobile });
      setOtpSent(true);
      setResendTimer(60);
      console.log('📨 OTP sent to mobile:', mobile);
    } catch (err) {
      console.error('❌ Failed to send OTP:', err);
      alert('Failed to send OTP. Try again.');
    }
  };

  const handleResendOtp = async () => {
    if (!mobile) return;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/send-otp/`, { mobile });
      setResendTimer(60);
      console.log('🔁 OTP resent to mobile:', mobile);
    } catch (err) {
      console.error('❌ Resend failed:', err);
      alert('Could not resend OTP.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !mobile) return;
    try {
      console.log('🧪 Verifying OTP:', otp, 'for mobile:', mobile);
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/verify-otp/`, {
        mobile,
        otp,
      });

      console.log('✅ OTP verification response:', res.data);
      console.log('🔐 Access token:', res.data.access);
      console.log('🔁 Refresh token:', res.data.refresh);

      if (res.data.existing_user) {
        sessionStorage.setItem('token', res.data.access);
        sessionStorage.setItem('refreshToken', res.data.refresh);
        sessionStorage.setItem('has_paid', 'true');

        onClose(); // ✅ Close drawer
        navigate('/dashboard');
      } else {
        // ✅ New user flow
        localStorage.setItem('new_user_mobile', mobile);
        sessionStorage.setItem('new_user_mobile', mobile);
        sessionStorage.setItem('token', res.data.access);
        sessionStorage.setItem('refreshToken', res.data.refresh);
        sessionStorage.setItem('has_paid', 'false');

        onClose(); // ✅ Close drawer
        navigate('/pricing-table'); // ✅ This will pre-select Free Trial and go to Business Setup
      }
    } catch (err) {
      console.error('❌ OTP verification failed:', err);
      alert('Invalid OTP. Try again.');
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (otpSent && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, otpSent]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: '460px' } }}>
      <Box sx={{ px: 4, pt: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight={700}>Login / Register</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box mt={4}>
          <Typography variant="body2" gutterBottom>
            Enter your mobile number
          </Typography>
          <TextField
            fullWidth
            placeholder="9876543210"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <InputAdornment position="start">+91</InputAdornment>,
            }}
          />

          {!otpSent && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleSendOtp}
              sx={{ mt: 2, backgroundColor: '#D82C4E' }}
            >
              Get OTP
            </Button>
          )}

          {otpSent && (
            <>
              <TextField
                fullWidth
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              />

              <Box mt={1.5}>
                {resendTimer > 0 ? (
                  <Typography variant="body2" color="textSecondary">
                    You can request another OTP in <strong>{resendTimer}</strong> seconds
                  </Typography>
                ) : (
                  <Button onClick={handleResendOtp} sx={{ color: '#D82C4E' }}>
                    Resend OTP
                  </Button>
                )}
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleVerifyOtp}
                sx={{ mt: 2, backgroundColor: '#D82C4E' }}
              >
                Login
              </Button>
            </>
          )}
        </Box>

        <Divider sx={{ my: 3 }}>Or</Divider>
        
      </Box>
    </Drawer>
  );
};

export default MobileOtpDrawer;
