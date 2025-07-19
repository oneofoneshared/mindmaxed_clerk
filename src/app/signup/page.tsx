import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <SignUp afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard" />;
}
