import GlobalStyle from "../../Styles/globalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Balance from "../Balance/Balance";
import Income from "../Income/Income";
import Outcome from "../Outcome/Outcome";
import UserContext from "../Contexts/UserContext";
import { useState } from "react";

export default function App() {
    const [userInfo, setUserInfo] = useState({});

    return (
        <>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
                <GlobalStyle />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/SignUp" element={<SignUp />} />
                        <Route path="/Balance" element={<Balance />} />
                        <Route path="/Income" element={<Income />} />
                        <Route path="/Outcome" element={<Outcome />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}