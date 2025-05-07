import Link from "next/link";
export default function Home() {
  return (
      <div className="flex justify-center items-center h-screen w-screen gap-16">
        <Link href={"/signup"} className="bg-blue-500 text-black rounded-xl px-4 py-2">signup</Link>
        <Link href={"/signin"} className="bg-orange-500 text-white rounded-xl px-4 py-2">signin</Link>
      </div>
  );
}
