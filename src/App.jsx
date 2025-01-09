import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Profile from "@/pages/profile";
import Chat from "@/pages/chat";
import Auth from "@/pages/auth";
import apiClient from "@/lib/api-client";
import { GET_USERINFO_ROUTE } from "@/lib/constants";
import { useAppStore } from "@/store";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    window.location.reload();
  },[])

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const response = await apiClient.get(GET_USERINFO_ROUTE, {
  //         withCredentials: true,
  //       });
  //       if (response.status === 200 && response.data.id) {
  //         setUserInfo(response.data);
  //       } else {
  //         setUserInfo(undefined);
  //       }
  //     } catch (error) {
  //       setUserInfo(undefined);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getUserData();
  // }, [setUserInfo]);

  // if (loading) {
  //   return <div>Loading...</div>; // Show a loading indicator while fetching user data
  // }

  return (
    <Router>
      <Routes>
        {/* Always redirect to Auth */}
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route
          path="/auth"
          element={<Auth />}
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
