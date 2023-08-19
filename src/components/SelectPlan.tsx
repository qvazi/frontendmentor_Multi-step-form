import React, { Fragment, InputHTMLAttributes, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FormFields, Plan as TPlan } from "../types";

const plans: Array<TPlan> = [
  {
    id: "1",
    name: "Arcade",
    price: 9,
  },
  {
    id: "2",
    name: "Advanced",
    price: 12,
  },
  {
    id: "3",
    name: "Pro",
    price: 15,
  },
];

interface PlanProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  price: number;
  period: string;
}

const Plan = React.forwardRef<HTMLInputElement, PlanProps>(
  ({ label, price, period, ...inputProps }, ref) => {
    const id = useId();
    return (
      <Fragment>
        <input
          className="FormPlanInput"
          ref={ref}
          id={id}
          type="radio"
          {...inputProps}
        />
        <label className="FormPlan" htmlFor={id}>
          <div className="FormPlanIcon">
            <img
              src={`./assets/images/icon-${label.toLowerCase()}.svg`}
              alt=""
            />
          </div>
          <span className="FormPlanName">{label}</span>
          <span className="FormPlanPrice">{`$${price}/${period}`}</span>
        </label>
      </Fragment>
    );
  }
);

export const SelectPlan = () => {
  const { register, control } = useFormContext<FormFields>();
  return (
    <Fragment>
      <h2 className="FormHeader">Select your plan</h2>
      <p className="FormDescription">
        You have the option of monthly or yearly billing.
      </p>
      <div className="FormPlans">
        {plans.map((plan) => (
          <Fragment key={plan.id}>
            <Controller
              control={control}
              name="plan"
              defaultValue={plans[0]}
              render={({ field }) => (
                <Plan
                  name={field.name}
                  value={plan.id}
                  checked={field.value.id === plan.id}
                  label={plan.name}
                  period="mo"
                  price={plan.price}
                  onChange={(e) => {
                    const plan = plans.find(
                      (plan) => plan.id === e.target.value
                    );
                    if (plan) {
                      field.onChange(plan);
                    }
                  }}
                />
              )}
            />
          </Fragment>
        ))}
      </div>
      <Controller
        control={control}
        name="payment_period"
        defaultValue="monthly"
        render={({ field }) => (
          <>
            <label>
              <input
                {...register("payment_period")}
                value="monthly"
                checked={field.value === "monthly"}
                type="radio"
              />
              Monthly
            </label>
            <label>
              <input
                {...register("payment_period")}
                value="yearly"
                checked={field.value === "yearly"}
                type="radio"
              />
              Yearly
            </label>
          </>
        )}
      />
    </Fragment>
  );
};
