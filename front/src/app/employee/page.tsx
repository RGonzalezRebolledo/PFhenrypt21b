import EmployeeForm from "@/components/EmployeeForm/EmployeeForm";
import ProtectedAdmin from "@/components/ProtectedAdmin/page";


const employeePage = () => {
  
  return (


    <ProtectedAdmin>
      <div>
        <EmployeeForm />
      </div>
    </ProtectedAdmin>

  );
};

export default employeePage;
