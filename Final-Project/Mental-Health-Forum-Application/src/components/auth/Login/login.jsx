/* eslint-disable react/prop-types */
import { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { passwordSchema } from "../auth-validation";
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const LoginForm = ({ identifier, setIdentifier, password, setPassword, onSubmit, error, loading }) => {
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    try {
      passwordSchema.validateSync(e.target.value);
      setValidationErrors({ ...validationErrors, password: undefined });
    } catch (error) {
      setValidationErrors({ ...validationErrors, password: error.message });
    }
  };

  const isWrongPassword = error === "Wrong password";
  const isNoIdentifier = error === "Username or Email not found";
  // const isLockedOut = error === "Too many login attempts, please try again after 30 seconds";

  return (
    <div className="flex justify-center px-6 py-8 mx-auto lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account</h1>
          <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
            {/* {isLockedOut && <p className="text-red-500 mt-2">Too many failed login, try again in 30 Seconds </p>} */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email or Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-300" />
                <input
                  type="text"
                  name="identifier"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
                {isNoIdentifier ? <span className="text-red-700 font-semibold text-sm ml-1">Username or Email not found</span> : undefined}
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button type="button" className="absolute right-3 top-2.5 text-gray-400 dark:text-gray-300" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
                {isWrongPassword ? (
                  <span className="text-red-700 font-semibold text-sm ml-1">Wrong Password</span>
                ) : validationErrors.password ? (
                  <span className="text-red-700 font-semibold text-sm ml-1">{validationErrors.password}</span>
                ) : undefined}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                    Remember me
                  </label>
                </div>
              </div>
              <a href="#" className="text-sm font-medium text-blue-500 hover:underline dark:text-blue-400">
                Lost password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-500 hover:via-dark-blue-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-blue-500 dark:via-blue-600 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:via-blue-700 dark:hover:to-blue-800 dark:focus:ring-primary-800"
            >
              {loading ? <Spinner /> : <span>Sign in</span>}
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <span className="font-medium text-primary-600 hover:underline cursor-pointer dark:text-primary-500" onClick={() => navigate("/register")}>
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
