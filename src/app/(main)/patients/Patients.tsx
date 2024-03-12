'use client';

import Button from '@/app/components/core/button/button';
import Card from '@/app/components/core/card/card';
import CheckBox from '@/app/components/core/checkbox/checkbox';
import SideNav from '@/app/components/core/nav/side-nav/side-nav';
import TopNav from '@/app/components/core/nav/top-nav/top-nav';
import Table from '@/app/components/core/table/table';
import TextArea from '@/app/components/core/textarea/textarea';
import TextField from '@/app/components/core/textfield/textfield';
import PatientFormModal from '@/app/components/custom/patient/patient-form-modal';
import {
  BellIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  Squares2X2Icon,
  UserIcon,
} from '@heroicons/react/24/outline';
import React, {useState, useEffect} from 'react';
import { Metadata, NextPage } from 'next';

interface Props {}

export const metadata: Metadata = {
    title: 'Patients',
};
  
const Patients: NextPage<Props> = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to submit patient data');
      }
      const newData = await response.json();
      // add to the array
      setData([newData.data, ...data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting patient data:', error);
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

   useEffect(()=>{
    const getList = async()=>{
        const response = await fetch(`/api/patients`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setData(json?.data);
        setLoading(false);
    };
    getList();
   }, []);
   /* make this a table component */
    return(
      <div className='min-height-screen relative flex'>
        <SideNav
        items={[
          {
            label: 'Dashboard',
            children: <Squares2X2Icon></Squares2X2Icon>,
            selected: true,
          },
          {
            label: 'Patients',
            children: <UserIcon></UserIcon>,
          },
          {
            label: 'Calendar',
            children: <Cog6ToothIcon></Cog6ToothIcon>,
          },
          {
            label: 'Dentists',
            children: <UserIcon></UserIcon>,
          },
          {
            label: 'Staff',
            children: <UserIcon></UserIcon>,
          },
          {
            label: 'Settings',
            children: <Cog6ToothIcon></Cog6ToothIcon>,
          },
        ]}
        logoPath={'images/img-logo-colored.svg'}
      />

        <Button
          fullWidth
          buttontype='button'
          intent='primary'
          label='Add Patient'
          size='lg'
          onClick={handleOpenModal}
        ></Button>

        {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Add Patient</h2>
            <PatientFormModal onClose={handleCloseModal} onSubmit={handleSubmit} />
          </div>
        </div>
        )}
         
        <h1>List of Items</h1> 
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.first_name}</li>
          ))}
        </ul>
      </div>
    )
}

export default Patients;