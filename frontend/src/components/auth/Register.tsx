import { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserAddIcon } from '@heroicons/react/solid';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Toast } from '../../utils/messages';
import requests from '../../utils/requests';
import { useAppSelector } from '../../redux/store';
import { formikSetError } from '../../utils/setError';
import { RegisterInterface } from '../../interfaces/auth';
import { requiredValidation, emailValidation } from '../../validation/idnex';
import { usernameValidation, passwordValidation } from '../../validation/register';
import Button from '../features/Button';


const Register = () => {

  const history = useHistory();

  const auth = useAppSelector(state => state.auth);

  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  const initialValues: RegisterInterface = useMemo(() => {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  }, []);

  useEffect(() => {
    auth.isAuthenticated && history.push('/')
  }, [auth.isAuthenticated, history])

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
        </div>
        <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
        username: Yup.string()
        .required(requiredValidation.message)
        .max(usernameValidation.maxLength, usernameValidation.maxLengthMessage),
        email: Yup.string()
        .email(emailValidation.message)
        .required(requiredValidation.message),
        password: Yup.string()
        .required(requiredValidation.message)
        .min(passwordValidation.minLength, passwordValidation.minLengthMessage),
        confirm_password: Yup.string()
        .required(requiredValidation.message)
        .oneOf([Yup.ref('password'), null], passwordValidation.notMatchMessage)
        })}
        onSubmit={
          async (values, {setFieldError}) => {
            try {
              setRegisterLoading(true);
              await axios.post(requests.register, values);
              Toast.fire({
                title: 'Register success!',
                text: 'Redirecting to login page...',
                icon: 'success',
                timer: 2000
              }).then(() => {
                history.push('/login/');
              });
            } catch (e: any) {
              const { response } = e;
              if (response.status === 400) {
                formikSetError(response, setFieldError);
              } else {
                Toast.fire({
                  title: 'Register faild!',
                  text: 'Something went wrong, please try again!',
                  icon: 'error',
                  timer: 2000
                });
              }
            } finally {
              setRegisterLoading(false);
            }
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
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 mb-6 md:mb-4 px-1">
                    <label htmlFor="username" className="sr-only ">
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
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Username"
                    />
                    {
                      touched.username
                      &&
                      errors.username 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.username}
                      </div> 
                      }
                  </div>
                  <div className="w-full md:w-1/2 mb-6 md:mb-4 px-1">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                    required
                      id="email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email"
                    />
                    {
                      touched.email
                      &&
                      errors.email 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.email}
                      </div> 
                    }
                  </div>
                </div>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-1/2 mb-6 md:mb-4 px-1">
                    <label htmlFor="password" className="sr-only ">
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
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    {
                      touched.password
                      &&
                      errors.password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.password}
                      </div> 
                      }
                  </div>
                  <div className="w-full md:w-1/2 mb-6 md:mb-4 px-1">
                    <label htmlFor="confirm_password" className="sr-only">
                      Re-enter password
                    </label>
                    <input
                    required
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Re-enter password"
                    />
                    {
                      touched.confirm_password
                      &&
                      errors.confirm_password 
                      &&
                      <div className="text-red-600 fw-medium mt-2 text-sm">
                        {errors.confirm_password}
                      </div> 
                    }
                  </div>
                </div>
              </div>
              <div>
              <Button
                type="submit"
                text="Register"
                symbol={
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <UserAddIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                }
                loading={registerLoading}
                className="group relative w-full flex justify-center 
                py-2 px-4 border border-transparent text-sm font-medium 
                rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
              </div>
              <div className="text-center">
                <div className="text-sm">
                  <span className="text-gray-500 mr-1">Already have an account?</span>
                  <Link to="/login/" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign in
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

export default Register;