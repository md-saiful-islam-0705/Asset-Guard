import { Link } from 'react-router-dom';
import defaultCompanyLogo from '../../../public/logo-01.avif';
import { FaHome, FaBox, FaPlus, FaList, FaUsers, FaUserCircle, FaSignOutAlt, FaArrowRight } from 'react-icons/fa';

const HRDashboard = ({ user, logOut, hrData }) => {
    const companyLogoUrl = hrData.companyLogo || defaultCompanyLogo;
    const companyName = hrData.companyName;

    return (
        <div className="flex h-screen">
            <aside className="bg-gray-500 text-white w-64 p-5 flex flex-col">
                <img src={companyLogoUrl} alt="Company Logo" className="w-full h-16 mb-5 object-contain" />
                <p className="text-center mb-4 text-2xl">{companyName}</p>
                <ul className="space-y-4">
                    <li><Link to="/dashboard/hr-home" className="flex items-center py-2"><FaHome className="mr-2" /> Home</Link></li>
                    <li><Link to="/dashboard/asset-list" className="flex items-center py-2"><FaBox className="mr-2" /> Asset List</Link></li>
                    <li><Link to="/dashboard/add-asset" className="flex items-center py-2"><FaPlus className="mr-2" /> Add an Asset</Link></li>
                    <li><Link to="/dashboard/all-requests" className="flex items-center py-2"><FaList className="mr-2" /> All Requests</Link></li>
                    <li><Link to="/dashboard/employee-list" className="flex items-center py-2"><FaUsers className="mr-2" /> Employee List</Link></li>
                    <li><Link to="/dashboard/add-employee" className="flex items-center py-2"><FaUserCircle className="mr-2" /> Add an Employee</Link></li>
                    <li><Link to="/dashboard/profile" className="flex items-center py-2"><FaUserCircle className="mr-2" /> Profile</Link></li>
                </ul>
                <div className="divider "></div>
                <Link to="/" className="flex items-center py-2 space-x-2">
                    <span>Back to Home</span>
                    <FaArrowRight />
                 </Link>
                <div className="mt-auto flex flex-col items-center">
                    <p className="mt-2 font-bold">{user.displayName}</p>
                    <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full mt-2" />
                    <button className="mt-5 text-red-300" onClick={logOut}><FaSignOutAlt className="mr-2" /> Logout</button>
                </div>
            </aside>
            <main className="flex-1 p-5">
                {/* Main content goes here */}
            </main>
        </div>
    );
};

export default HRDashboard;
