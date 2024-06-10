# Asset Management System (AMS) by Asset Guard Company

## Live Site URL:
[Asset Management System](https://asset-guard-2024.web.app)

## Admin Credentials:
- **Username:** asset@hero.com
- **Password:** Abc123

## Features of the Website:

1. **User Authentication:**
   - Secure login and registration for both HR Managers and Employees.
   - Social login options available (e.g., Google).

2. **Role-Based Access:**
   - Different dashboards and functionalities for HR Managers and Employees.
   - HR Managers can manage assets, requests, and employee lists.
   - Employees can view and request assets, see team members, and track requests.

3. **Asset Management:**
   - Categorization of assets into returnable (e.g., laptops, phones) and non-returnable (e.g., pens, paper).
   - HR Managers can add, update, and delete assets.
   - Real-time stock status (available/out-of-stock) and quantity tracking.

4. **Request Management:**
   - Employees can request assets, and track the status of their requests.
   - HR Managers can approve or reject asset requests.
   - Notifications for all CRUD operations and status changes.

5. **Responsive Design:**
   - Fully responsive interface for mobile, tablet, and desktop views.
   - Ensures a seamless user experience across all devices.

6. **Dashboard Analytics:**
   - HR Manager dashboard includes pending requests, top requested items, and stock alerts.
   - Visual pie chart representation of returnable vs non-returnable asset requests.

7. **Team Management:**
   - HR Managers can add and remove employees from the team.
   - Display of team members with profile pictures and role icons.

8. **Security:**
   - JWT-based authentication to secure user sessions.
   - Environment variables used to protect sensitive data (e.g., Firebase config keys, MongoDB credentials).

9. **Search and Filter:**
   - Advanced search and filter options for assets and requests.
   - Server-side implementation for efficient data handling.

10. **Pagination:**
    - Pagination feature for all tables, displaying 10 items per page for easier navigation and data management.

11. **Profile Management:**
    - Both HR Managers and Employees can update their profile information.
    - Email is set as read-only for security reasons.

12. **User Notifications:**
    - Sweetalert/toast notifications for successful operations like login, signup, asset requests, and more.
    - No default browser alerts used, enhancing user experience.

13. **Stripe Payment Integration:**
    - Secure payment processing for HR Managers to purchase packages.
    - Supports multiple pricing tiers (5 members for $5, 10 members for $8, 20 members for $15).

14. **Technology Stack:**
    - **Frontend:** React.js with Tailwind CSS for styling.
    - **Backend:** Node.js with Express.js.
    - **Database:** MongoDB for data storage.
    - **State Management:** Redux for managing application state.
    - **Authentication:** Firebase Authentication.
    - **Notifications:** SweetAlert2 for customized alerts.

15. **Additional Packages Used:**
    - **Tanstack Query:** For efficient data fetching and state management.
    - **React Helmet:** For managing changes to the document head.
    - **React Calendar:** For displaying calendar events and managing dates.
    - **React PDF:** For generating PDF documents for asset details.
    - **Axios:** For making HTTP requests.
    - **React Router:** For handling routing within the application.

