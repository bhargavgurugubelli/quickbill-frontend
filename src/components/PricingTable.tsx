import React from 'react';
import { useLocation } from 'react-router-dom';
import RazorpayButton from './RazorpayButton';

const useQuery = () => new URLSearchParams(useLocation().search);

const PricingTable = (): JSX.Element => {
  const queryParams = useQuery();
  const user_id = queryParams.get('user_id') || 'guest_user'; // fallback if null

  // Example plan data (replace with your actual data)
  const plan = {
    price: 200,
    title: 'Starter Plan',
    planId: 'starter-monthly',
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Select a Plan</h2>
      <RazorpayButton
        amount={plan.price}
        userId={user_id} // Now always a string
        planId={plan.planId}
        planName={plan.title}
      />
    </div>
  );
};

export default PricingTable;
