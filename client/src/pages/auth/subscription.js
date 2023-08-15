import React, { useState } from "react";
import { accountService } from "../../_services/account.service";

const Subscription = () => {

    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',

        wayType: '',
        number: '',
        addressName: '',
        postalCode: '',
        state: '',
        city: '',
        country: '',

        subscription: '',
    });

    const [userIsValidate, setUserIsValidate] = useState(false);

    const onChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(userInfo);
        if(!userIsValidate){
            accountService.signup(userInfo)
                .then(res => {
                    console.log(res);
                    if(res.data.message === 'user created' && res.data.user.id){
                        setUserIsValidate(true);
                        accountService.saveUserId(res.data.user.id);
                    }
                })
                .catch(err => console.log(err));
        } else {
            accountService.payment({ subscription: userInfo.subscription, userId: accountService.getUserId() })
                .then(res => {
                    console.log(res);
                    if(res.data.url){
                        window.location.href = res.data.url;
                    }
                })
                .catch(err => console.log(err));
        }

    }

    if(!userIsValidate){
        return (
            <form onSubmit={onSubmit}>
                <h3>Les informations personnelles</h3>

                <div className="group">
                    <label htmlFor="firstname">Prenom</label>
                    <input type="text" name="firstname" value={userInfo.firstname} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" name="lastname" value={userInfo.lastname} onChange={onChange}/>
                </div>

                <div className="group">
                    <label htmlFor="phone">Téléphone</label>
                    <input type="text" name="phone" value={userInfo.phone} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" value={userInfo.email} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" value={userInfo.password} onChange={onChange} />
                </div>

                <h3>L'adresse</h3>

                <div className="group">
                    <label htmlFor="wayType">Type de voie</label>
                    <select name="wayType" onChange={onChange} >
                        <option value="">Selectionner un type de voie</option>
                        <option value="1">Rue</option>
                        <option value="2">Avenue</option>
                        <option value="3">Boulevard</option>
                    </select>
                </div>

                <div className="group">
                    <label htmlFor="number">Numéro du batiment</label>
                    <input type="text" name="number" value={userInfo.number} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="addressName">Adresse</label>
                    <input type="text" name="addressName" value={userInfo.addressName} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="postalCode">Code postal</label>
                    <input type="text" name="postalCode" value={userInfo.postalCode} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="city">Ville</label>
                    <input type="text" name="city" value={userInfo.city} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="state">Etat / Region</label>
                    <input type="text" name="state" value={userInfo.state} onChange={onChange} />
                </div>

                <div className="group">
                    <label htmlFor="country">Pays</label>
                    <input type="text" name="country" value={userInfo.country} onChange={onChange} />
                </div>

                <div className="group">
                    <button>Continuer</button>    
                </div>
            </form>
        );
    }

    return (
        <form onSubmit={onSubmit}>
            <h3>Type d'abonnement</h3>

            <div className="group">
                <label>Abonnement à 20€
                <input type="radio" name="subscription" value="1" onChange={onChange} />
                </label>
                <label>Abonnement à 40€
                <input type="radio" name="subscription" value="2" onChange={onChange} />
                </label>
                <label>Abonnement à 60€
                <input type="radio" name="subscription" value="3" onChange={onChange} />
                </label>
            </div>

            <div className="group">
                <button>S'inscrire</button>    
            </div>
        </form>
    );
}

export default Subscription;