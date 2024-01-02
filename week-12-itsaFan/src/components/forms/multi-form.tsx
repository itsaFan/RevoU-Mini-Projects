import { Steps, Card } from "antd";
import { useState } from "react";
import PersonalInfo from "./personal-info";
import AddressInfo from "./address-info";
import AccountInfo from "./account-info";
import classes from "./css/form.module.css";
import SuccessModal from "../UI/success-modal";

// type Props = {
//   onClose: () => void;
// }

export default function MultiForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
    },
    addressInfo: {
      address: "",
      city: "",
      country: "",
      zipCode: "",
    },
    accountInfo: {
      username: "",
      password: "",
    },
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const updateFormData = (step: string, data: any) => {
    setFormData({
      ...formData,
      [step]: data,
    });
  };

  const showSuccessModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const formContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfo
            initialValues={formData.personalInfo}
            onSubmit={(data) => {
              updateFormData("personalInfo", data);
              nextStep();
            }}
          />
        );
      case 1:
        return (
          <AddressInfo
            initialValues={formData.addressInfo}
            onSubmit={(data) => {
              updateFormData("addressInfo", data);
              nextStep();
            }}
            prevStep={prevStep}
          />
        );
      case 2:
        return <AccountInfo initialValues={formData.accountInfo} prevStep={prevStep} onRegister={showSuccessModal} />;
      default:
        return null;
    }
  };

  return (
    <Card title="Register" className={classes.card}>
      <Steps
        current={currentStep}
        className={classes.steps}
        items={[
          {
            title: "Personal Info",
          },
          {
            title: "Address Info",
          },
          {
            title: "Account Info",
          },
        ]}
      />
      {formContent()}
      <SuccessModal visible={showModal} onClose={closeModal} />
    </Card>
  );
}
