import { Input, Button } from "antd";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { accountInfoSchema } from "./validation-schema";
import classes from "./css/form-item.module.css";
import { AccountInfoProps } from "./form-props";

// type Props = {
//   // onSubmit?: (values: { username: string; password: string }) => void;
//   prevStep: () => void;
//   onRegister: () => void;
// };

// const defaultProps = {
//   onSubmit: (values: { username: string; password: string }) => {
//     console.log(values);
//   },
// };

export default function AccountInfo({ prevStep, onRegister, initialValues }: AccountInfoProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={accountInfoSchema}
      onSubmit={(values) => {
        console.log(values);
        // setSubmitting(false);
        // onSubmit(values);
        onRegister();
      }}
    >
      {() => (
        <FormikForm>
          <div className={classes.items}>
            <Field name="username" as={Input} placeholder="Username" />
            <ErrorMessage name="username" component="div" className={classes.error} />
          </div>
          <div className={classes.items}>
            <Field name="password" type="password" as={Input} placeholder="Password" />
            <ErrorMessage name="password" component="div" className={classes.error} />
          </div>

          <Button type="primary" onClick={prevStep} className={classes.prevBtn}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
