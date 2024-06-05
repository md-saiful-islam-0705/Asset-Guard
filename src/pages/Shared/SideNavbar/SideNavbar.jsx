import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const SideNavbar = ({ isOpen, toggleSideNav, user, handleLogOut }) => {
    return (
        <div className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-75 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
            <div className="bg-white w-64 h-full shadow-xl p-4">
                <button className="text-black text-2xl mb-4" onClick={toggleSideNav}>
                    <FaTimes />
                </button>
                <ul className="menu p-4 font-semibold">
                <li className="flex justify-between items-center space-x-2">
                                <img src={user?.photoURL} alt="Profile" className="w-9 h-9 p-0 rounded-full" />
                                <p className="text-gray-500 text-lg">{user?.displayName}</p>    
                            </li>
                   
                    {user ? (
                        <>
                            {user.role === 'hr' ? (
                                <>
                                    <li><Link to="/" onClick={toggleSideNav}>Home</Link></li>
                                    <li><Link to="/asset-list" onClick={toggleSideNav}>Asset List</Link></li>
                                    <li><Link to="/add-asset" onClick={toggleSideNav}>Add an Asset</Link></li>
                                    <li><Link to="/all-requests" onClick={toggleSideNav}>All Requests</Link></li>
                                    <li><Link to="/custom-requests" onClick={toggleSideNav}>Custom Requests List</Link></li>
                                    <li><Link to="/employee-list" onClick={toggleSideNav}>My Employee List</Link></li>
                                    <li><Link to="/add-employee" onClick={toggleSideNav}>Add an Employee</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/employee-home" onClick={toggleSideNav}>Home</Link></li>
                                    <li><Link to="/my-assets" onClick={toggleSideNav}>My Assets</Link></li>
                                    <li><Link to="/my-team" onClick={toggleSideNav}>My Team</Link></li>
                                    <li><Link to="/request-asset" onClick={toggleSideNav}>Request for an Asset</Link></li>
                                </>
                            )}
                            <li><Link to="/profile" onClick={toggleSideNav}>Profile</Link></li>
                            <li>
                                <button onClick={() => { handleLogOut(); toggleSideNav(); }} className="text-red-300">LogOut</button>
                            </li>
                            
                        </>
                    ) : (
                        <>
                            <li><Link to="/join-employee" onClick={toggleSideNav}>Join as Employee</Link></li>
                            <li><Link to="/join-hr" onClick={toggleSideNav}>Join as HR Manager</Link></li>
                            <li><Link to="/login" onClick={toggleSideNav}>Login</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideNavbar;
