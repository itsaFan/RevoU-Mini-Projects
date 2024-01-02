import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import { Button, Divider, Input } from "antd";
import { LoginProps } from "../../../helpers/form-interface";
import { loginSchema } from "../../../helpers/validation-schema";
import Registration from "./registration";
import classes from "./css/auth-item.module.css";

export default function LoginForm({ initialValues, onLogin }: LoginProps) {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          console.log(values);
          onLogin(values);
        }}
      >
        {() => (
          <div>
            <FormikForm className="space-y-5">
              <div>
                <Field name="username" as={Input} placeholder="Username" className="w-full h-10 border border-gray-800 px-3 rounded-lg" />
                <ErrorMessage name="username" component="div" className={classes.error} />
              </div>
              <div>
                <Field name="password" as={Input} type="password" placeholder="password" className="w-full h-10 border border-gray-800 px-3 rounded-lg" />
                <ErrorMessage name="password" component="div" className={classes.error} />
              </div>
              <Button type="primary" htmlType="submit" className="w-full h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Login
              </Button>
              <Divider />
              <div>
                <Registration />
              </div>
            </FormikForm>
          </div>
        )}
      </Formik>
    </>
  );
}
