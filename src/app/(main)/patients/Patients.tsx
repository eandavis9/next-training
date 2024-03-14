'use client';

import Button from '@/app/components/core/button/button';
import Card from '@/app/components/core/card/card';
import CheckBox from '@/app/components/core/checkbox/checkbox';
import SideNav from '@/app/components/core/nav/side-nav/side-nav';
import TopNav from '@/app/components/core/nav/top-nav/top-nav';
import Table from '@/app/components/core/table/table';
import TextArea from '@/app/components/core/textarea/textarea';
import TextField from '@/app/components/core/textfield/textfield';
import  Pagination from '@/app/components/core/main/pagination'
import Modal from '@/app/components/core/main/modal';
import {
  BellIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
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
  const [sortBy] = useState("created_at");
  const [sortOrder] = useState("desc");
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // You can adjust this value according to your preference

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const headers = ['ID', 'patient_name', 'dentist_name', 'last_visit', 'last_service', 'contact_number'];
  const sortableColumns = ['ID', 'patient_name', 'last_visit', 'dentist_name', 'last_service', 'contact_number'];

  const handlePageChange = async (pageNumber) => {
    setCurrentPage(pageNumber);
    await getList()
    
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
        setData([jsonResponse.data, ...data]);
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
      // Handle error
    }
  };

   useEffect(()=>{
    getList();
   }, []);
   /* make this a table component */
    return(
      <div className='flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full'>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center'>
            <UserPlusIcon className='h-6 w-6 mr-2' />
            <h1 className='text-xl font-semibold'>Patients</h1>
          </div>
          <Button
            buttontype='button'
            intent='add'
            label='Add Patient'
            leftIcon
            size='md'
            onClick={handleOpenModal}
          >
            <PlusIcon />
          </Button>
        </div>
        
      {/* filter fields */}
      {isModalOpen && (
       <Modal onClose={handleCloseModal} title="Add Patient" >
         <PatientFormModal onSubmit={handleSubmit} apiErrors={validationErrors} />
       </Modal>
      )}
      <div className="flex flex-col gap-y-4 rounded-lg border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">{data.length > 0 && 
        
        <Table
          customColumn='Actions'
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
        </Table>}</div>
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