import logo from './logo.svg';
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "../src/components/header/Header";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <Header />
            </BrowserRouter>
);
};

export default App;
