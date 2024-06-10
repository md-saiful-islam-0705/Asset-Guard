
import { Helmet } from "react-helmet-async";
import PackageSection from "./PackageSection";

const AddEmployee = () => {
  
  return (
    
    <div className="container mx-auto mt-8">
      <Helmet>
            <title>
                Add Employee
            </title>
        </Helmet>
      <PackageSection />
    </div>
  );
};

export default AddEmployee;
