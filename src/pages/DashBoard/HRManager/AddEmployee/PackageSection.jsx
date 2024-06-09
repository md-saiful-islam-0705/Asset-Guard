import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PackageSection = () => {
  const [packageLimit, setPackageLimit] = useState(5);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const axiosSecure = useAxiosSecure();

  const { data: employees = [], refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/team/employee");
      return res.data;
    },
  });

  const { data: members = [] } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/team/members/total");
      return res.data;
    },
  });

  const handleAddToTeam = async (employeeId) => {
    await axiosSecure.put(`/employee/add-to-team/${employeeId}`);
    refetch().then(() => {
      setPackageLimit((prevLimit) => prevLimit + 1);
      console.log("Package limit updated");
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Employee added to the team successfully!",
      });
      console.log("SweetAlert triggered");
    });
  };

  const handleAddSelectedMembers = async () => {
    if (selectedMembers.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No members selected",
        text: "Please select at least one member to add to the team!",
      });
      return;
    }
    await axiosSecure.put("/employees/add-to-team", {
      selectedMembers: selectedMembers,
    });
    setPackageLimit((prevLimit) => prevLimit + selectedMembers.length);
    refetch();
    setSelectedMembers([]);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Selected members added to the team successfully!",
    });
  };

  const handleCheckboxChange = (employeeId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  return (
    <Card className="mt-4 w-full border border-blue-100">
      <CardBody>
        <Typography color="blue-gray" className="font-bold text-blue-500 mb-3">
          Package Section
        </Typography>
        <div className="flex justify-between items-center mb-4">
          <Typography>Non Affiliated Employee: {employees.length}</Typography>
          {members ? (
            <Typography className="font-bold">
              Team Members: <span>{members.length}</span>{" "}
            </Typography>
          ) : null}
          <Typography>Package Limit: {packageLimit}</Typography>
        </div>

        <div className="mt-4">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="flex items-center justify-between mb-2"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={selectedMembers.includes(employee._id)}
                onChange={() => handleCheckboxChange(employee._id)}
              />
              <img
                src={employee.photoURL}
                alt={employee.displayName}
                className="w-10 h-10 rounded-full mr-2"
              />
              <Typography className="flex-grow">
                {employee.displayName}
              </Typography>
              <Button
                color="green"
                onClick={() => handleAddToTeam(employee._id)}
              >
                Add to the team
              </Button>
            </div>
          ))}
        </div>
        <Button
          color="green"
          onClick={handleAddSelectedMembers}
          className="mt-4"
        >
          Add Selected Members to the Team
        </Button>
      </CardBody>
    </Card>
  );
};

export default PackageSection;
