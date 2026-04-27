


import { FloatingPaws } from "@/components/custom/PetIllustrations";

import { VisualSidePets } from "./components/VisualSidePets";
import { FormLogin } from "./components/FormLogin";
import { RegisterForm } from "./components/RegisterForm";

type Mode = "login" | "register";


const AuthPage = ({ mode }: { mode: Mode }) => {


  return (

    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2 bg-gradient-hero relative">
      <FloatingPaws />
      
      {/* Form side */}
      {
        mode === "login" ? (< FormLogin />) : (<RegisterForm />)
      }

      <VisualSidePets />
    </div>

  );
};

export default AuthPage;