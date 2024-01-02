import { Input, Button } from "antd";
import { RegistrationProps } from "../../../helpers/form-interface";
import { registerSchema } from "../../../helpers/validation-schema";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import classes from "./css/auth-item.module.css";

export default function RegistrationForm({ initialValues, onRegister }: RegistrationProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={(values) => {
        console.log(values);
        onRegister(values);
      }}
    >
      {() => (
        <FormikForm className="space-y-5">
          <div>
            <Field name="username" as={Input} placeholder="Username"  className="w-full h-12 border border-gray-800 px-3 rounded-lg" />
            <ErrorMessage name="username" component="div" className={classes.error}  />
          </div>
          <div>
            <Field name="email" as={Input} placeholder="Email Address"  className="w-full h-12 border border-gray-800 px-3 rounded-lg" />
            <ErrorMessage name="email" component="div" className={classes.error} />
          </div>
          <div>
            <Field type="password" name="password" as={Input} placeholder="password"  className="w-full h-12 border border-gray-800 px-3 rounded-lg" />
            <ErrorMessage name="password" component="div" className={classes.error} />
          </div>
          <Button type="primary" htmlType="submit" className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Register
          </Button>
        </FormikForm>
      )}
    </Formik>
  );
}
