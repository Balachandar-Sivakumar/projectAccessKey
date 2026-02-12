import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainModel from "./components/ProjectAccessKeyMain";
import '@fontsource/inter';

function App() {
    return (
        <BrowserRouter>
            <MainModel />
        </BrowserRouter>
    );
}

export default App;
