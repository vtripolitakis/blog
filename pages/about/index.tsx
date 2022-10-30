import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import moment from "moment";
import Header from "../../components/Header";

const About = () => {
  return (
    <div>
      <Head>
        <title>I&apos;m lazy</title>
        <meta
          name="description"
          content="Evangelos Tripolitakis' boring blog about page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <Header />
        <div className="lg:w-1/2 mx-2 lg:mx-auto text-center">
            <div className="text-4xl">Evangelos Tripolitakis</div>
            <div className="text-2xl">Jack of all trades, master of none</div>
            <div className="text-2xl">E: vtripolitakis@__NOSPAM__me.com</div>
        </div>
      </main>
    </div>
  );
}

export default About;
