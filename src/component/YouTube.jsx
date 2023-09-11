import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, useWatch, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let count = 0;

function YouTube() {
  const form = useForm({
    defaultValues: {
      username: "ironman",
      email: "",
      channel: "",
      social: {
        linkedIn: "",
        twitter: "",
      },
      phoneNumbers: [""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    mode:"onSubmit"

    // async default values
    // defaultValues: async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //   const user = await response.json();
    //   return {
    //     username:user.name,
    //     email:user.email,
    //     channel:''
    //   }
    // }
  });
  const {
    register,
    control,
    handleSubmit,
   formState ,
    watch,
    getValues,
    setValue,
    trigger,
    reset
  } = form;

  const { errors, isDirty, touchedFields, dirtyFields, isValid } = formState;
  const {isSubmitted, isSubmitting, isSubmitSuccessful, submitCount} = formState;

  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const handleGetValues = () => {
    console.log(getValues());
  };

  const handleSetValues = () => {
    setValue("username", "", {
      // if not set this fields true by default setValue does not update touch and dirty property
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  console.log({isSubmitted, isSubmitting, isSubmitSuccessful});


  // console.log({touchedFields, dirtyFields, isDirty});
 

 

  // const watchUserName = watch('username');
  // console.log(watchUserName);

  // count++;

  // useEffect(() => {
  //   const subscribe = watch((value, {name, type}) => {
  //     console.log(value, name, type);
  //   })

  //   return () => subscribe.unsubscribe()
  // }, [watch])


  const submit = (data) => {
    console.log(data);
  };

  const onError = (errors) => {
    // console.log(errors);
  }

  return (
    <div>
      {/* <h1>Form {count / 2}</h1> */}
      {console.log("rendering.....")}
      <form onSubmit={handleSubmit(submit, onError)}>
        <label htmlFor="username">username </label>
        <input
          id="username"
          name="username"
          type="text"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            },
          })}
        />
        <p>{errors.username?.message}</p>
        <br />
        <label htmlFor="email"> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          {...register("email", {
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Invalid Email format",
            },
            required: {
              value: true,
              message: "Email required",
            },
            validate: {
              noAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@gmail.com" ||
                  "Enter Other Email Address"
                );
              },
              badDomain: (fieldValue) => {
                return (
                  !fieldValue.endsWith("bad.com") ||
                  "Domain name is not supported"
                );
              },
    
            }
          })}
        />

        <p>{errors.email?.message}</p>
        <br />

        <label htmlFor="channel"> channel </label>
        <input
          id="channel"
          name="channel"
          type="text"
          {...register("channel", {
            required: "Channel name is required",
          })}
        />
        <p>{errors.channel?.message}</p>
        <br />

        <label htmlFor="linkedIn"> linkedIn </label>
        <input
          id="linkedIn"
          name="linkedIn"
          type="text"
          {...register("social.linkedIn", {
            required: "linkedIn account is required",
          })}
        />
        <p>{errors.social?.linkedIn?.message}</p>
        <br />

        <label htmlFor="twitter"> twitter </label>
        <input
          id="twitter"
          name="twitter"
          type="text"
          {...register("social.twitter", {
            required: "twitter account is required",
          })}
        />
        <p>{errors.social?.twitter?.message}</p>
        <br />

        <label htmlFor="primary-phoneNumber"> primary Phone Number </label>
        <input
          id="primary-phone"
          name="primary-phone"
          type="text"
          {...register("phoneNumbers.0", {
            required: "Primary No is required",
          })}
        />
        <p>{errors.phoneNumbers?.[0]?.message} </p>
        <br />

        <label htmlFor="secondary-phoneNumber"> Secondary Phone Number </label>
        <input
          id="secondary-phone"
          name="secondary-phone"
          type="text"
          {...register("phoneNumbers.1", {
            required: "secondary No is required",
          })}
        />
        <p>{errors?.phoneNumbers?.[1]?.message} </p>
        <br />

        <label htmlFor="cell number">List of Phone Numbers </label>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <input
                type="text"
                {...register(`phNumbers.${index}.number`, {
                  required: {
                    value: true,
                    message: "please provide number",
                  },
                })}
              />
              {index > 0 && (
                <button onClick={() => remove(index)}>Remove</button>
              )}
              {errors.phNumbers?.[index]?.number?.message}
            </div>
          );
        })}

        <button type="button" onClick={() => append({ number: "" })}>
          Add PhNumber
        </button>

        <br />

        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          type="number"
          {...register("age", {
            valueAsNumber: true,
            required: "Age  is required",
          })}
        />
        <p>{errors?.age?.message}</p>
        <br />

        <label htmlFor="dob"> Date of Birth </label>
        <input
          id="dob"
          name="dob"
          type="date"
          {...register("dob", {
            valueAsDate: true,
            required: "dob  is required",
          })}
        />
        <p>{errors?.dob?.message}</p>
        <br />

        <button type="button" onClick={handleGetValues}>
          Get Values
        </button>
        <button type="button" onClick={handleSetValues}>
          Set Value
        </button>
        <button type="submit" >Submit</button>
        {/* reset form value */}
        <button type="button" onClick={() => reset()}>Reset</button>
        {/* manually trigger validation */}
        <button type="button" onClick={() => trigger()}>Validate</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}

export default YouTube;
