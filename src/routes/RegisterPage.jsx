import { SignUp } from "@clerk/clerk-react";

export const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] ">
      <SignUp signInUrl="/login" />
    </div>
  );
};
