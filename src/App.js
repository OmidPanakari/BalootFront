import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import {createContext, useEffect, useState} from "react";
import Commodity from "./pages/Commodity";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protected from "./Protected";
import axios from "axios";
import {CircularProgress} from "@mui/material";

export const DataContext = createContext({
    user: {}, setUser: () => {
    }
})

function App() {
    const baseURLAuth = "http://localhost:8080/auth/";
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const value = {user, setUser};
    async function AuthReq() {
        setLoading(true);
        let temp = await axios.get(baseURLAuth, {headers: {Authorization : localStorage.getItem("token")}}).catch((error) => {
            localStorage.removeItem("token")
            setLoading(false)
        });
        if (temp.data.success === true) {
            setUser(temp.data.data.data);
            setLoading(false)
        }
    }
    useEffect(() => {
        AuthReq()
    }, [])

    return (
        <DataContext.Provider value={value}>
            {loading ? <CircularProgress/> :
                <BrowserRouter>
                    <Routes>
                        <Route path="/">
                            <Route index element={<Protected><Home/></Protected>}/>
                            <Route path={"Commodity/:id"} element={<Protected><Commodity/></Protected>}/>
                            <Route path={"Cart"} element={<Protected><Cart/></Protected>}/>
                            <Route path={"Login"} element={<Login/>}/>
                            <Route path={"Signup"} element={<Signup/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>}
        </DataContext.Provider>

    );
}

export default App;
