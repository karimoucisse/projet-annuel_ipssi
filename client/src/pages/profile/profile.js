import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const deleteAccount = async () => { // TODO: AJOUTER FENETRE DE CONFIRMATION
        await userService.deleteUser()
            .then(res => {
                console.log(res);
                accountService.logout();
                navigate('/auth/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="profile">
            <ul>
                <li>Ses informations</li>
                <li>Ses factures</li>
                <li>Ajouter de l'espace de stockage</li>
            </ul>

            <div>
                <button onClick={deleteAccount}>Supprimer son compte</button>
            </div>
        </div>
    );
  };
  
  export default Profile;