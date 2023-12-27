import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import MainSection from "./components/pages/mainPage/MainSection";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <MainSection/>
            </BrowserRouter>
);
};

export default App;
