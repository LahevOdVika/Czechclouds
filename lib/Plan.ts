// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Plan {
  id: string;
  name: string;
  title: string;
  recommendation: string;
  priceMonthly: number;
  priceYearly: number;
  features: string[];
  nonFeatures: string[];
  isPopular: boolean;
}
