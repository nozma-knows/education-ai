import Link from "next/link";
import Logo from "@/components/ui/icons/Logo";
import MilboLogo from "@/icons/logo.svg";

const title = `EducationAI`;

export default function Topbar() {
  return (
    <div className="relative flex w-full items-center justify-start sm:justify-center pt-12 px-8 h-20 text-main-dark">
      <Link href="/" className="flex items-center gap-2">
        <Logo Icon={MilboLogo} text={title} altText="Milbo LLC Logo" />
      </Link>
    </div>
  );
}
