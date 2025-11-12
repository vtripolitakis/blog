import Link from "next/link";

const Header = () => {
  return (
    <header className="text-center mb-12 pt-8">
      <Link href="/">
        <h1 className="text-6xl font-bold mt-8 mb-4 hover:text-orange-500 transition-colors duration-300 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent hover:from-orange-500 hover:to-orange-400">
          I&apos;m lazy
        </h1>
      </Link>
      <p className="text-slate-500 mb-8 text-lg italic font-light">Evangelos Tripolitakis&apos; blog</p>
      <nav className="flex justify-center gap-2 mb-16 mx-4">
        <Link href="/" className="px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-200 font-medium text-slate-700 hover:text-orange-500 border border-white/40">
          Home
        </Link>
        <Link href="/about" className="px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-200 font-medium text-slate-700 hover:text-orange-500 border border-white/40">
          About
        </Link>
        <a className="px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-200 font-medium text-slate-700 hover:text-orange-500 border border-white/40" href="https://github.com/vtripolitakis">
          Github
        </a>
        <a className="px-6 py-2 rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:shadow-md transition-all duration-200 font-medium text-slate-700 hover:text-orange-500 border border-white/40" href="https://twitter.com/vtripolitakis">
          Twitter
        </a>
      </nav>
    </header>
  );
};

export default Header;
