export const getErrorMessageForField = (fieldName, apiErrors) => {
  const error = apiErrors.find((error) => error.field === fieldName);
  return error ? <div key={fieldName} className="text-red-500">{error.message}</div> : null;
};