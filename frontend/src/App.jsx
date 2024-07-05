import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export default function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}