"use client";

import Button from "@/app/components/core/button/button";
import Table from "@/app/components/core/table/table";
import Filter from "@/app/components/core/filters/Filter";
import Pagination from "@/app/components/core/main/pagination";
import Modal from "@/app/components/core/main/modal";
import Alert from "@/app/components/core/alert/alert";
import { fetchPatients, addPatient } from "@/app/api/index";
import { ERROR_MESSAGES } from "@/_shared/constants/errors/error-messages";

import {
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Metadata, NextPage } from "next";
import PatientFormModal from "@/app/components/custom/patient/patient-form-modal";
import { ERRORS } from "@/_shared/constants/errors/error-messages";

interface Props {}

export const metadata: Metadata = {
  title: "Patients",
};

const Patients: NextPage<Props> = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [alertType, setAlertType] = useState<
    "default" | "success" | "warning" | "error"
  >("default");
  const [alertMessage, setAlertMessage] = useState<string>("");

  const showAlert = (
    alertType: "default" | "success" | "warning" | "error",
    message: string
  ) => {
    setAlertMessage(message);
    setAlertType(alertType);
    setIsError(true);
  };

  const hideAlert = () => {
    setAlertMessage("");
    setIsError(false);
  };

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy] = useState("id");
  const [sortOrder] = useState("desc");
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 5; // You can adjust this value according to your preference

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const headers = [
    "ID",
    "patient_name",
    "dentist_name",
    "last_visit",
    "last_service",
    "contact_number",
  ];
  const sortableColumns = [
    "ID",
    "patient_name",
    "last_visit",
    "dentist_name",
    "last_service",
    "contact_number",
  ];
  const options1 = [
    { value: "option1a", label: "Option 1A" },
    { value: "option1b", label: "Option 1B" },
  ];

  const options2 = [
    { value: "option2a", label: "Option 2A" },
    { value: "option2b", label: "Option 2B" },
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

  const handleSubmit = async (values: any) => {
    try {
      const response = await addPatient(values);
      const jsonResponse = await response?.json();

      if (
        !jsonResponse.success &&
        jsonResponse.errorCode === ERRORS.validationError
      ) {
        // handle validation errors
        setValidationErrors(jsonResponse.errors);
        console.log(jsonResponse.errors);
      } else {
        // setData([jsonResponse.data, ...data]);
        await setCurrentPage(1);
        await getList();
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.error("Error submitting patient data:", error);
      showAlert("error", ERROR_MESSAGES[error?.errorCode]);
    }
  };

  const getList = async () => {
    try {
      setLoading(true);

      const response = await fetchPatients({
        sortBy,
        sortOrder,
        page: currentPage,
        pageSize: itemsPerPage,
      });

      const json = await response.json();

      if (!json.success) {
        showAlert("error", ERROR_MESSAGES[json?.errorCode]);
      }

      setData(json?.data);
      setTotalItems(json?.totalCount);
    } catch (error: any) {
      // console.log(error)
      showAlert("error", ERROR_MESSAGES[error?.errorCode]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [currentPage]);

  return (
    <div className="flex h-[calc(100vh-70px)] w-screen flex-col gap-11 overflow-y-auto bg-secondary-50 p-6 sm:w-full">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center">
          <UserPlusIcon
            className="h-7 w-7 mr-2 text-blue-400"
            style={{ fill: "#29557b" }}
          />
          <h1 className="text-xl font-semibold main-names">Patients</h1>
        </div>
        <Button
          buttontype="button"
          intent="add"
          label="ADD NEW PATIENT"
          leftIcon
          size="md"
          onClick={handleOpenModal}
        >
          <PlusIcon />
        </Button>
      </div>

      {/* filter fields */}
      <Filter
        options={[options1, options2]}
        optionsPlaceholder={["Assigned Dentist", "Last Visit"]}
      />

      {isModalOpen && (
        <Modal onClose={handleCloseModal} title="Add Patient">
          <PatientFormModal
            onSubmit={handleSubmit}
            onClose={handleCloseModal}
            apiErrors={validationErrors}
          />
        </Modal>
      )}
      <div className="my-2" hidden={!isError}>
        <Alert intent="inline" showalert={isError} type={alertType}>
          {alertMessage}
        </Alert>
      </div>
      {data.length > 0 && (
        <Table
          customColumn="ACTIONS"
          items={data}
          headers={headers}
          sortableColumns={sortableColumns}
        >
          {(item, index) => (
            <>
              <PencilSquareIcon
                className="relative h-6 w-6 action-icons"
                onClick={() =>
                  console.log(
                    `PencilSquareIcon clicked for item ${index + 1}: ${item.id}`
                  )
                }
              />
              <TrashIcon className="relative h-6 w-6 action-icons" />
            </>
          )}
        </Table>
      )}
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default Patients;
