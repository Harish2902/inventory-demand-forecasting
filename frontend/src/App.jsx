import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import SalesHistory from "./pages/SalesHistory";
import Forecast from "./pages/Forecast";

function App() {
    return (
        <Routes>

            <Route element={<Layout />}>

                <Route path="/" element={<Dashboard />} />

                <Route path="/products" element={<Products />} />

                <Route path="/sales" element={<SalesHistory />} />

                <Route path="/forecast" element={<Forecast />} />

            </Route>

        </Routes>
    );
}

export default App;