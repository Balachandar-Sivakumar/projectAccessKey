import logo from "./logo.svg";
import "./App.css";
import AppRoutes from "./routes/route";
import { BrowserRouter } from "react-router-dom";
import '@fontsource/inter';

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
