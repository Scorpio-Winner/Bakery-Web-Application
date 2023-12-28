import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import ReviewsSection from "./components/pages/mainPage/ReviewsSection";
import './App.css';
/* <AppRouter />*/
function App() {
  return (
           <BrowserRouter>
               <ReviewsSection/>
            </BrowserRouter>
);
};

export default App;
