import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';


const PublicLayout = () => {
  const {user} = useAuth()

  //redirect user to navigate 
  if (user) {
    return <Navigate to="/dashboard" replace/>
  }
  return (
    <>
      <Navbar />
   
      <main>
        <Outlet /> 
      </main>
     <Footer/>
    </>
  );
};

export default PublicLayout;
