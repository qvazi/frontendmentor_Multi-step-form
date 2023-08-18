import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types";

export const Summary = () => {
  const { getValues } = useFormContext<FormFields>();
  const paymentPeriod = getValues("payment_period");
  const period = paymentPeriod === "monthly" ? "Monthly" : "Yearly";
  const periodShort = paymentPeriod === "monthly" ? "mo" : "yr";
  const scale = paymentPeriod === "monthly" ? 1 : 12;

  return (
    <Fragment>
      <h2 className="FormHeader">Finishing up</h2>
      <p className="FormDescription">
        Double-check everything looks OK before confirming.
      </p>
      <div className="Summary">
        <div className="SummaryPlan">
          <span className="SummaryPlanName">
            {getValues("plan").name}({period})
          </span>
          <span className="SummaryPlanPrice">
            ${getValues("plan").price * scale}/{periodShort}
          </span>
        </div>
        {!!getValues("addons").length && (
          <>
            <hr />
            {getValues("addons").map(({ id, name, price }) => (
              <div key={id} className="SummaryAddon">
                <span className="SummaryAddonName">{name}</span>
                <span className="SummaryAddonPrice">
                  +${price * scale}/{periodShort}
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </Fragment>
  );
};
