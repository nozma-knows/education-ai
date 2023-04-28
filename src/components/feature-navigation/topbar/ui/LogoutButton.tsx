import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SignoutMutation } from "@/components/graph";
import IconButton from "@/components/ui/buttons/IconButton";
import { HiOutlineLogout } from "react-icons/hi";
import { magic } from "@/lib/magic";
import { useContext } from "react";
import UserContext from "@/lib/UserContext";

export default function LogoutButton() {
  const router = useRouter();

  const { setUser } = useContext(UserContext);

  const signout = () => {
    magic?.user.logout().then(() => {
      setUser(null);
      router.push("/");
    });
  };

  return (
    <div className="bg-green-400 flex">
      <IconButton Icon={HiOutlineLogout} onClick={() => signout()} />
    </div>
  );
}
