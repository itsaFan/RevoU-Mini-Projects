export type PersonalInfoProps = {
  initialValues: {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
  };
  onSubmit: (data: { firstName: string; lastName: string; email: string; dob: string }) => void;
};

export type AddressInfoProps = {
  initialValues: {
    address: string;
    city: string;
    country: string;
    zipCode: string;
  };
  onSubmit: (data: { address: string; city: string; country: string; zipCode: string }) => void;
  prevStep: () => void;
};

export type AccountInfoProps = {
  initialValues: {
    username: string;
    password: string;
  };
  prevStep: () => void;
  onRegister: () => void;
};
