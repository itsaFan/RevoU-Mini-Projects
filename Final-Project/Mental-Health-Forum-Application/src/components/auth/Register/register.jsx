/* eslint-disable react/prop-types */
import { useState } from "react";
import { Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { emailSchema, passwordSchema } from "../auth-validation";
import { Spinner } from "flowbite-react";

const RegistrationForm = ({ username, setUsername, email, setEmail, password, setPassword, onSubmit, error, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    try {
      emailSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, email: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, email: error.message });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      passwordSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, password: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, password: error.message });
    }
  };

  const handleRepeatPasswordChange = (e) => {
    setRepeatPassword(e.target.value);
    if (e.target.value !== password) {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: "Passwords do not match",
      });
    } else {
      setValidationErrors({
        ...validationErrors,
        repeatPassword: undefined,
      });
    }
  };

  const isTaken = error === "Username already taken";

  return (
    <section className="flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-sub-dark dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an Account</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
                {isTaken ? <span className="text-red-700 font-semibold text-sm ml-1">Username already taken</span> : undefined}
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  required
                />
                {validationErrors.email ? <span className="text-yellow-400 font-semibold text-sm ml-1">{validationErrors.email}</span> : undefined}
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 pr-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button type="button" className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                {validationErrors.password ? <span className="text-red-700 font-semibold text-sm ml-1">{validationErrors.password}</span> : undefined}
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  required
                />
                <button type="button" className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
                {validationErrors.repeatPassword ? <span className="text-red-700 font-semibold text-sm ml-1">{validationErrors.repeatPassword}</span> : undefined}
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                  I accept the{" "}
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-500 hover:via-dark-blue-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-blue-500 dark:via-blue-600 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-blue-800 dark:focus:ring-primary-800"
            >
              {loading ? <Spinner /> : <span>Create an account</span>}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
