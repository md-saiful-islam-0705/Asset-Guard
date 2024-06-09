import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import PackageSection from './PackageSection';


const AddEmployee = () => {
  const axiosSecure = useAxiosSecure()
  const handleAddSelectedMembers = async (selectedMembers) => {
  
      const response = await axiosSecure.put('/employees/add-to-team', { members: selectedMembers });
      if (response.data.success) {
        alert('Selected members have been successfully added to the team!');
      } else {
        alert('Failed to add selected members to the team.');
      }
  };
  return (
    <div className="container mx-auto mt-8">
      <PackageSection onAddSelectedMembers={handleAddSelectedMembers} />
      
    </div>
  );
};

export default AddEmployee;
