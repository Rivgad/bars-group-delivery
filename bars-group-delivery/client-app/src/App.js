import { Outlet } from "react-router-dom";
import Header from "./features/header/Header";

const App = () =>{
    return(
        <>
            <Header totalPrice = {200}/>
            <Outlet/>
        </>
    )
}

export default App;