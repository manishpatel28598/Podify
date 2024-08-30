import React,{useState} from 'react'
import '../../../input/style.css'
import InputComponent from '../../../input';
import Button from '../../Button';
import {signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../../../firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Loginform() {
 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      console.log("Handling Login");
      setLoading(true);
      if (email && password) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
  
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const userData = userDoc.data();
          console.log("userData", userData);
  
          dispatch(
            setUser({
              name: userData.name,
              email: user.email,
              uid: user.uid,
            })
          );
          toast.success("Login Successful!");
          setLoading(false);
          navigate("/profile");
          // Navigate to the profile page
        } catch (error) {
          console.error("Error signing in:", error);
          setLoading(false);
          toast.error(error.message);
        }
      } else {
        toast.error("Make sure email and password are not empty");
        setLoading(false);
      }
    };

  return (
    <>
      
      <div className="input-wrapper">

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
        <Button text={"Login"} onClick={handleLogin}/>
    </div>
    </>
  );
}

export default Loginform
