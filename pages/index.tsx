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
          <ul>
            {articlesList.map((article: any) => {
              return (
                <li key={article.title} className="mb-6">
                  <Link href={`/posts/${article.slug}`}>
                    <p className="text-2xl font-semibold hover:underline hover:text-orange-400">{article.title}</p>
                  </Link>
                  <span className="text-slate-500">{moment(JSON.parse(article.date)).format("YYYY-MM-DD")}</span>
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
