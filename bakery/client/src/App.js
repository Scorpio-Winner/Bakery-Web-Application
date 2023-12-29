import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import MainPage from "./components/pages/MainPage";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <MainPage/>
            </BrowserRouter>
);
};

export default App;
