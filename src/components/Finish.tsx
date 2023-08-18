import { Fragment, useContext } from "react";
import { StepContext } from "./Form";

export const Finish = () => {
  const { setActiveStep } = useContext(StepContext);
  return (
    <Fragment>
      <div className="Finish">
        <img src="/assets/images/icon-thank-you.svg" alt="" />
        <h2 className="FinishHeader">Thank you!</h2>

        <p className="FinishDescription">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>

        <button
          className="FormButton FormButtonFilled"
          type="button"
          onClick={() => setActiveStep(1)}
        >
          One more
        </button>
      </div>
    </Fragment>
  );
};
