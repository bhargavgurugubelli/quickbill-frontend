import React from 'react';

type RazorpayButtonProps = {
  amount: number;
  userId: string;
  planId: string;
  planName: string;
};

const RazorpayButton = ({ amount, userId, planId, planName }: RazorpayButtonProps) => {
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded || !window.Razorpay) {
      alert('Failed to load Razorpay SDK.');
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID!,
      amount: amount * 100,
      currency: 'INR',
      name: 'QuickBill',
      description: planName,
      image: '/logo.png',
      handler: async (response: any) => {
        const paymentData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          amount,
          user_id: userId,
          plan_id: planId,
          plan_name: planName,
        };

        const res = await fetch('http://localhost:8000/api/store-payment/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData),
        });

        if (res.ok) {
          localStorage.setItem('has_paid', 'true');
          window.location.href = '/dashboard';
        } else {
          alert('Payment saved failed. Please contact support.');
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'test@example.com',
        contact: '8888888888',
      },
      notes: {
        plan_id: planId,
        user_id: userId,
      },
      theme: {
        color: '#D82C4E',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handlePayment}
      style={{
        padding: '8px 16px',
        background: '#D82C4E',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
      }}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
