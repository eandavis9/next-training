
import React, { ChangeEvent } from 'react';
import { ArrowUpOnSquareIcon } from '@heroicons/react/24/outline'; 
import SearchBar from '../search-bar/search-bar';
import Button from '../button/button';
import SelectField from '../select/selectField';
import { LeftIcon } from '../search-bar/search-bar.stories';

interface Option {
  id?: Number,
  value: string;
  label: string;
}

interface Props {
  options: Option[][];
  optionsPlaceholder?: string[],
  onSearch?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onExport?: () => void;
}

const Filter: React.FC<Props> = ({ options, optionsPlaceholder, onSearch, onExport }) => {
  return (
    <div className="flex items-center justify-between p-4">
        
      <div className="flex items-center">
          <div className="mr-10">
            <span className="mr-2"><b>Filter By:</b> </span>
            {options.map((selectOptions, index) => (
                <select key={index} className="p-2 border rounded-md mr-2 select-wrapper" onChange={onSearch}>
                    <option className='text-gray-400' value="">{optionsPlaceholder ? optionsPlaceholder[index] : 'Select Option'}</option>
                    {selectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </select>
            ))}
            </div>
        </div>
    
        <div className="flex items-center search-export">
            <div className="mr-4">
              <SearchBar fullWidth leftIcon={true} label='' value='Search' onChange={onSearch} />
            </div>
            <Button buttontype='button' label='Export'  intent='secondary' size='md' lefticon={`${true}`} > 
                <ArrowUpOnSquareIcon className="w-5 h-5 mr-1" /> 
            </Button>
          
        </div>
      </div>
   );
};

export default Filter;