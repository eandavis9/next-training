'use client';
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
   });
   /* make this a table component */
    return(
      <div>
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