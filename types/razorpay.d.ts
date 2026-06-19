import type { RazorpayOptions } from "./index";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: { error: { description: string } }) => void) => void;
    };
  }
}

export {};
