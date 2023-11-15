
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    useLocation,
    Navigate,
    Outlet
  } from "react-router-dom";
import Login from "../pages/Login/Login";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/Home/Home";
function RequireAuth() {
  let auth = localStorage.getItem('thesBotToken');
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
    const router = createBrowserRouter(
      createRoutesFromElements(
        <Route path="/"  >
       <Route path='/login' element={<Login/>} />
     <Route element={<RequireAuth/>}>
     <Route index element={<Home/>} />

<Route path='/chat/:id' element={<Chat/>} />
     </Route>
     
  
        </Route>
      )
    );
  
    export default router