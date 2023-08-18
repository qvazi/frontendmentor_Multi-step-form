import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { FormFields } from "../types";

export const PersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>(); // retrieve all hook methods
  return (
    <Fragment>
      <h2 className="FormHeader">Personal info</h2>
      <p className="FormDescription">
        Please provide your name, email address, and phone number.
      </p>
      <fieldset className="FormPersonalInfoFieldset">
        <label
          className={`FormTextFieldRoot${
            errors["name"] ? " FormTextFieldRoot-error" : ""
          }`}
        >
          <div className="FormTextFieldInfo">
            <span className="FormTextFieldInfoName">Name</span>
            {errors["name"] && (
              <span className="FormTextFieldInfoError">
                {errors["name"].message}
              </span>
            )}
          </div>
          <input
            className="FormTextFieldInput"
            {...register("name", { required: "This field is required" })}
            type="text"
            placeholder="e.g. Stephen King"
          />
        </label>

        <label
          className={`FormTextFieldRoot${
            errors["email"] ? " FormTextFieldRoot-error" : ""
          }`}
        >
          <div className="FormTextFieldInfo">
            <span className="FormTextFieldInfoName">Email Address</span>
            {errors["email"] && (
              <span className="FormTextFieldInfoError">
                {errors["email"].message}
              </span>
            )}
          </div>
          <input
            className="FormTextFieldInput"
            {...register("email", { required: "This field is required" })}
            type="text"
            placeholder="e.g. stephenking@lorem.com"
          />
        </label>

        <label
          className={`FormTextFieldRoot${
            errors["phone_number"] ? " FormTextFieldRoot-error" : ""
          }`}
        >
          <div className="FormTextFieldInfo">
            <span className="FormTextFieldInfoName">Phone Number</span>
            {errors["phone_number"] && (
              <span className="FormTextFieldInfoError">
                {errors["phone_number"].message}
              </span>
            )}
          </div>
          <input
            className="FormTextFieldInput"
            {...register("phone_number", {
              required: "This field is required",
            })}
            type="text"
            placeholder="e.g. +1 234 567 890"
          />
        </label>
      </fieldset>
    </Fragment>
  );
};
