import EmployeeList from "@/components/EmployeeForm/EmployeeList";
import React from "react";
import ProtectedAdmin from "@/components/ProtectedAdmin/page";
const page = () => {
  return (
    <>
      {/* <ProtectedAdmin> */}
        <EmployeeList />
      {/* </ProtectedAdmin> */}
    </>
  );
};

export default page;
