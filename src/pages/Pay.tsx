// ✅ Pay.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Pay: React.FC = () => {
  const navigate = useNavigate();

  const mobile = localStorage.getItem('new_user_mobile');
  const planId = localStorage.getItem('pendingPlanId');
  const planName = localStorage.getItem('pendingPlanName');
  const amount = parseInt(localStorage.getItem('pendingAmount') || '0');

  useEffect(() => {
    if (!mobile || !planId || !planName || !amount) {
      alert('Missing payment or user info.');
      navigate('/');
      return;
    }

    const loadRazorpay = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => openRazorpay();
      document.body.appendChild(script);
    };

    const openRazorpay = () => {
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_XXXXXXXX',
        amount: amount * 100,
        currency: 'INR',
        name: 'QuickBill',
        description: planName,
        image: '/logo.png',
        handler: async function (response: any) {
          try {
            console.log('✅ Razorpay response:', response);

            const res = await axios.post('http://127.0.0.1:8000/api/subscriptions/create-subscriber-payment/', {
              mobile,
              plan_id: planId,
              plan_name: planName,
              amount,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              payment_status: 'success',
            });

            console.log('✅ Backend response:', res.data);

            localStorage.setItem('access_token', res.data.token.access);
            localStorage.setItem('refresh_token', res.data.token.refresh);
            localStorage.setItem('has_paid', 'true');
            console.log('🎉 Tokens saved to localStorage');

            // Cleanup
            localStorage.removeItem('new_user_mobile');
            localStorage.removeItem('pendingPlanId');
            localStorage.removeItem('pendingPlanName');
            localStorage.removeItem('pendingAmount');

            navigate('/dashboard');
          } catch (error) {
            alert('Payment successful, but user creation failed.');
            console.error('❌ Payment success but backend failed:', error);
          }
        },
        prefill: {
          contact: mobile,
        },
        notes: {
          plan_id: planId,
          plan_name: planName,
        },
        theme: {
          color: '#D82C4E',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    loadRazorpay();
  }, [navigate, mobile, planId, planName, amount]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Redirecting to payment...</h2>
    </div>
  );
};

export default Pay;