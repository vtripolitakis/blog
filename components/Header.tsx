import Link from "next/link";

const Header = () => {
  return (
    <div className="text-center mb-8">
      <Link href="/">
        <h1 className="text-5xl mt-8 hover:text-orange-500">I&apos;m lazy</h1>
      </Link>
      <nav className="flex mt-8 mb-16 lg:w-1/3 lg:mx-auto">
        <div className="basis-1/4"><Link href="/" className="mr-6 hover:underline hover:text-orange-500">Home</Link></div>
        <div className="basis-1/4"><Link href="/about" className="mr-6 hover:underline hover:text-orange-500">About</Link></div>
        <div className="basis-1/4"><a className="mr-6 hover:underline hover:text-orange-500" href="https://github.com/vtripolitakis">Github</a></div>
        <div className="basis-1/4"><a className="mr-6 hover:underline hover:text-orange-500" href="https://twitter.com/vtripolitakis">Twitter</a></div>
      </nav>
    </div>
  );
};

export default Header;
