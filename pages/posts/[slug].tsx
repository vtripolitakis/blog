import Head from "next/head";
import { GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface IProps {
  title: string;
  description: string;
  data: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { readFileSync } = require("fs");
  var path = require("path");

  //fetch from the filesystem or fail
  try {
    if (context.params && context.params.slug) {
      const postsDir = path.resolve(process.cwd(), "content");
      const data = readFileSync(
        path.join(postsDir, `${context?.params.slug}.md`),
        "utf8"
      );
      const postData = matter(data);
      const { data: postMetaData } = postData;
      const { title, description } = postMetaData;
      const content = postData?.content || "empty";
      const mdxSource = await serialize(content, {
        mdxOptions: { rehypePlugins: [rehypeHighlight] },
      });
      return {
        props: {
          title,
          description,
          data: mdxSource,
        }, // will be passed to the page component as props
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  const path = require("path");
  const fs = require("fs");
  const postsDir = path.resolve(process.cwd(), "content");
  try {
    const files = await fs.readdirSync(postsDir);
    const pathsList: { params: { slug: string } }[] = [];
    files.forEach(function (file: string) {
      pathsList.push({ params: { slug: file.replace(/\.[^/.]+$/, "") } });
    });
    return {
      paths: pathsList,
      fallback: false,
    };
  } catch {
    return {
      paths: [{ params: { slug: "c-to-wasm-for-lazy-people" } }],
      fallback: false,
    };
  }
};

const PostPage = (props: IProps) => {
  const { data, title, description } = props;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto">
        <Header />
        <div className="lg:w-3/5 mx-2" >
          <h2>{title}</h2>
          <MDXRemote {...data} />
        </div>
        <Footer />
      </main>
    </div>
  );
};
export default PostPage;
