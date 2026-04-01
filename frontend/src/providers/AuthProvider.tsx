import { api } from "@/lib/axios.ts";
import { useAuth } from "@clerk/react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
const updateApiToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log("Error in auth provider: ", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);
  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="size-8 animate-spin text-emerald-500 " />
      </div>
    );
  return <div>{children}</div>;
};

export default AuthProvider;
