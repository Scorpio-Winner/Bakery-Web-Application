import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import MainPage from "./components/pages/MainPage";
import Backet from "./components/pages/Backet";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <AppRouter/>
            </BrowserRouter>
);
};

export default App;
