export {};

declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id?: string;
    handler: (response: any) => void;
    prefill?: {
      name: string;
      email: string;
      contact: string;
    };
    notes?: any;
    theme?: {
      color: string;
    };
  }

  interface Razorpay {
    open(): void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => Razorpay;
  }
}
