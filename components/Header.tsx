import Link from "next/link";

const Header = () => {
  return (
    <header className="text-center mb-12 pt-8 relative">
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-bold mt-8 mb-4 transition-all duration-500 hover:scale-105 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl cursor-pointer">
          I&apos;m lazy
        </h1>
      </Link>
      <p className="text-white/90 mb-8 text-base md:text-lg italic font-light drop-shadow-lg">Evangelos Tripolitakis&apos; blog</p>
      <nav className="flex flex-wrap justify-center gap-3 mb-16 mx-4">
        <Link href="/" className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-base text-blue-700 hover:text-blue-900 border border-white/50 hover:border-blue-300">
          Home
        </Link>
        <Link href="/about" className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-base text-blue-700 hover:text-blue-900 border border-white/50 hover:border-blue-300">
          About
        </Link>
        <a className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-base text-blue-700 hover:text-blue-900 border border-white/50 hover:border-blue-300" href="https://github.com/vtripolitakis">
          Github
        </a>
        <a className="px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md hover:bg-white hover:scale-105 hover:shadow-2xl transition-all duration-300 font-semibold text-base text-blue-700 hover:text-blue-900 border border-white/50 hover:border-blue-300" href="https://twitter.com/vtripolitakis">
          Twitter
        </a>
      </nav>
    </header>
  );
};

export default Header;
