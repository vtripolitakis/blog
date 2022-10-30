import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import matter from "gray-matter";
import moment from "moment";

export const getStaticProps: GetStaticProps = async () => {
  const path = require("path");
  const fs = require("fs");
  const postsDir = path.resolve(process.cwd(), "content");
  try {
    const files = await fs.readdirSync(postsDir);
    const articlesList: { slug: string, title: string; date: string }[] = [];
    files.forEach(function (fileName: string) {
      const fileData = fs.readFileSync(path.join(postsDir, fileName), "utf8");
      const postData = matter(fileData);
      const { data: postMetaData } = postData;
      const { title, date } = postMetaData;
      articlesList.push({ slug: fileName.replace(/\.[^/.]+$/, ""), title, date: JSON.stringify(date) });
    });
    return {
      props: {
        articlesList,
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
      <main>
        <ul>
          {articlesList.map((article: any) => {
            return (
              <li key={article.title}>
                <Link href={`/posts/${article.slug}`}>
                <h2>{article.title}</h2>
                </Link>
                {moment(JSON.parse(article.date)).format("YYYY-MM-DD")}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
