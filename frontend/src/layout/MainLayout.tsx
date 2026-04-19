import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlaybackControls from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex flex-col h-screen text-white bg-black">
      <ResizablePanelGroup
        orientation="horizontal"
        className="flex flex-1 h-full p-2 overflow-hidden"
      >
        <AudioPlayer />
        {/* left sidebar */}

        <LeftSidebar />

        <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 transition-colors bg-black rounded-lg" />

            {/* right sidebar */}

            <FriendsActivity />
          </>
        )}
      </ResizablePanelGroup>

      <PlaybackControls />
    </div>
  );
};
export default MainLayout;
