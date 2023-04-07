import useWindowSize from "@/components/utils/hooks/useWindowSize";
import dynamic from "next/dynamic";
const Topbar = dynamic(() => import("@/components/feature-navigation/topbar"), {
  ssr: false,
});

interface PageProps {
  hideTopbar?: boolean;
  noPadding?: boolean;
  children: JSX.Element;
}

export default function Page({
  hideTopbar = false,
  noPadding = false,
  children,
}: PageProps) {
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  return (
    <div
      className={`flex flex-col bg-main-dark text-main-dark w-full min-w-0 relative  overflow-hidden ${
        !noPadding && "px-2 pb-2 sm:px-8 sm:pb-2"
      }`}
      style={{ width: screenWidth, height: screenHeight }}
    >
      {!hideTopbar && <Topbar />}
      <div className="flex w-full h-full overflow-auto">{children}</div>
    </div>
  );
}
