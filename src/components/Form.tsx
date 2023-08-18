import React, { Fragment, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormFields } from "../types";
import { Addons } from "./Addons";
import { Finish } from "./Finish";
import { FormContent } from "./FormContent";
import { PersonalInfo } from "./PersonalInfo";
import { SelectPlan } from "./SelectPlan";
import { Summary } from "./Summary";

export const StepContext = React.createContext<{
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}>({
  activeStep: 1,
  setActiveStep: () => {},
});

export const Form = () => {
  const steps = [
    {
      step: 1,
      name: "Your info",
      RenderContent: PersonalInfo,
    },
    {
      step: 2,
      name: "Select plan",
      RenderContent: SelectPlan,
    },
    {
      step: 3,
      name: "Add-ons",
      RenderContent: Addons,
    },
    {
      step: 4,
      name: "Summary",
      RenderContent: Summary,
      nextButtonName: "Confirm",
    },
    {
      step: 5,
      RenderContent: Finish,
    },
  ];

  const [activeStep, setActiveStep] = useState(1);
  const form = useForm<FormFields>();

  const handleNextStep = () => {
    const trigger = async () => {
      if (activeStep === 1) {
        const ok = await form.trigger(["name", "email", "phone_number"]);
        if (!ok) return;
      }

      if (activeStep === 4) {
        form.handleSubmit(handleSubmit)();
      }
      setActiveStep((prevStep) => prevStep + 1);
    };

    trigger();
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  const handleSubmit: SubmitHandler<FormFields> = (data) => {
    alert(JSON.stringify(data));
    form.reset();
  };

  return (
    <StepContext.Provider value={{ activeStep, setActiveStep }}>
      <FormProvider {...form}>
        <form className="Form" onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="FormLeftSide">
            {steps.map(({ step, name }, index) => (
              <Fragment key={index}>
                {name && (
                  <div
                    key={step}
                    className={`FormStep${
                      step === activeStep ? " FormStep--active" : ""
                    }`}
                  >
                    <div className="FormStepCircle">{step}</div>
                    <div className="FormStepNames">
                      <span className="FormStepNamesStep">Step {step}</span>
                      <span className="FormStepNamesName">{name}</span>
                    </div>
                  </div>
                )}
              </Fragment>
            ))}
          </div>
          <div className="FormRightSide">
            {steps.map(({ step, RenderContent }) => (
              <FormContent key={step} show={activeStep === step}>
                {RenderContent && <RenderContent />}
              </FormContent>
            ))}

            {steps.length > activeStep && (
              <div className="FormActions">
                <button
                  className="FormButton"
                  type="button"
                  disabled={activeStep === 1}
                  onClick={handlePrevStep}
                >
                  Go Back
                </button>

                <button
                  className="FormButton FormButtonFilled"
                  type="button"
                  disabled={activeStep >= steps.length}
                  onClick={handleNextStep}
                >
                  {steps[activeStep - 1]?.nextButtonName ?? "Next Step"}
                </button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </StepContext.Provider>
  );
};
