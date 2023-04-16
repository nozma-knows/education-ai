import Link from "next/link";
import Logo from "@/components/ui/icons/Logo";
import rabbitHoleLogo from "@/icons/logo.svg";

const title = `rabbit hole`;

export default function Topbar() {
  return (
    <div className="relative flex w-full items-center justify-start sm:justify-center pt-12 px-8 h-20 text-main-dark">
      <Link href="/" className="flex items-center gap-2">
        <Logo Icon={rabbitHoleLogo} text={title} altText="rabbit hole Logo" />
      </Link>
    </div>
  );
}
