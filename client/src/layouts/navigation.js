// import React from "react";
// import { accountService } from "../_services/account.service";
// import { useNavigate } from "react-router-dom";

// const Navigation = () => {
//   const navigate = useNavigate();

<<<<<<< HEAD
  const logout = () => {
    accountService.logout();
    navigate('/auth/login');
  }
  let nav;
  if (accountService.isLogged()) {
    nav = (
      <button onClick={logout}>Logout</button>
    );
  }
=======
//   const logout = () => {
//     accountService.logout();
//     navigate('/auth/login');
//   }
//   let nav;
//   if(accountService.isLogged()){
//     nav = (
//       <button onClick={logout}>Logout</button>
//     );
//   } else {
//     nav = "Ma barre de navigation";
//   }
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179

//   return (
//     <div>{nav}</div>
//   );
// };

// export default Navigation;
