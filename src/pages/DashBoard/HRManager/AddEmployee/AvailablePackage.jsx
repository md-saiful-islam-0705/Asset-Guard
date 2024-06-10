import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const AvailablePackage = () => {
  const navigate = useNavigate();

  const handlePurchase = (members, price) => {
    navigate('/dashboard/payment', { state: { selectedPackage: { members, price } } });
  };

  return (
    <Card className="mt-4 w-full border border-blue-100">
      <CardBody>
        <Typography color="blue-gray" className="font-bold text-blue-500 mb-3">
          Available Packages
        </Typography>
        <div className="flex flex-col space-y-4">
          <Button color="blue" onClick={() => handlePurchase(5, 5)}>
            5 members for $5
          </Button>
          <Button color="blue" onClick={() => handlePurchase(10, 8)}>
            10 members for $8
          </Button>
          <Button color="blue" onClick={() => handlePurchase(20, 15)}>
            20 members for $15
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default AvailablePackage;
