import { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Addon, FormFields } from "../types";

const addons: Array<Addon> = [
  {
    id: "1",
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    id: "2",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    id: "3",
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: 2,
  },
];

export const Addons = () => {
  const { control } = useFormContext<FormFields>();
  return (
    <Fragment>
      <h2 className="FormHeader">Pick add-ons</h2>
      <p className="FormDescription">
        Add-ons help enhance your gaming experience.
      </p>

      <div className="Addons">
        {addons.map((addon, index) => (
          <Fragment key={index}>
            <Controller
              control={control}
              name="addons"
              defaultValue={[]}
              render={({ field }) => (
                <Fragment key={addon.id}>
                  <label
                    className={`Addon ${
                      field.value.find((v) => v.id === addon.id)
                        ? "Addon--active"
                        : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={!!field.value.find((v) => v.id === addon.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...field.value, addon]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v.id !== addon.id)
                          );
                        }
                      }}
                    />
                    <div className="AddonContent">
                      <span className="AddonName">{addon.name}</span>
                      <span className="AddonDescription">
                        {addon.description}
                      </span>
                    </div>

                    <div className="AddonPrice">+${addon.price}/mo</div>
                  </label>
                </Fragment>
              )}
            />
          </Fragment>
        ))}
      </div>
    </Fragment>
  );
};
