import { Card, CardContent } from "@/components/ui/card";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { api } from "../../lib/axios";
import { useNavigate } from "react-router";
const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) {
          return;
        }
        await api.post("/auth-callback", {
          id: user.id,
          username: user.username,
          imgUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in auth callback: ", error);
      } finally {
        navigate("/");
      }
    };
    syncUser();
  }, [isLoaded, user, navigate]);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 animate-spin text-emerald-500 " />
          <h3 className="text-xl font-bold text-zinc-400">Logging you in</h3>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
