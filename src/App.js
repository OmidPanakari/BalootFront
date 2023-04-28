import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {createContext, useState} from "react";
import Commodity from "./pages/Commodity";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Protected from "./Protected";

export const DataContext = createContext({login: false})
function App() {
    const [user, setUser] = useState({isLogin:false, user:{}})
    async function checkLogin(){

    }
    return (
        <DataContext.Provider value={{login: false}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Protected><Home /></Protected>}/>
                        <Route path={"Commodity"} element={<Protected><Commodity/></Protected>}/>
                        <Route path={"Cart"} element={<Protected><Cart/></Protected>}/>
                        <Route path={"Login"} element={<Login/>}/>
                        <Route path={"Signup"} element={<Signup/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </DataContext.Provider>
        
    );
}
export default App;
