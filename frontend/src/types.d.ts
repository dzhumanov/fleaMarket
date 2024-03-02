export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}
export interface GlobalError {
  error: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  phoneNumber: number;
}

export interface Item {
  _id: string;
  user: User;
  title: string;
  description: string;
  category: {
    _id: string;
    title: string;
  };
  image: string;
  price: number;
}

export interface ItemMutation {
  title: string;
  description: string;
  category: string;
  image: File | null;
  price: string;
}

export interface Category {
  _id: string;
  title: string;
}
