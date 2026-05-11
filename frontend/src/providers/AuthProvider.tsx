import { attachTokenInterceptor } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId, isLoaded } = useAuth();
  const { checkAdminStatus } = useAuthStore();
  const { initSocket, disconnectSocket } = useChatStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    const initAuth = async () => {
      try {
        attachTokenInterceptor(getToken);

        const token = await getToken();

        if (token) {
          await checkAdminStatus();

          if (userId) {
            initSocket(userId);
          }
        }
      } catch (error) {
        console.error("Auth provider error:", error);
      } finally {
        // Bây giờ setLoading(false) chỉ chạy SAU KHI Clerk đã sẵn sàng
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      disconnectSocket();
    };
  }, [
    getToken,
    userId,
    isLoaded,
    checkAdminStatus,
    initSocket,
    disconnectSocket,
  ]);
  //                    ^^^^^^^^ Thêm isLoaded vào dependency array

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
