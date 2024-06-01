

const Package = () => {
  return (
    <div className="py-8 text-center border px-2 rounded-xl ">
      <h2 className="text-2xl font-bold mb-4">Packages</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 gap-4 items-center justify-center ">
        <div className="p-6 shadow rounded-lg bg-gradient-to-r from-blue-100 to-blue-200">
          <h3 className="text-lg font-semibold mb-2">5 Employees</h3>
          <p className="text-gray-700">$5 per month</p>
          <p className="text-gray-700">Ideal for small teams</p>
        </div>
        <div className="p-6 shadow rounded-lg bg-gradient-to-r from-pink-100 to-pink-200">
          <h3 className="text-lg font-semibold mb-2">10 Employees</h3>
          <p className="text-gray-700">$8 per month</p>
          <p className="text-gray-700">Suitable for medium-sized teams</p>
        </div>
        <div className="p-6 shadow rounded-lg bg-gradient-to-r from-yellow-100 to-yellow-200">
          <h3 className="text-lg font-semibold mb-2">20 Employees</h3>
          <p className="text-gray-700">$15 per month</p>
          <p className="text-gray-700">Great value for large teams</p>
        </div>
      </div>
    </div>
  );
};

export default Package;
