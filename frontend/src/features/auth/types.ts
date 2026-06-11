export type AuthUser = {
  name: string;
  role: string;
};

export type AuthModalProps = {
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
};
