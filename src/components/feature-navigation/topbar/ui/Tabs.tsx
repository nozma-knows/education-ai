import { useRouter } from "next/router";
import Link from "next/link";

type TabType = {
  label: string;
  link: string;
  className?: string;
};

interface TabsProps {
  tabs: TabType[];
}

export default function Tabs({ tabs }: TabsProps) {
  const router = useRouter();

  const currentPath = `${router.pathname}`;
  return (
    <div className="flex gap-4">
      {tabs.map(({ label, link, className }) => {
        const onPath = link === currentPath; // True if tab corresponds to current path
        return (
          <Link
            className={`flex items-center ${className} ${
              onPath && "text-[#173F5F]"
            } text-lg font-semibold button`}
            key={label}
            href={link}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
