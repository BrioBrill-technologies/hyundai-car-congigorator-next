import Image from "next/image";

export default function Header() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-8">
      <a href="/">
        <Image
          src='/logo.png'
          alt="logo"
          width={75}
          height={75}
          className="mx-auto mt-2"
        />
      </a>
    </div>
  );
}