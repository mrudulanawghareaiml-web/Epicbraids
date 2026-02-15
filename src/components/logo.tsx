import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/logo.png"
        alt="EpicBraids Logo"
        width={120}
        height={120}
        priority
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}
