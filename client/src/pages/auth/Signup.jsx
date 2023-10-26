import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddressInfoForm from "../../components/auth/AdressInfoForm";
import SubscriptionInfoForm from "../../components/auth/SubscriptionInfoForm";
import Result from "../../components/auth/Result";
import { accountService } from "../../_services/account.service";
import UserInfoForm from "../../components/auth/UserInfoForm";

const Subscription = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
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

  const handleNext = () => {
    // Ajoutez ici les vérifications de validation avant de passer à l'étape suivante.
    if (activeStep === 0) {
      if (!isStep0Valid(userInfo)) {
        return;
      }
    } else if (activeStep === 1) {
      if (!isStep1Valid(userInfo)) {
        return;
      }
    } else if (activeStep === 2) {
      if (!isStep2Valid(userInfo)) {
        return;
      }
    }

    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const isStep0Valid = (data) => {
    if (!data.firstname || !data.lastname || !data.email || !data.phone) {
      return false;
    }
    return true;
  };

  const isStep1Valid = (data) => {
    if (
      !data.wayType ||
      !data.number ||
      !data.addressName ||
      !data.postalCode ||
      !data.state ||
      !data.city ||
      !data.country
    ) {
      return false;
    }
    return true;
  };

  const isStep2Valid = (data) => {
    if (!data.subscription) {
      return false;
    }
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo);
    if (
      isStep0Valid(userInfo) &&
      isStep1Valid(userInfo) &&
      isStep2Valid(userInfo)
    ) {
      await accountService
        .signup(userInfo) // On inscrit l'utilisateur
        .then((res) => {
          console.log(res);
          if (res.data.message === "user created" && res.data.user.id) {
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
  };

  return (
    <Box p={2}>
      {activeStep === 0 && (
        <UserInfoForm
          userInfo={userInfo}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setUserInfo({ ...userInfo, ...data })}
        />
      )}
      {activeStep === 1 && (
        <AddressInfoForm
          userInfo={userInfo}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setUserInfo({ ...userInfo, ...data })}
        />
      )}
      {activeStep === 2 && (
        <SubscriptionInfoForm
          userInfo={userInfo}
          onNext={handleNext}
          onBack={handleBack}
          onChange={(data) => setUserInfo({ ...userInfo, ...data })}
        />
      )}
      {activeStep === 3 && (
        <Result userInfo={userInfo} onBack={handleBack} onSubmit={onSubmit} />
      )}
    </Box>
  );
};

export default Subscription;
