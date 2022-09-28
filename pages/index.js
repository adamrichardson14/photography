import Head from "next/head";
import Hero from "../components/Hero";
import { GET_WEBSITE_INFO } from "../lib/queries";
import { fetchData } from "../lib/utils";

export const getStaticProps = async () => {
  const { websiteInformations, categories } = await fetchData(GET_WEBSITE_INFO);

  

  return {
    props: {
      websiteInfo: websiteInformations[0],
      categories,
    },
  };
};

export default function Home({ websiteInfo, categories }) {
  console.log(websiteInfo);
  return (
    <>
      <Head>
        <title>{websiteInfo.websiteTitle}</title>
        <meta name="description" content={websiteInfo.websiteDescription} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero info={websiteInfo} categories={categories} />
    </>
  );
}
