import { useState, useEffect } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';

const tableVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

interface TableProps<T> extends VariantProps<typeof tableVariants> {
  items: T[];
  headers: string[]; // Array of dynamic headers
  sortableColumns?: string[]; // Specify which columns should be sortable
  customColumn?: string;
  children?: (item: T, index: number) => ReactNode;
}

const Table: React.FC<TableProps<any>> = ({
  items,
  headers,
  sortableColumns = [],
  customColumn,
  children,
  ...props
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    // Set default sort column and order
    if (sortableColumns.length > 0) {
      setSortColumn(sortableColumns[0]);
      setSortOrder('desc');
    }
  }, [sortableColumns]);

  const handleSort = (column: string) => {
    if (sortableColumns.includes(column)) {
      if (sortColumn === column) {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortOrder('asc');
      }
    }
  };
  
  const sortedItems = sortColumn
  ? items.slice().sort((a, b) => {
      const aValue = extractNumberFromString(a[sortColumn].toString());
      const bValue = extractNumberFromString(b[sortColumn].toString());
      
      // console.log('aValue:', aValue);
      // console.log('bValue:', bValue);
      
      // If both values are blank, consider them equal
      if (aValue === '' && bValue === '') return 0;
      
      // If one value is blank, prioritize it to be at the top
      if (aValue === '') return sortOrder === 'asc' ? -1 : 1;
      if (bValue === '') return sortOrder === 'asc' ? 1 : -1;
      
      // If both values are non-numeric, compare them as strings
      if (isNaN(aValue) && isNaN(bValue)) {
        return sortOrder === 'asc'
          ? a[sortColumn].toString().localeCompare(b[sortColumn].toString())
          : b[sortColumn].toString().localeCompare(a[sortColumn].toString());
      }
      
      // Otherwise, compare numeric values
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    })
  : [...items];

  function extractNumberFromString(str) {
    const numberRegex = /(\d+)/;
    const matches = str.match(numberRegex);
    return matches ? parseInt(matches[0]) : NaN;
  }

  return (
    <div className='overflow-x-auto rounded-lg border border-gray-150'>
      <table className='h-fit w-full border-collapse rounded-md bg-secondary-white shadow-md'>
        <thead>
          <tr className="text-gray-400">
            {headers.map((header, index) => (
              <th
                key={index}
                className={`px-4 py-4 text-left text-base font-bold text-secondary-400 cursor-pointer ${
                  sortableColumns.includes(header) ? 'hover:text-primary' : ''
                }`}
                onClick={() => handleSort(header)}
              >
                <div className='flex items-center'>
                  <span>{camelCaseToWords(header)}</span>
                  {sortColumn === header && (
                    <span className='ml-1'>
                      {sortOrder === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {!!children && !!customColumn && (
              <th className='px-4 py-4 text-left text-base font-bold text-secondary-400'>
                 <span className='ml-1'>{customColumn}</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedItems.map((item, itemIndex) => (
            <tr key={itemIndex} className='odd:bg-white even:bg-slate-50'>
              {headers.map((key, keyIndex) => (
                <td
                  key={keyIndex}
                  className={`border-b border-secondary-100 px-4 py-4 text-base ${keyIndex === 0 ? 'main-names' : ''}`}
                >
                  {item[key]}
                </td>
              ))}
              {!!children && !!customColumn && (
                <td className='border-b border-secondary-100 px-4 py-4 text-base'>
                  <div className='inline-flex h-9 items-center justify-start gap-2.5'>
                    {children(item, itemIndex)}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

// TODO: put somewhere else for reusability
function camelCaseToWords(input: string): string {
  const words = input.replace(/_/g, ' ').split(' ');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' ').toUpperCase();
}