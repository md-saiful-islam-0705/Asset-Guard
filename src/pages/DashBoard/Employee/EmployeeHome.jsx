import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { FaCalendarAlt, FaClipboardList, FaExclamationCircle } from 'react-icons/fa';
import { MdEventNote } from "react-icons/md";

const EmployeeHome = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [monthlyRequests, setMonthlyRequests] = useState([]);
    const [affiliated, setAffiliated] = useState(true); // Assuming the user is initially affiliated

    useEffect(() => {
        // Fetch data for pending requests
        axios.get('http://localhost:3000/pending-requests')
            .then(response => setPendingRequests(response.data))
            .catch(error => console.error('Error fetching pending requests:', error));

        // Fetch data for monthly requests
        axios.get('http://localhost:3000/monthly-requests')
            .then(response => setMonthlyRequests(response.data))
            .catch(error => console.error('Error fetching monthly requests:', error));

        // Check if the user is affiliated with any company
        axios.get('http://localhost:3000/check-affiliation')
            .then(response => setAffiliated(response.data.affiliated))
            .catch(error => console.error('Error checking affiliation:', error));
    }, []);

    return (
        <>
            <Helmet>
                <title>Home Page</title>
            </Helmet>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Home Page</h1>
                {affiliated ? (
                    <div>
                        {/* My Pending Requests Section */}
                        <div className="border rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold flex items-center">
                            <FaClipboardList  className="w-6 h-6 mr-2" /> My Pending Requests
                            </h2>
                            {pendingRequests.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {pendingRequests.map(request => (
                                        <li key={request.id}>{request.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No pending requests</p>
                            )}
                        </div>
                        {/* My Monthly Requests Section */}
                        <div className="border rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold flex items-center">
                            <FaCalendarAlt className="w-6 h-6 mr-2" /> My Monthly Requests
                            </h2>
                            {monthlyRequests.length > 0 ? (
                                <ul className="list-disc list-inside">
                                    {monthlyRequests.map(request => (
                                        <li key={request.id}>{request.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No monthly requests</p>
                            )}
                        </div>
                        {/* Additional Sections */}
                        {/* You can add more sections here */}
                        {/* For example: */}
                        {/* Calendar Section */}
                        <div className="border rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold flex items-center">
                            <FaCalendarAlt className="w-6 h-6 mr-2" /> Calendar
                            </h2>
                            {/* Your Calendar component goes here */}
                        </div>
                        {/* Events Section */}
                        <div className="border rounded-md p-4 mb-4">
                            <h2 className="text-lg font-semibold flex items-center">
                            <MdEventNote   className="w-6 h-6 mr-2" /> Events
                            </h2>
                            {/* Your Events component goes here */}
                        </div>
                    </div>
                ) : (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
                        <FaExclamationCircle className="w-5 h-5 inline mr-2" /> You are not affiliated with any company. Please contact your HR. 
                    </div>
                )}
            </div>
        </>
    );
};

export default EmployeeHome;
