import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import InstSection from "./components/pages/mainPage/InstSection";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <InstSection/>
            </BrowserRouter>
);
};

export default App;
