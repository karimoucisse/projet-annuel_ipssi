import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";

const Profile = () => {

    const deleteAccount = async () => { // TODO: AJOUTER FENETRE DE CONFIRMATION
        await userService.deleteUser()
            .then(res => {
                console.log(res);
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