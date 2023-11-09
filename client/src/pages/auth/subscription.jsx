import React, { useEffect, useState, useRef } from "react";
import { accountService } from "../../_services/account.service";
import { userService } from "../../_services/user.service";
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Container,
  Grid,
  Divider,
} from "@mui/material";
import ArchiConnectContainer from "../../components/auth/ArchiConnectContainer";
import { Link } from "react-router-dom";

const Subscription = () => {
  const flag = useRef(false);
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    wayType: "",
    number: "",
    addressName: "",
    postalCode: "",
    state: "",
    city: "",
    country: "",
    subscription: "",
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
            password: "00",
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
        .signup(userInfo)
        .then((res) => {
          console.log('dataUser', res);
          if (res.data.message === "user created" && res.data.user.id) {
            console.log('je dois rentrer là');
            accountService.deleteUserId();
            accountService.saveUserId(res.data.user.id);
          }
        })
        .catch((err) => console.log(err));

      await accountService
        .payment({
          subscription: userInfo.subscription,
          userId: accountService.getUserId(),
        })
        .then((res) => {
          console.log(res);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => console.log(err));
    }
    if (userIsValidate && addressIsValidate && !subscriptionIsValidate) {
      setSubscriptionIsValidate(true);
      increaseCounter();
    }
    if (userIsValidate && !addressIsValidate) {
      setAddressIsValidate(true);
      increaseCounter();
    }
    if (!userIsValidate) {
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

  const userInfoForm = (
    <form onSubmit={onSubmit}>
      <Typography variant="h6">Les informations personnelles</Typography>

      <Stack spacing={2}>
        <TextField
          label="Prénom"
          name="firstname"
          value={userInfo.firstname}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Nom"
          name="lastname"
          value={userInfo.lastname}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Téléphone"
          name="phone"
          value={userInfo.phone}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Email"
          name="email"
          value={userInfo.email}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Mot de passe"
          name="password"
          value={userInfo.password}
          onChange={onChange}
          fullWidth
        />
      </Stack>
      <Typography mt={4} variant="body2">
        <Link to="/auth/login" color="inherit" ml={1}>
          Se connecter
        </Link>
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Continuer
      </Button>
    </form>
  );

  const addressInfoForm = (
    <form onSubmit={onSubmit}>
      <Typography variant="h6">L'adresse</Typography>

      <Stack spacing={2}>
        <TextField
          label="Type de voie"
          name="wayType"
          select
          value={userInfo.wayType}
          onChange={onChange}
          fullWidth
        >
          <MenuItem value="">Sélectionner un type de voie</MenuItem>
          <MenuItem value="1">Rue</MenuItem>
          <MenuItem value="2">Avenue</MenuItem>
          <MenuItem value="3">Boulevard</MenuItem>
        </TextField>
        <TextField
          label="Numéro du bâtiment"
          name="number"
          value={userInfo.number}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Adresse"
          name="addressName"
          value={userInfo.addressName}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Code postal"
          name="postalCode"
          value={userInfo.postalCode}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Ville"
          name="city"
          value={userInfo.city}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="État / Région"
          name="state"
          value={userInfo.state}
          onChange={onChange}
          fullWidth
        />
        <TextField
          label="Pays"
          name="country"
          value={userInfo.country}
          onChange={onChange}
          fullWidth
        />
      </Stack>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Continuer
      </Button>
    </form>
  );

  const subscriptionInfoForm = (
    <form onSubmit={onSubmit}>
      <Typography variant="h6">Type d'abonnement</Typography>

      <RadioGroup
        name="subscription"
        value={userInfo.subscription}
        onChange={onChange}
      >
        <FormControlLabel
          value="1"
          control={<Radio />}
          label="Abonnement à 20€"
        />
        {/* <FormControlLabel
          value="2"
          control={<Radio />}
          label="Abonnement à 40€"
        />
        <FormControlLabel
          value="3"
          control={<Radio />}
          label="Abonnement à 60€"
        /> */}
      </RadioGroup>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "16px" }}
      >
        Continuer
      </Button>
    </form>
  );

  const result = (
    <Box>
      <Typography variant="h6">Résumé</Typography>

      <Stack spacing={2}>
        <Box>
          <Typography variant="h6">Mes infos personnelles</Typography>
          <ul>
            <li>{userInfo.firstname}</li>
            <li>{userInfo.lastname}</li>
            <li>{userInfo.email}</li>
            <li>{userInfo.phone}</li>
          </ul>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6">Mon adresse</Typography>
          <ul>
            <li>{userInfo.wayType}</li>
            <li>{userInfo.addressName}</li>
            <li>{userInfo.postalCode}</li>
            <li>{userInfo.state}</li>
            <li>{userInfo.city}</li>
            <li>{userInfo.country}</li>
          </ul>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6">Mon abonnement</Typography>
          <ul>
            <li>Abonnement type {userInfo.subscription}</li>
            <li>Prix: {Number(userInfo.subscription) * 20}€</li>
          </ul>
        </Box>
      </Stack>

      <form onSubmit={onSubmit}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "16px" }}
        >
          Passer au paiement
        </Button>
      </form>
    </Box>
  );

  const tabViewForm = [
    userInfoForm,
    addressInfoForm,
    subscriptionInfoForm,
    result,
  ];

  return (
    <Box>
      <Stack direction="row" display="flex" height="100vh">
        <Box
          display="flex"
          flexDirection="column"
          flex={0.8}
          justifyContent="space-between"
          alignItems="center"
          paddingY={"100px"}
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            position: "relative", // Ajout de la position relative
          }}
        >
          <Button
            onClick={decreaseCounter}
            style={{
              position: "absolute",
              top: 0, // Placer en haut
              left: 0, // Placer à gauche
              margin: "16px", // Ajouter une marge
            }}
          >
            Retour
          </Button>
          {tabViewForm[counter]}
        </Box>
        <ArchiConnectContainer />
      </Stack>
    </Box>
  );
};

export default Subscription;
