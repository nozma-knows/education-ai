import { useState, useEffect } from "react";
import EducationAILogo from "@/icons/logo.svg";
import { useCookies } from "react-cookie";
import { Tabs, LogoutButton, Dropdown } from "./ui";
import Logo from "@/components/ui/icons/Logo";
import useWindowSize, {
  ScreenOptions,
} from "@/components/utils/hooks/useWindowSize";

const title = "EducationAI";

const tabs = (token?: string) => {
  if (token) {
    return [
      {
        label: "Courses",
        link: "/app/courses",
      },
    ];
  }
  return [
    {
      label: "Login",
      link: "/auth/login",
    },
    {
      label: "Sign up",
      link: "/auth/signup",
    },
  ];
};

export default function Topbar() {
  const [{ token }] = useCookies(["token"]);
  const size = useWindowSize();

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
      <Logo Icon={EducationAILogo} text={title} altText="EducationAI Logo" />
      <div className="flex gap-4">
        {showDropdown ? (
          <Dropdown tabs={tabs(token)} />
        ) : (
          <Tabs tabs={tabs(token)} />
        )}

        {token && <LogoutButton />}
      </div>
    </div>
  );
}
