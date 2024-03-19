import { useState, useEffect } from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ReactNode } from 'react';
import { sortItemsByColumn } from '@/_shared/utils/sort'
import Spinner from '../spinner/spinner';

const tableVariants = cva('', {
  variants: {},
  defaultVariants: {},
});

interface TableProps<T> extends VariantProps<typeof tableVariants> {
  items: T[];
  isLoading?: boolean;
  headers: string[]; // Array of dynamic headers
  sortableColumns?: string[]; // Specify which columns should be sortable
  customColumn?: string;
  children?: (item: T, index: number) => ReactNode;
}

const Table: React.FC<TableProps<any>> = ({
  items,
  headers,
  isLoading = false,
  sortableColumns = [],
  customColumn,
  children,
  ...props
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const tableHeight = 56 * items.length + 2; // 56px per row + 2px border
  useEffect(() => {
    // Set default sort column and order
    if (sortableColumns.length > 0) {
      setSortColumn(sortableColumns[0]);
      setSortOrder('asc');
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
  
  const sortedItems = sortItemsByColumn(items, sortColumn, sortOrder);

  return (
    <div className='overflow-hidden rounded-lg border border-gray-150'>
      <div className='flex justify-center items-center'>
        {isLoading && (
          <div className='relative flex h-12 w-12'>
            <Spinner nolabel size='lg' />
          </div>
        )}
      </div>
      {!isLoading && 
        <div className="table-container h-full overflow-y-auto">
          <table className='w-full border-collapse rounded-md bg-secondary-white shadow-md'>
            <thead className='sticky top-0 z-10 bg-white'>
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
      }
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