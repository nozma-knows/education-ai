import useWindowSize from "@/components/utils/hooks/useWindowSize";
import dynamic from "next/dynamic";
const Topbar = dynamic(() => import("@/components/feature-navigation/topbar"), {
  ssr: false,
});

interface PageProps {
  hideTopbar?: boolean;
  noPadding?: boolean;
  children: JSX.Element;
  bgColor?: string;
}

export default function Page({
  hideTopbar = false,
  noPadding = false,
  children,
  bgColor,
}: PageProps) {
  const { width: screenWidth, height: screenHeight } = useWindowSize();

  return (
    <div className="flex bg-main-dark text-main-dark w-full min-w-0 relative">
      <div
        className={`flex flex-col`}
        style={{ width: screenWidth, height: screenHeight }}
      >
        {!hideTopbar && <Topbar />}
        <div
          className={`flex w-full h-full justify-center ${
            bgColor && `bg-[${bgColor}]`
          } overflow-hidden`}
        >
          <div
            className={`flex h-full overflow-auto max-w-[88rem] ${
              !noPadding && "px-2 pb-2 sm:px-8 sm:pb-2"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
