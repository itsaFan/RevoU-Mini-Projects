import * as Yup from "yup";

export const personalInfoSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  dob: Yup.date()
    .required("Date of Birth is required")
    .max(new Date(2010, 11, 31), "Date of Birth cannot be entered after 2010"),
});

export const addressInfoSchema = Yup.object({
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
  zipCode: Yup.string()
    .required("Zip Code is required")
    .matches(/^\d{5}/, "Zip Code should be 5 numbers"),
});

export const accountInfoSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must be alphanumeric")
    .required("Password is required"),
});
