import { GetServerSideProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";

interface IProps {
  data: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
}
const TestPage = (props: IProps) => {
  const { data: lala } = props;
  return <MDXRemote {...lala} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      const theData = matter(data);
      const content = theData.content;
      const mdxSource = await serialize(content, {
        mdxOptions: { rehypePlugins: [rehypeHighlight] },
      });
      return {
        props: {
          data: mdxSource,
        }, // will be passed to the page component as props
      };
    } else {
      return {
        props: {
          data: await serialize("failure"),
        },
      };
    }
  } catch {
    return {
      props: {
        data: await serialize("failure"),
      },
    };
  }
};

export default TestPage;
