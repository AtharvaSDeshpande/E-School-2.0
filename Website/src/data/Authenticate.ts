export type AuthMode = "signin" | "signup";

export interface BaseAuthData {
  email: string;
  password: string;
}

export type AuthData = BaseAuthData &
  (
    | { mode: "signin" }
    | {
        mode: "signup";
        confirmPassword?: string;
        name?: string;
        phone?: string;
        [key: string]: string | undefined;
      }
  );

/** Describes a customizable input field */
export interface AuthField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  value?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  icon?: React.ReactNode;
}

/** Props for the AuthBlock component */
export interface AuthBlockProps {
  /** Determines whether to render Sign In or Sign Up view */
  mode: AuthMode;

  /** Called when the form is submitted */
  onSubmit: (data: AuthData[], mode: AuthMode) => void;

  /** Field definitions */
  fields?: AuthField[];

  /** Text customization */
  title?: string;
  subtitle?: string;
  submitButtonLabel?: string;
  switchModeLabel?: string;

  /** Callback for switching between modes */
  onSwitchMode?: (mode: AuthMode) => void;

  /** Visual customization */
  className?: string;
  style?: React.CSSProperties;
  inputClassName?: string;
  buttonClassName?: string;
  containerClassName?: string;

  /** State and feedback */
  loading?: boolean;
  errorMessage?: string;
  successMessage?: string;

  /** Optional custom renderers for full control */
  renderField?: (field: AuthField, mode: AuthMode) => React.ReactNode;
  renderButton?: (props: {
    onClick: () => void;
    label: string;
    mode: AuthMode;
  }) => React.ReactNode;
  renderFooter?: (mode: AuthMode) => React.ReactNode;

  /** Optional elements */
  logo?: React.ReactNode;
  onForgotPassword?: () => void;

  /** Accessibility / testing */
  formId?: string;
  testId?: string;
}
