import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import axios from 'axios';

const AvailablePackage = () => {
  const handlePurchase = async (members, price) => {
    const response = await axios.post('/packages/purchase', { members, price });
    if (response.data.success) {
      window.location.href = '/';
    }
  };

  return (
    <Card className="mt-4 w-full border border-yellow-100">
      <CardBody>
        <Typography color="blue-gray" className="font-bold text-yellow-500 mb-3">
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
