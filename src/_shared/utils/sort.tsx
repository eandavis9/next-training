import moment from 'moment';

export const extractNumberFromString = (str: string) => {
    const numberRegex = /(\d+)/;
    const matches = str.match(numberRegex);
    return matches ? parseInt(matches[0]) : NaN;
};

export const sortItemsByColumn = (items: any, sortColumn: any, sortOrder: any) => {
    return sortColumn
        ?   items.slice().sort((a, b) => {
                let aValue;
                let bValue;

                // Handle sorting by date
                if (moment.isMoment(a[sortColumn]) && moment.isMoment(b[sortColumn])) {
                    aValue = a[sortColumn];
                    bValue = b[sortColumn];
                } else {
                    aValue = extractNumberFromString(String(a[sortColumn]));
                    bValue = extractNumberFromString(String(b[sortColumn]));
                }

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
};