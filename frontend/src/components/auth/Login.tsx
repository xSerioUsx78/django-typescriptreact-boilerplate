import { useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginUser } from '../../redux/slice/auth';
import { LoginInterface } from '../../interfaces/auth';
import { requiredValidation } from '../../validation/idnex';
import Button from '../features/Button';


const Login = () => {

  const history = useHistory();

  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const initialValues: LoginInterface = useMemo(() => {
    return {
      username: '',
      password: '',
    }
  }, []);

  useEffect(() => {
    auth.isAuthenticated && history.push('/');
  }, [auth.isAuthenticated, history]);

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          username: Yup.string()
          .required(requiredValidation.message),
          password: Yup.string()
          .required(requiredValidation.message)
        })}
        onSubmit={(values) => {
            dispatch(loginUser(values));
          }
        }
        >
          {({
            values,
            errors,
            handleChange, 
            handleSubmit,
            handleBlur,
            touched
          }) => (
            <form 
            className="mt-8 space-y-6" 
            method="POST"
            onSubmit={handleSubmit}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <input
                    required
                    id="username"
                    name="username"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                  {
                    touched.username
                    &&
                    errors.username 
                    &&
                    <div className="text-red-600 fw-medium mt-2 mb-4 text-sm">
                      {errors.username}
                    </div> 
                  }
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    required
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  {
                    touched.password
                    &&
                    errors.password 
                    &&
                    <div className="text-red-600 fw-medium mt-2 mb-4 text-sm">
                      {errors.password}
                    </div> 
                  }
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/reset-password/" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
              <Button
                type="submit"
                text="Sign in"
                symbol={
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                }
                loading={auth.isLoading}
                className="group relative w-full flex justify-center 
                py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
              </div>
              <div className="text-center">
                <div className="text-sm">
                  <Link to="/register/" className="font-medium text-indigo-600 
                  hover:text-indigo-500">
                    Create a new account
                  </Link>
                </div>
              </div>
            </form>
          )}
        </Formik>  
      </div>
    </div>
  )
};

export default Login;