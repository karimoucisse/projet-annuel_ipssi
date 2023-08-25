import React, { useEffect, useState, useRef } from 'react';
import { accountService } from '../../_services/account.service';
import { userService } from '../../_services/user.service';

const Subscription = () => {
  const flag = useRef(false);
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
  const [addressIsValidate, setAddressIsValidate] = useState(false);
  const [subscriptionIsValidate, setSubscriptionIsValidate] = useState(false);
  const [counter, setCounter] = useState(0);
  const [alreadyUser, setAlreadyUser] = useState(false);

  useEffect(() => {
    if (flag.current === false && accountService.isUserId()) {
      userService
        .getUserInfoById(accountService.getUserId())
        .then((res) => {
          console.log(res.data);
          setCounter(3);
          setUserIsValidate(true);
          setAddressIsValidate(true);
          setSubscriptionIsValidate(true);
          setUserInfo({
            ...userInfo,
            firstname: res.data.firstname,
            lastname: res.data.lastname,
            email: res.data.email,
            password: '00',
            phone: res.data.phone,

            wayType: res.data.wayType,
            number: res.data.number,
            addressName: res.data.addressName,
            postalCode: res.data.postalCode,
            state: res.data.state,
            city: res.data.city,
            country: res.data.country,

            subscription: res.data.subscription,
          });
          setAlreadyUser(true);
        })
        .catch((err) => console.log(err));
    }
    return () => (flag.current = true);
  }, []);

  const onChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (userIsValidate && addressIsValidate && subscriptionIsValidate) {
      await accountService
        .signup(userInfo) // On inscrit l'utilisateur
        .then((res) => {
          console.log(res);
          if (res.data.message === 'user created' && res.data.user.id) {
            accountService.deleteUserId();
            accountService.saveUserId(res.data.user.id);
          }
        })
        .catch((err) => console.log(err));

      //accountService.getBasket({ userId: accountService.getUserId() }) // TODO: Si l'utilisateur n'a pas validé son paiement et qu'il souhaite finaliser son inscription on revient chercher son panier
      //    .then(res => {
      //        console.log(res.data);
      //        setBasketContent(res.data);
      //        setBasketIsValidate(true);
      //    })
      //    .catch(err => console.log(err));

      await accountService
        .payment({
          subscription: userInfo.subscription,
          userId: accountService.getUserId(),
        }) // L'utilisateur passe au paiement
        .then((res) => {
          console.log(res);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err));
    }
    if (userIsValidate && addressIsValidate && !subscriptionIsValidate) {
      // TODO: Vérifier que la valeur subscription a bien changé
      setSubscriptionIsValidate(true);
      increaseCounter();
    }
    if (userIsValidate && !addressIsValidate) {
      // TODO: VERIFIER TOUS LES CHAMPS
      setAddressIsValidate(true);
      increaseCounter();
    }
    if (!userIsValidate) {
      //TODO: VERIFIER TOUS LES CHAMPS DES INPUTS
      setUserIsValidate(true);
      increaseCounter();
    }
  };

  const increaseCounter = () => {
    if (counter >= 3) {
      setCounter(3);
    } else {
      setCounter(counter + 1);
    }
  };

  const decreaseCounter = () => {
    if (counter > 0) {
      setCounter(counter - 1);
      console.log(counter);
      if (counter === 3) {
        setSubscriptionIsValidate(false);
      }
      if (counter === 2) {
        setAddressIsValidate(false);
      }
      if (counter === 1) {
        setUserIsValidate(false);
      }
    } else {
      setCounter(0);
    }
  };

  let userInfoForm = // TODO: METTRE LES FORMULAIRES DANS COMPONENTS, PASSER JAVASCRIPT POUR NE PAS AFFICHER MAIL ET MOT DE PASSE
    (
      <form onSubmit={onSubmit}>
        <h3>Les informations personnelles</h3>

        <div className="group">
          <label htmlFor="firstname">Prenom</label>
          <input
            type="text"
            name="firstname"
            value={userInfo.firstname}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            name="lastname"
            value={userInfo.lastname}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <label htmlFor="phone">Téléphone</label>
          <input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={userInfo.email}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            value={userInfo.password}
            onChange={onChange}
          />
        </div>

        <div className="group">
          <button>Continuer</button>
        </div>
      </form>
    );

  const addressInfoForm = (
    <form onSubmit={onSubmit}>
      <h3>L'adresse</h3>

      <div className="group">
        <label htmlFor="wayType">Type de voie</label>
        <select name="wayType" onChange={onChange}>
          <option value="">Selectionner un type de voie</option>
          <option value="1">Rue</option>
          <option value="2">Avenue</option>
          <option value="3">Boulevard</option>
        </select>
      </div>

      <div className="group">
        <label htmlFor="number">Numéro du batiment</label>
        <input
          type="text"
          name="number"
          value={userInfo.number}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <label htmlFor="addressName">Adresse</label>
        <input
          type="text"
          name="addressName"
          value={userInfo.addressName}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <label htmlFor="postalCode">Code postal</label>
        <input
          type="text"
          name="postalCode"
          value={userInfo.postalCode}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <label htmlFor="city">Ville</label>
        <input
          type="text"
          name="city"
          value={userInfo.city}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <label htmlFor="state">Etat / Region</label>
        <input
          type="text"
          name="state"
          value={userInfo.state}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <label htmlFor="country">Pays</label>
        <input
          type="text"
          name="country"
          value={userInfo.country}
          onChange={onChange}
        />
      </div>

      <div className="group">
        <button>Continuer</button>
      </div>
    </form>
  );

  const subscriptionInfoForm = (
    <form onSubmit={onSubmit}>
      <h3>Type d'abonnement</h3>

      <div className="group">
        <label>
          Abonnement à 20€
          <input
            type="radio"
            name="subscription"
            value="1"
            onChange={onChange}
          />
        </label>
        <label>
          Abonnement à 40€
          <input
            type="radio"
            name="subscription"
            value="2"
            onChange={onChange}
          />
        </label>
        <label>
          Abonnement à 60€
          <input
            type="radio"
            name="subscription"
            value="3"
            onChange={onChange}
          />
        </label>
      </div>

      <div className="group">
        <button>Continuer</button>
      </div>
    </form>
  );

  const result = (
    <div>
      <h3>Résumé</h3>

      <div>
        <h4>Mes infos personnelles</h4>
        <ul>
          <li>{userInfo.firstname}</li>
          <li>{userInfo.lastname}</li>
          <li>{userInfo.email}</li>
          <li>{userInfo.phone}</li>
        </ul>
      </div>

      <div>
        <h4>Mon adresse</h4>
        <ul>
          <li>{userInfo.wayType}</li>
          <li>{userInfo.addressName}</li>
          <li>{userInfo.postalCode}</li>
          <li>{userInfo.state}</li>
          <li>{userInfo.city}</li>
          <li>{userInfo.country}</li>
        </ul>
      </div>

      <div>
        <h4>Mon abonnement</h4>
        <ul>
          <li>Abonnement type {userInfo.subscription}</li>
          <li>Prix: {Number(userInfo.subscription) * 20}€</li>
        </ul>
      </div>

      <form onSubmit={onSubmit}>
        <div className="group">
          <button>Passer au paiement</button>
        </div>
      </form>
    </div>
  );

  const tab_view_form = [
    userInfoForm,
    addressInfoForm,
    subscriptionInfoForm,
    result,
  ];

  //TODO: RETIRER BOUTON RETOUR LORSQUE NOUS SOMMES A ZERO
  return (
    <div>
      <button onClick={decreaseCounter}>Retour</button>
      {tab_view_form[counter]}
    </div>
  );
};

export default Subscription;
