'use client';

import Button from '@/app/components/core/button/button';
import Card from '@/app/components/core/card/card';
import CheckBox from '@/app/components/core/checkbox/checkbox';
import SideNav from '@/app/components/core/nav/side-nav/side-nav';
import TopNav from '@/app/components/core/nav/top-nav/top-nav';
import Table from '@/app/components/core/table/table';
import TextArea from '@/app/components/core/textarea/textarea';
import TextField from '@/app/components/core/textfield/textfield';
import SelectField from '@/app/components/core/select/selectField';
import Filter from '@/app/components/core/filters/Filter';
import  Pagination from '@/app/components/core/main/pagination'
import Modal from '@/app/components/core/main/modal';
import {
  BellIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  ArrowUpOnSquareIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import React, {useState, useEffect} from 'react';
import { Metadata, NextPage } from 'next';
import PatientFormModal from '@/app/components/custom/patient/patient-form-modal';
import { ERRORS } from "@/_shared/constants/errors/error-messages";

interface Props {}

export const metadata: Metadata = {
    title: 'Patients',
};
  
const Patients: NextPage<Props> = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy] = useState("id");
  const [sortOrder] = useState("desc");
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // You can adjust this value according to your preference

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const headers = ['ID', 'patient_name', 'dentist_name', 'last_visit', 'last_service', 'contact_number'];
  const sortableColumns = ['ID', 'patient_name', 'last_visit', 'dentist_name', 'last_service', 'contact_number'];
  const options1 = [
    { value: 'option1a', label: 'Option 1A' },
    { value: 'option1b', label: 'Option 1B' },
  ];

  const options2 = [
    { value: 'option2a', label: 'Option 2A' },
    { value: 'option2b', label: 'Option 2B' },
  ];

  const handlePageChange = async (pageNumber) => {
    await setCurrentPage(pageNumber);
    // await getList()
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

 const handleSubmit = async (values) => {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const jsonResponse = await response.json();
      if (!jsonResponse.success && jsonResponse.errorCode === ERRORS.validationError) {
        // handle validation errors
        setValidationErrors(jsonResponse.errors);
        console.log(jsonResponse.errors)
      } else {
        // setData([jsonResponse.data, ...data]);
        await setCurrentPage(1);
        await getList()
        setIsModalOpen(false);
      }
      
    } catch (error) {
        console.error('Error submitting patient data:', error);
        throw new Error('Failed to submit patient data');
    }
  };

  const getList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize: itemsPerPage,
      });
      const url = `/api/patients?${params.toString()}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setData(json?.data);
      setTotalItems(json?.totalCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setLoading(false);
      // Handle error
    }
  };

   useEffect(()=>{
    getList();
   },[currentPage]);
   
    return(
      <div className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full'>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center'>
            <UserPlusIcon className='h-7 w-7 mr-2 text-blue-400' style={{ fill: '#29557b' }}  />
            <h1 className='text-xl font-semibold main-names'>Patients</h1>
          </div>
          <Button
            buttontype='button'
            intent='add'
            label='ADD NEW PATIENT'
            leftIcon
            size='md'
            onClick={handleOpenModal}
          >
            <PlusIcon />
          </Button>
        </div>
        
      {/* filter fields */}
      <Filter options={[options1, options2]} optionsPlaceholder={["Assigned Dentist", "Last Visit"]} />
     
     
      {isModalOpen && (
       <Modal onClose={handleCloseModal} title="Add Patient" >
         <PatientFormModal onSubmit={handleSubmit} onClose={handleCloseModal} apiErrors={validationErrors} />
       </Modal>
      )}
      {data.length > 0 && 
        
        <Table
          customColumn='ACTIONS'
          items={data}
          headers={headers}
          sortableColumns={sortableColumns}
        >
          {(item, index) => (
            <>
              <PencilSquareIcon
                className='relative h-6 w-6'
                onClick={() =>
                  console.log(
                    `PencilSquareIcon clicked for item ${index + 1}: ${
                      item.id
                    }`
                  )
                }
              />
              <TrashIcon
                className='relative h-6 w-6'
              />
            </>
          )}
        </Table>}
        {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        />
)}
      </div>
    )
}
export default Patients;