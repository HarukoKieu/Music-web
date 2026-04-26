import { attachTokenInterceptor } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isLoaded } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  const [loading, setLoading] = useState(true);

  // Prevent multiple initializations (important in Strict Mode)
  const initialized = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (initialized.current) return;
    initialized.current = true;

    const initAuth = async () => {
      try {
        /**
         * Attach interceptor ONCE
         */
        attachTokenInterceptor(getToken);

        const token = await getToken();

        if (token) {
          await Promise.all([checkAdminStatus()]);

          if (userId) {
            initSocket(userId);
          }
        }
      } catch (error) {
        console.error("Auth provider error:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      disconnectSocket();
    };
  }, [isLoaded, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Loader className="size-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
