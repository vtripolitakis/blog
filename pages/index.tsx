import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import moment from "moment";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const getStaticProps: GetStaticProps = async () => {
  const path = require("path");
  const fs = require("fs");
  const postsDir = path.resolve(process.cwd(), "content");
  try {
    const files = await fs.readdirSync(postsDir);
    const articlesList: { slug: string; title: string; date: string }[] = [];
    files.forEach(function (fileName: string) {
      const fileData = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      const postData = matter(fileData);
      const { data: postMetaData } = postData;
      const { title, date } = postMetaData;
      articlesList.push({
        slug: fileName.replace(/\.[^/.]+$/, ""),
        title,
        date,
      });
    });
    const sortedArticlesList = articlesList.sort((a, b)=>Date.parse(a.date) - Date.parse(b.date));
    return {
      props: {
        articlesList: sortedArticlesList.map(i=>{return {
          slug: i.slug,
          title: i.title,
          date: JSON.stringify(i.date)
        }}).reverse()
      }, // will be passed to the page component as props
    };
  } catch {
    return {
      props: {
        articlesList: [],
      },
    };
  }
};

export default function Home({ articlesList }: any) {
  return (
    <div>
      <Head>
        <title>I&apos;m lazy</title>
        <meta
          name="description"
          content="Evangelos Tripolitakis' boring blog"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto px-4">
        <Header />
        <div className="max-w-6xl mx-auto">
          <ul className="space-y-5 list-none p-0 m-0">
            {articlesList.map((article: any) => {
              return (
                <li key={article.title} className="group list-none">
                  <Link href={`/posts/${article.slug}`}>
                    <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 border border-white/50 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight m-0">
                            {article.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-blue-700 flex-shrink-0">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-base font-semibold">{moment(JSON.parse(article.date)).format("DD/MM/YYYY")}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </main>
    </div>
  );
}
