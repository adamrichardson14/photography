import Link from "next/link";

export default function Nav({ info }) {
  return (
    <nav className="max-w-7xl px-4 sm:px-6 mx-auto text-black flex flex-col lg:flex-row lg:justify-between mt-8 lg:items-center absolute lg:left-1/2 lg:-translate-x-1/2 w-full">
      <div>
        <Link href="/">
          <a className="text-4xl font-bold tracking-wider">{info.name}</a>
        </Link>
      </div>
      {/* This is for Desktop*/}
      <ul className="hidden lg:flex space-x-5 leading-4 tracking-[0.64px]">
        <li className="border-black hover:text-gray-700 transition-colors duration-200 py-4 px-6 border-2 font-medium">
          <a href={`mailto:${info.emailAddress}`}>{info.emailAddress}</a>
        </li>
        <li className="border-black py-4 hover:text-gray-700 transition-colors duration-200 px-6 border-2 font-medium">
          <a href={`tel:${info.phoneNumber}`}>{info.phoneNumber}</a>
        </li>
      </ul>

      {/* This is for Mobile*/}
      <ul className="flex flex-col lg:hidden leading-4 tracking-[0.64px] space-y-4 mt-4 text-xl">
        <li className="font-medium">{info.emailAddress}</li>
        <li className="font-medium">{info.phoneNumber}</li>
      </ul>
    </nav>
  );
}
