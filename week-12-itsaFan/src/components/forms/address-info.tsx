import { Input, Button } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { addressInfoSchema } from "./validation-schema";
import classes from "./css/form-item.module.css";
import { AddressInfoProps } from "./form-props";

// type Props = {
//   onSubmit: (data: { address: string; city: string; country: string; zipCode: string }) => void;
//   prevStep: () => void;
// };

export default function AddressInfo({ onSubmit, prevStep, initialValues }: AddressInfoProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addressInfoSchema}
      onSubmit={(data) => {
        console.log("Address Data:", data);
        onSubmit(data);
      }}
    >
      {() => (
        <FormikForm>
          <div className={classes.items}>
            <Field name="address" as={Input} placeholder="Street Address" />
            <ErrorMessage name="address" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="city" as={Input} placeholder="City" />
            <ErrorMessage name="city" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="country" as={Input} placeholder="Country" />
            <ErrorMessage name="country" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="zipCode" as={Input} placeholder="Zip Code" />
            <ErrorMessage name="zipCode" component="div" className={classes.error} />
          </div>
          <Button type="primary" onClick={prevStep} className={classes.prevBtn}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
