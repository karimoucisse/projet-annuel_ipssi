import { Navigate } from "react-router-dom";
import { accountService } from "../_services/account.service";

const VisitorGuard = ({ children }) => {

    if(accountService.isLogged()){
        return <Navigate to="/" />
    }
    
    return children;
}

export default VisitorGuard;