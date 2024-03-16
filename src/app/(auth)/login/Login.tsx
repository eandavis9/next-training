"use client";

import Button from "@/app/components/core/button/button";
import { Formik, Form } from "formik";
import FormGroup from "@/app/components/core/forms/form-group/form-group";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/core/alert/alert";
import {
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Metadata, NextPage } from "next";
import FormLabel from "@/app/components/core/forms/form-label/form-label";
import FormField from "@/app/components/core/forms/form-fields/form-field";

interface Props {}

export const metadata: Metadata = {
  title: "Login",
};

const Login: NextPage<Props> = () => {
  const loginFormInitialValue = {
    username: "",
    password: "",
  };

  const router = useRouter();

  const handleSubmit = async () => {
    router.push("/patients");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [alertType, setAlertType] = useState<
    "default" | "success" | "warning" | "error"
  >("default");
  const [alertMessage, setAlertMessage] = useState<string>("");

  return (
    <div className="my-auto flex items-center bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-50 via-primary-100 to-primary-50 sm:h-screen">
      <div className="flex h-full w-screen flex-col items-center justify-between gap-16 p-8 sm:gap-0 sm:p-16 main-background">
        <header className="header w-full text-left"></header>
        <section className="flex w-full h-400 flex-col justify-center gap-8 sm:flex-row">
          <div className="section-left animate__animated animate__slideInLeft flex h-full flex-col items-center justify-center sm:w-full md:w-6/12">
            <div className="px-0 text-center md:px-4 lg:px-24">
              <div className="mb-2 mt-12 text-h3 leading-tight tracking-wide text-secondary tagline">
                <h2 className="tagline">
                  It's a beautiful day to <span>save smiles</span>.
                </h2>
              </div>
            </div>
          </div>

          <div className="section-right animate__animated animate__slideInRight px-0 sm:w-full sm:px-8 md:w-6/12 md:px-16 ">
            <div className=" grid-row-2 grid h-full w-full rounded-lg bg-secondary-white bg-opacity-60 p-12 shadow-lg sm:w-11/12 login-section">
              <h1 className="mb-3 text-h2 font-semibold text-center text-secondary signup">
                Sign In
              </h1>
              <div className="flex-1">
                <Formik
                  initialValues={loginFormInitialValue}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    isSubmitting,
                  }) => (
                    <Form noValidate>
                      {/* Email */}
                      <FormGroup intent="primary">
                        <FormLabel fontbold for="username" intent="secondary">
                          Username
                        </FormLabel>
                        <FormField
                          intent={`${
                            touched.username && errors.username
                              ? "error"
                              : "default"
                          }`}
                          errorMessage={errors.username ? errors.username : ""}
                          fieldtype="text"
                          name="username"
                          fullWidth
                          lefticonblock={<UserCircleIcon />}
                        />
                      </FormGroup>

                      {/* Password */}
                      <FormGroup intent="primary">
                        <FormLabel fontbold for="password" intent="secondary">
                          Password
                        </FormLabel>
                        <FormField
                          intent={`${
                            touched.password && errors.password
                              ? "error"
                              : "default"
                          }`}
                          errorMessage={errors.password ? errors.password : ""}
                          fieldtype="password"
                          name="password"
                          fullWidth
                        />
                      </FormGroup>

                      <div className="my-2" hidden={!isError}>
                        <Alert
                          intent="inline"
                          showalert={isError}
                          type={alertType}
                        >
                          {alertMessage}
                        </Alert>
                      </div>
                      <div className="flex items-center justify-end text-secondary mb-4 register">
                        <Button
                          buttontype="button"
                          intent="link"
                          label="Forgot password?"
                          size="sm"
                        />
                      </div>
                      {/* Sign In Button */}
                      <FormGroup intent="primary">
                        <Button
                          fullWidth
                          isLoading={isLoading}
                          buttontype="submit"
                          intent="add"
                          label="SIGN IN"
                          size="sm"
                        ></Button>
                      </FormGroup>
                      <div className="mt-10"></div>
                      <div className="flex w-full items-center justify-center text-secondary gap-3 register">
                        <label htmlFor="">Don't have an account?</label>
                        <Button
                          buttontype="button"
                          intent="link"
                          label="Register here"
                          size="md"
                          onClick={() => navigateToSignUp()}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
        <footer className="powered-by w-full text-left text-secondary-400"></footer>
      </div>
    </div>
  );
};

export default Login;
