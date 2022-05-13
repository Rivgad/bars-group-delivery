import { Outlet } from "react-router-dom";
import AppHeader from "../app-header";

const App = () =>{
    return(
        <>
            <AppHeader totalPrice = {200}/>
            <Outlet/>
        </>
    )
}

export default App;