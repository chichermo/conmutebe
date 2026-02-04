import { initStripe } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '../constants/config';

export const setupStripe = async () => {
  if (!STRIPE_PUBLISHABLE_KEY) {
    return;
  }
  await initStripe({
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    merchantIdentifier: 'merchant.ecocommute.be',
  });
};

export const startPremiumCheckout = async () => {
  return { success: true };
};
