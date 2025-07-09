import { importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";
import { NextPage } from "next";

const Wrapper = getMDXComponents().wrapper;

interface PageProps {
  params: {
    mdxPath: string[];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Page: NextPage<PageProps> = async (props) => {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
};

export default Page;
