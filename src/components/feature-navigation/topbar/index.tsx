import { useState, useEffect, useContext } from "react";
import rabbitHoleLogo from "@/icons/logo.svg";
import { useCookies } from "react-cookie";
import { Tabs, LogoutButton, Dropdown } from "./ui";
import Logo from "@/components/ui/icons/Logo";
import useWindowSize, {
  ScreenOptions,
} from "@/components/utils/hooks/useWindowSize";
import UserContext from "@/lib/UserContext";

const title = "rabbit hole";

const tabs = (issuer?: string | null) => {
  if (issuer) {
    return [
      {
        label: "Courses",
        link: "/app/courses",
      },
    ];
  }
  return [
    {
      label: "Pricing",
      link: "/pricing",
    },
    {
      label: "About",
      link: "/about",
    },
    {
      label: "Login",
      link: "/auth/login",
    },
    {
      label: "Get Started",
      link: "/auth/signup",
      className: "bg-[#64B6AC] px-4 py-2 rounded-lg",
    },
  ];
};

export default function Topbar() {
  const [{ token }] = useCookies(["token"]);
  const size = useWindowSize();

  const { user } = useContext(UserContext);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (size.screen === (ScreenOptions.MOBILE || ScreenOptions.SM)) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [showDropdown, size]);

  return (
    <div className="flex justify-between items-center px-4 sm:px-12 py-4">
      <Logo Icon={rabbitHoleLogo} text={title} altText="rabbit hole Logo" />
      <div className="flex gap-4">
        {showDropdown ? (
          <Dropdown tabs={tabs(user ? user.issuer : null)} />
        ) : (
          <Tabs tabs={tabs(user ? user.issuer : null)} />
        )}

        {user && user.issuer && <LogoutButton />}
      </div>
    </div>
  );
}
