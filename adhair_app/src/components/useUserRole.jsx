import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

const useUserRole = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "Users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role); // Guarda el rol en el estado
        }
      }
    };
    
    fetchUserRole();
  }, []);

  return role;
};

export default useUserRole;
