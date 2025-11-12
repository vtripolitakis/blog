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
      <main className="container mx-auto">
        <Header />
        <div className="lg:w-1/2 mx-2 lg:mx-auto">
          <ul className="space-y-4">
            {articlesList.map((article: any) => {
              return (
                <li key={article.title} className="group">
                  <Link href={`/posts/${article.slug}`}>
                    <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-white/40">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-2xl font-semibold group-hover:text-orange-500 transition-colors duration-200 flex-1">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 text-slate-600 flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-sm font-medium">{moment(JSON.parse(article.date)).format("DD/MM/YYYY")}</span>
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
