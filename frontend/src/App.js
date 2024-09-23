import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import ProtectedRoute from "./components/utils/ProtectedRoute";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                    path="/home"
                    element={<ProtectedRoute children={<Home />} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
