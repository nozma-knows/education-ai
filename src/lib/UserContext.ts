import { MagicUserMetadata } from "magic-sdk";
import { createContext } from "react";

type UserContentType = {
  user: MagicUserMetadata | null;
  setUser: (u: MagicUserMetadata | null) => void;
};

const UserContext = createContext<UserContentType>({
  user: null,
  setUser: (u: MagicUserMetadata | null) => {},
});

export default UserContext;
