import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
    const user = false;
    // if (!user) {
    //     return <Navigate to="/login" replace />;
    // }
    return children;
};
export default ProtectedRoute;