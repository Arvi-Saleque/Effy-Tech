// @ts-nocheck -- Isolated generalized demo uses a dynamic local mock adapter.
import { RegisterView } from "./register-view";

/** Demo registration is always available and writes only to mock state. */
export default function RegisterPage() {
  return <RegisterView />;
}
