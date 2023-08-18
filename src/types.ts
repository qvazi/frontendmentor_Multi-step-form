export type Addon = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
};

export type FormFields = {
  name: string;
  email: string;
  phone_number: string;
  addons: Array<Addon>;
  plan: Plan;
  payment_period: "monthly" | "yearly";
};
