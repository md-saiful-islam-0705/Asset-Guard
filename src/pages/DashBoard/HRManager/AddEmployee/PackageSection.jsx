import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const PackageSection = () => {
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
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/package");
      return res.data;
    },
  });

  const handleAddToTeam = async (employeeId) => {
    await axiosSecure.put(`/employee/add-to-team/${employeeId}`);
    refetch().then(() => {
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
  const getLargestPackage = (packages) => {
    const largestPackage = packages.reduce((prev, current) =>
      prev.packageMembers > current.packageMembers ? prev : current
    );
    return largestPackage;
  };

  return (
    <div>
      <Card className=" w-full border border-purple-100">
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography
              color="blue-gray"
              className="font-bold mb-2 text-purple-500 "
            >
              Package Section
            </Typography>
          </div>

          <div className="flex justify-between lg:flex-row flex-col items-center border border-purple-50 p-1 rounded-xl">
            {packages.length > 0 && (
              <Typography className="font-bold text-purple-300 text-2xl">
                Package Limit: {getLargestPackage(packages).packageMembers}{" "}
                Members
              </Typography>
            )}
            <Link to="/dashboard/available-package">
              <Button color="purple" variant="outlined" className="mt-4">
                Increase Package Limit
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>
      <Card className="mt-4 w-full border border-blue-100">
        <CardBody>
          <Typography
            color="blue-gray"
            className="font-bold text-blue-500 mb-3"
          >
            Non Affiliated
          </Typography>
          <div className="flex justify-between lg:flex-row flex-col items-center mb-4">
            <Typography className="font-bold">Non Affiliated Employee: {employees.length}</Typography>
            {members ? (
              <Typography className="font-bold">
                Team Members: <span>{members.length}</span>{" "}
              </Typography>
            ) : null}
          </div>

          <div className="mt-4">
            {employees.map((employee) => (
              <div
                key={employee._id}
                className="flex items-center lg:flex-row flex-col gap-2 justify-between mb-2 border border-blue-50 p-2 rounded-xl"
              >
                <div className="flex items-center">
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
                  <Typography className="flex-grow font-semibold text-gray-600">
                    {employee.displayName}
                  </Typography>
                </div>
                <Button
                  color="blue"
                  variant="outlined"
                  onClick={() => handleAddToTeam(employee._id)}
                >
                  Add to the team
                </Button>
              </div>
            ))}
          </div>
          <Button
            color="blue"
            variant="outlined"
            onClick={handleAddSelectedMembers}
            className="mt-4"
          >
            Add Selected Members to the Team
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default PackageSection;
