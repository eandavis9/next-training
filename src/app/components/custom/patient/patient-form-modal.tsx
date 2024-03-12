import React, { useState } from 'react';
import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import { Form, Formik } from 'formik';
import Button from '@/app/components/core/button/button';
import FormField from '@/app/components/core/forms/form-fields/form-field';
import FormGroup from '@/app/components/core/forms/form-group/form-group';
import FormLabel from '@/app/components/core/forms/form-label/form-label';
import Select from '@/app/components/core/select/select';
import * as Yup from 'yup';

const PatientFormModal: React.FC<{ onSubmit: (values: any, helpers: any) => void, onClose: () => void }> = ({ onSubmit, onClose }) => {
  const [isError, setIsError] = useState(false);

  const loginFormInitialValue = {
    first_name: '',
    last_name: '',
    address: '',
    email_address: '',
    birthdate: '',
    gender: '',
    contact_number: ''
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    email_address: Yup.string().email('Invalid email address').required('Email Address is required'),
    birthdate: Yup.date().required('Birthdate is required'),
    gender: Yup.string().required('Gender is required'),
    contact_number: Yup.string().required('Contact Number is required'),
  });


  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      // Call the onSubmit function passed as a prop
      await onSubmit(values, { setSubmitting });
    } catch (error) {
      // Handle error
      console.error('Error submitting patient data:', error);
      setIsError(true); // Set isError to true to show the error message
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Close button */}
        <span className="close">&times;</span>
        {/* Modal title */}
        <h2>Add Patient</h2>
        {/* Patient form */}
        <Formik
          initialValues={loginFormInitialValue}
          validationSchema={validationSchema}
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
            {/* First Name */}
            <FormGroup intent={touched.first_name && errors.first_name ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='first_name' intent='secondary'>
                First Name
              </FormLabel>
              <FormField
                fieldtype='text'
                name='first_name'
                
                onChange={handleChange}
                placeholder='Enter first name...'
                intent={touched.first_name && errors.first_name ? 'error' : 'default'}
                errorMessage={errors.first_name && touched.first_name ? errors.first_name : ''}
              />
            </FormGroup>

            {/* Last Name */}
            <FormGroup intent={touched.last_name && errors.last_name ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='last_name' intent='secondary'>
                Last Name
              </FormLabel>
              <FormField
                fieldtype='text'
                name='last_name'
               
                onChange={handleChange}
                placeholder='Enter last name...'
                intent={touched.last_name && errors.last_name ? 'error' : 'default'}
                errorMessage={errors.last_name && touched.last_name ? errors.last_name : ''}
              />
            </FormGroup>

            {/* Address */}
            <FormGroup intent={touched.address && errors.address ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='address' intent='secondary'>
                Address
              </FormLabel>
              <FormField
                fieldtype='text'
                name='address'
               
                onChange={handleChange}
                placeholder='Enter address...'
                intent={touched.address && errors.address ? 'error' : 'default'}
                errorMessage={errors.address && touched.address ? errors.address : ''}
              />
            </FormGroup>

            {/* Email Address */}
            <FormGroup intent={touched.email_address && errors.email_address ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='email_address' intent='secondary'>
                Email Address
              </FormLabel>
              <FormField
                fieldtype='email'
                name='email_address'
              
                onChange={handleChange}
                placeholder='Enter email address...'
                intent={touched.email_address && errors.email_address ? 'error' : 'default'}
                errorMessage={errors.email_address && touched.email_address ? errors.email_address : ''}
              />
            </FormGroup>

            {/* Birthdate */}
            <FormGroup intent={touched.birthdate && errors.birthdate ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='birthdate' intent='secondary'>
                Birthdate
              </FormLabel>
              <FormField
                fieldtype='date'
                name='birthdate'
              
                onChange={handleChange}
                placeholder='Enter birthdate...'
                intent={touched.birthdate && errors.birthdate ? 'error' : 'default'}
                errorMessage={errors.birthdate && touched.birthdate ? errors.birthdate : ''}
              />
            </FormGroup>

            {/* Gender */}
            <FormGroup intent={touched.gender && errors.gender ? 'error' : 'default'}>
                <FormLabel fontbold htmlFor='gender' intent='secondary'>
                  Gender
                </FormLabel>
                <select
                  name='gender'
                  value={values.gender}
                  onChange={handleChange}
                  className={`border ${
                    touched.gender && errors.gender ? 'border-red-500' : ''
                  }`}
                >
                  <option value='' disabled>
                    Select Gender
                  </option>
                  <option value='m'>Male</option>
                  <option value='f'>Female</option>
                </select>
                {errors.gender && touched.gender && (
                  <div className="text-red-500">{errors.gender}</div>
                )}
              </FormGroup>

            {/* Contact Number */}
            <FormGroup intent={touched.contact_number && errors.contact_number ? 'error' : 'default'}>
              <FormLabel fontbold htmlFor='contact_number' intent='secondary'>
                Contact Number
              </FormLabel>
              <FormField
                fieldtype='text'
                name='contact_number'
                onChange={handleChange}
                placeholder='Enter contact number...'
                intent={touched.contact_number && errors.contact_number ? 'error' : 'default'}
                errorMessage={errors.contact_number && touched.contact_number ? errors.contact_number : ''}
              />
            </FormGroup>

            {/* Error message */}
            {isError && <div className='my-2 text-red-500'>Failed to submit patient data</div>}

            {/* Submit Button */}
            <Button
              buttontype='submit'
              isLoading={isSubmitting}
              intent='primary'
              label='Submit'
              size='lg'
              fullWidth
            ></Button>
          </Form>   
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PatientFormModal;