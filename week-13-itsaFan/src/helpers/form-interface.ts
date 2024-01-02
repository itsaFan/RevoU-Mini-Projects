export type RegistrationProps = {
  initialValues: {
    username: string;
    email: string;
    password: string;
  };
  onRegister: (data: { username: string; email: string; password: string }) => void;
};

export type LoginProps = {
  initialValues: {
    username: string;
    password: string;
  };
  onLogin: (data: { username: string; password: string }) => void;
};

export type Project = {
  _id: string;
  projectName: string;
  assignedGroup: {
    _id: string;
    members: Member[];
  };
};

export type Member = {
  _id: string;
  username: string;
};

// interface Project {
//   _id: string;
//   projectName: string;
//   assignedGroup: {
//     _id: string;
//     members: Member[];
//   };
// }

// interface Member {
//   _id: string;
//   username: string;
// }
