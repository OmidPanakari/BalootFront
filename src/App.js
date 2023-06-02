import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import {createContext, useEffect, useState} from "react";
import Commodity from "./pages/Commodity";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protected from "./components/Protected";
import axios from "axios";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import Provider from "./pages/Provider";
import {DataContext} from "./context/DataContext";
import {AlertContext} from "./context/AlertContext";
import NotFound from "./pages/NotFound";
import OAuth from "./pages/OAuth";
import UnProtected from "./components/UnProtected";

function App() {
    console.log("render")
    const baseURLAuth = "http://localhost:8080/auth/";
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const value = {user, setUser};
    const [alertState, setAlertState] = useState({open: false, message: ""})
    const sendAlert = (message) => {
        setAlertState({open: true, message});
    }
    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertState({open: false, message: ""});
    }
    async function AuthReq() {
        setLoading(true);
        let temp = await axios.get(baseURLAuth, {headers: {Authorization : localStorage.getItem("token")}}).catch((error) => {
            localStorage.removeItem("token")
            setLoading(false)
        });
        if (temp.data.success === true) {
            setUser(temp.data.data.data);
            console.log(temp.data.data.data)
            setLoading(false)
        }
    }
    useEffect(() => {
        AuthReq()
    }, [])

    return (
        <AlertContext.Provider value={{sendAlert}}>
            <DataContext.Provider value={value}>
                {loading ? <CircularProgress/> :
                    <BrowserRouter>
                        <Routes>
                            <Route path="/">
                                <Route index element={<Protected><Home/></Protected>}/>
                                <Route path={"Commodity/:id"} element={<Protected><Commodity/></Protected>}/>
                                <Route path={"Provider/:id"} element={<Protected><Provider/></Protected>}/>
                                <Route path={"Cart"} element={<Protected><Cart/></Protected>}/>
                                <Route path={"oAuth"} element={<UnProtected><OAuth/></UnProtected>}/>
                                <Route path={"Login"} element={<UnProtected><Login/></UnProtected>}/>
                                <Route path={"Signup"} element={<UnProtected><Signup/></UnProtected>}/>
                            </Route>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>}
                <Snackbar open={alertState.open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {alertState.message}
                    </Alert>
                </Snackbar>
            </DataContext.Provider>
        </AlertContext.Provider>

    );
}

export default App;
