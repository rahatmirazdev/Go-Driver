import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import { useState } from "react";

const SignInWithGoogle = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();

  const handleGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      {userData && (
        <div>
          <h1>Welcome {userData.displayName}</h1>
          <img src={userData.photoURL} alt={userData.displayName} />
        </div>
      )}

      <form action="">
        <button onClick={handleGoogle} className="btn btn-primary btn-block">
          Sign in with Google
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  );
};

export default SignInWithGoogle;
