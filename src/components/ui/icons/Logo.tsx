import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  Icon: string;
  text: string;
  altText: string;
}

export default function Logo({ Icon, text, altText }: LogoProps) {
  return (
    <Link
      href={"/"}
      className={`flex gap-4 text-2xl lg:text-3xl font-bold button`}
    >
      <div className="flex items-center gap-4 justify">
        <div className="relative flex w-14 h-14 lg:w-16 lg:h-16">
          <Image src={Icon} alt={altText} fill />
        </div>
        <div className="hidden sm:block font-lilita">{text}</div>
      </div>
    </Link>
  );
}
