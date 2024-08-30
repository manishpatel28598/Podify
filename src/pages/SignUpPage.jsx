import React, { useState } from "react";
import Header from "../components/Header";
import Signupform from "../components/SignupComponent/Signupform";
import Loginform from "../components/SignupComponent/LoginForm";

function SignUpPage() {
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        {!flag ? <h3>SignUp</h3> : <h3>Login</h3>}
        {!flag ? <Signupform /> : <Loginform />}
        {!flag ? (
          <p style={{cursor: "pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account? Click here to Login.</p>
        ) : (
          <p style={{cursor: "pointer"}} onClick={()=>setFlag(!flag)}>Don't have an Account? Clcik here to SignUp.</p>
        )}
      </div>
    </div>
  );
}

export default SignUpPage;
