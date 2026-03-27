import { useAuth } from "@clerk/react";
import { useState } from "react";

const AuthProvider = () => {
  const [getToken, userId] = useAuth();
  const [loading, setLoading] = useState(true);
  return <div></div>;
};

export default AuthProvider;
