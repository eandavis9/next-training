import React, { useState } from "react";
import { Form, Formik } from "formik";
import Button from "@/app/components/core/button/button";
import FormField from "@/app/components/core/forms/form-fields/form-field";
import FormGroup from "@/app/components/core/forms/form-group/form-group";
import FormLabel from "@/app/components/core/forms/form-label/form-label";
import { getErrorMessageForField } from "@/_shared/helpers/validation.helper"; // Adjust the import path as needed
import SelectField from "@/app/components/core/select/selectField";
import Spinner from "@/app/components/core/spinner/spinner";
import { GenderEnum, getGenderLabel } from "@/_shared/enums/GenderEnum";
import { VariantProps, cva } from 'class-variance-authority';

import * as Yup from "yup";

const patientFormVariants = cva('bg-white rounded-lg overflow-hidden transform transition-all max-w-3xl w-full patientModal', {
  variants: {},
  defaultVariants: {},
});

interface PatientFormModalProps extends VariantProps<typeof patientFormVariants> {
  onSubmit: (values: any, helpers: any) => void;
  apiErrors: string[];
  onClose: () => void;
}

const PatientFormModal: React.FC<PatientFormModalProps> = ({ onSubmit, onClose, apiErrors, ...props }) => {

  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patientFormInitialValue = {
    first_name: "",
    last_name: "",
    address: "",
    email_address: "",
    birthdate: "",
    gender: "",
    contact_number: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    email_address: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
    birthdate: Yup.date().required("Birthdate is required"),
    gender: Yup.string().required("Gender is required"),
    contact_number: Yup.string().required("Contact Number is required"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setIsSubmitting(true);
      // Call the onSubmit function passed as a prop
      await onSubmit(values, { setSubmitting });
    } catch (error) {
      // Handle error
      console.error("Error submitting patient data:", error);
      setIsError(true); // Set isError to true to show the error message
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={patientFormVariants({})}>
      <Formik
        initialValues={patientFormInitialValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, isSubmitting }) => (
          <Form noValidate>
            {/* First Name */}
            <div className="flex space-x-4">
              <FormGroup
                intent={
                  touched.first_name && errors.first_name ? "error" : "default"
                }
              >
                <FormLabel fontbold htmlFor="first_name" intent="secondary">
                  First Name
                </FormLabel>
                <FormField
                  fieldtype="text"
                  name="first_name"
                  fullWidth
                  onChange={handleChange}
                  placeholder="Enter first name..."
                  intent={
                    touched.first_name ||
                    errors.first_name ||
                    apiErrors.first_name
                      ? "error"
                      : "default"
                  }
                  errorMessage={
                    errors.first_name ||
                    getErrorMessageForField("first_name", apiErrors)
                  }
                />
              </FormGroup>

              {/* Last Name */}
              <FormGroup
                intent={
                  touched.last_name && errors.last_name ? "error" : "default"
                }
              >
                <FormLabel fontbold htmlFor="last_name" intent="secondary">
                  Last Name
                </FormLabel>
                <FormField
                  fieldtype="text"
                  name="last_name"
                  fullWidth
                  onChange={handleChange}
                  placeholder="Enter last name..."
                  intent={
                    touched?.last_name ||
                    errors.last_name ||
                    apiErrors.last_name
                      ? "error"
                      : "default"
                  }
                  errorMessage={
                    errors.last_name ||
                    getErrorMessageForField("last_name", apiErrors)
                  }
                />
              </FormGroup>
            </div>

            {/* Address */}
            <FormGroup
              intent={touched.address || errors.address ? "error" : "default"}
            >
              <FormLabel fontbold htmlFor="address" intent="secondary">
                Address
              </FormLabel>
              <FormField
                fieldtype="text"
                name="address"
                fullWidth
                onChange={handleChange}
                placeholder="Enter address..."
                intent={
                  touched?.address && (errors.address || apiErrors?.address)
                    ? "error"
                    : "default"
                }
                errorMessage={
                  errors.address ||
                  getErrorMessageForField("address", apiErrors)
                }
              />
            </FormGroup>

            {/* Email Address */}
            <FormGroup
              intent={
                touched.email_address && errors.email_address
                  ? "error"
                  : "default"
              }
            >
              <FormLabel fontbold htmlFor="email_address" intent="secondary">
                Email Address
              </FormLabel>
              <FormField
                fieldtype="email"
                name="email_address"
                fullWidth
                onChange={handleChange}
                placeholder="Enter email address..."
                intent={
                  touched?.email_address ||
                  errors.email_address ||
                  apiErrors?.email_address
                    ? "error"
                    : "default"
                }
                errorMessage={
                  errors.email_address ||
                  getErrorMessageForField("email_address", apiErrors)
                }
              />
            </FormGroup>

            {/* Contact Number */}

            <FormGroup
              intent={
                touched.contact_number && errors.contact_number
                  ? "error"
                  : "default"
              }
            >
              <FormLabel fontbold htmlFor="contact_number" intent="secondary">
                Contact Number
              </FormLabel>
              <FormField
                fieldtype="text"
                name="contact_number"
                fullWidth
                onChange={handleChange}
                placeholder="Enter contact number..."
                intent={
                  touched.contact_number ||
                  errors.contact_number ||
                  apiErrors.contact_number
                    ? "error"
                    : "default"
                }
                errorMessage={
                  errors.contact_number ||
                  getErrorMessageForField("contact_number", apiErrors)
                }
              />
            </FormGroup>

            <div className="flex space-x-10">
              {/* Birthdate */}
              <FormGroup
                intent={
                  touched.birthdate || errors.birthdate ? "error" : "default"
                }
              >
                <FormLabel fontbold htmlFor="birthdate" intent="secondary">
                  Birthdate
                </FormLabel>

                <FormField
                  fieldtype="date"
                  name="birthdate"
                  fullWidth
                  value=""
                  onChange={handleChange}
                  placeholder="Enter birthdate..."
                  intent={
                    touched?.birthdate ||
                    errors.birthdate ||
                    apiErrors?.birthdate
                      ? "error"
                      : "default"
                  }
                  errorMessage={
                    errors.birthdate ||
                    getErrorMessageForField("birthdate", apiErrors)
                  }
                />
              </FormGroup>
              {/* Gender */}
              <FormGroup
                intent={
                  touched.gender || errors.gender || apiErrors.gender
                    ? "error"
                    : "default"
                }
              >
                <FormLabel fontbold htmlFor="gender" intent="secondary">
                  Gender
                </FormLabel>
                <SelectField
                  onChange={handleChange}
                  name="gender"
                  fullWidth
                  value={values.gender}
                  intent={
                    touched?.gender || errors.gender || apiErrors?.gender
                      ? "error"
                      : "default"
                  }
                  errorMessage={
                    errors.gender ||
                    getErrorMessageForField("gender", apiErrors)
                  }
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  {Object.keys(GenderEnum).map((key) => (
                    <option key={key} value={GenderEnum[key]}>
                      {getGenderLabel(GenderEnum[key])}
                    </option>
                  ))}
                </SelectField>
              </FormGroup>
            </div>

            {/* Error message */}
            {isError && (
              <div className="my-2 text-red-500">
                Failed to submit patient data
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-between mt-4 modal-button">
              <Button
                buttontype="button"
                intent="cancel"
                label="Cancel"
                onClick={onClose}
              />
              <Button
                  buttontype="submit"
                  intent="add"
                  label="Save Details"
                  isLoading={isSubmitting}
                  size="lg"
                  disabled={
                    isSubmitting ||
                    Object.keys(values).some((key) => !values[key])
                  }
                />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PatientFormModal;
