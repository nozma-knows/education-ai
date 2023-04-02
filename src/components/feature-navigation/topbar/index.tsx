import MilboLogo from "@/icons/logo.svg";
import Logo from "@/components/ui/icons/Logo";

const title = "EducationAI";

export default function Topbar() {
  return (
    <div className="flex justify-between items-center px-4 sm:px-12 py-4">
      <Logo Icon={MilboLogo} text={title} altText="Milbo LLC logo" />
    </div>
  );
}
