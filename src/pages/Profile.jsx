import React from 'react'
import { useSelector } from "react-redux";
import Header from '../components/Header';
import { auth } from '../firebase';
import { getAuth, signOut } from 'firebase/auth';
import Button from '../components/Button';
import { toast } from 'react-toastify';


function Profile() {
const auth = getAuth();
const user1 = auth.currentUser;
// if (user1 !== null) {
//   // The user object has basic properties such as display name, email, etc.
//   var photoURL = user1.photoURL;

// console.log("photo Url:- ",photoURL);
//   // The user's ID, unique to the Firebase project. Do NOT use
//   // this value to authenticate with your backend server, if
//   // you have one. Use User.getToken() instead.
//   const uid = user1.uid;
// console.log("user unique id:- ",uid);

// }

    const user = useSelector((state)=>state.user.user)
    console.log("User>>>>", user);

    if (!user) {
        return <p>Loading...</p>;
    }

    const handleLogout = ()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success("User Logged Out!");
          }).catch((error) => {
            // An error happened.
            toast.error(error.message);
          });
    }

  return (
    <div>
      <Header/>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>
      <h1>{user.uid}</h1>
      <Button text={"Logout"} onClick={handleLogout}/>
    </div>
  )
}

export default Profile
