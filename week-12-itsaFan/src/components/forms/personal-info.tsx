import { Input, Button, DatePicker } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { personalInfoSchema } from "./validation-schema";
import classes from "./css/form-item.module.css";
import { PersonalInfoProps } from "./form-props";

// type Props = {
//   onSubmit: (data: { firstName: string; lastName: string }) => void;
// };

export default function PersonalInfo({ onSubmit, initialValues }: PersonalInfoProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={personalInfoSchema}
      onSubmit={(data) => {
        console.log("Personal Info Data:", data);
        onSubmit(data);
      }}
      //   onSubmit={(data) => {
      //     const dobFormatted = data.dob.format("YYYY-MM-DD");
      //     const formData = {
      //       ...data,
      //       dob: dobFormatted,
      //     };
      //     console.log("Personal Info Data:", formData);
      //     onSubmit();
      //   }}
    >
      {() => (
        <FormikForm>
          <div className={classes.items}>
            <Field name="firstName" as={Input} placeholder="First Name" />
            <ErrorMessage name="firstName" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="lastName" as={Input} placeholder="Last Name" />
            <ErrorMessage name="lastName" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="email" as={Input} placeholder="Email Address" />
            {/* {errors.email && touched.email ? (
             <div>{errors.email}</div>
           ) : null} */}
            <ErrorMessage name="email" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="dob">{({ field, form }: any) => <DatePicker {...field} placeholder="Date of Birth" onChange={(dateString) => form.setFieldValue("dob", dateString)} />}</Field>
            {/* <Field name="dob" as={DatePicker} placeholder="Date of Birth" /> */}
            <ErrorMessage name="dob" component="div" className={classes.error} />
          </div>
          <Button type="primary" htmlType="submit" >
            Next
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
