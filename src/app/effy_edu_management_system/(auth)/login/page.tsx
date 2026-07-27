// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { LoginView } from "./login-view";

/** Demo login is always available; no backend session is required. */
export default function LoginPage() {
  return <LoginView />;
}
