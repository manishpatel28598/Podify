import React,{useState} from 'react'
import InputComponent from '../../../input';
import Button from '../../Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db } from '../../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { setUser } from '../../../slices/userSlice';


function Signupform() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSignup = async(e)=>{
        e.preventDefault();
        console.log("handling signUp....");
        setLoading(true);
        if(password == confirmpassword && password.length>=6 && fullName && email){
            try {
                // Creating user's account.
                const userCredential = await createUserWithEmailAndPassword(
                  auth,
                  email,
                  password
                );
        
                const user = userCredential.user;
                console.log("user", user);
                // Saving user's details.
                await setDoc(doc(db, "users", user.uid), {
                  name: fullName,
                  email: user.email,
                  uid: user.uid,
                  
                });

                 // Save data in the redux, call the redux action
                dispatch(
                  setUser({
                    name: fullName,
                    email: user.email,
                    uid: user.uid,
                  })
                );
                toast.success("User has been created!");
                setLoading(false);
                navigate("/profile");
            }catch(e){
                console.log("error", e);
                toast.error(e.message);
                setLoading(false);
            }
        }else{
          if(password!==confirmpassword){
            toast.error("Please make sure your password and confirm password matches")
          }
          else if(password.length<6){
            toast.error("Please make sure your password is more than 6 digits long");
          }
            // throw an error
            setLoading(false);
        }
        
    }

  return (
    <>
      
      <div className="input-wrapper">
        <InputComponent
          state={fullName}
          setState={setFullName}
          placeholder="full Name"
          type="text"
          required={true}
        />

        <InputComponent
          state={email}
          setState={setEmail}
          placeholder="email"
          type="text"
          required={true}
        />
        <InputComponent
          state={password}
          setState={setPassword}
          placeholder="Password"
          type="password"
          required={true}
        />

        <InputComponent
          state={confirmpassword}
          setState={setConfirmpassword}
          placeholder="Confirm Password"
          type="password"
          required={true}
        />  
        <Button text={loading ? "Loading..." :"Signup"} disabled = {loading} onClick={handleSignup}/>
    </div>
    </>
  );
}

export default Signupform;
