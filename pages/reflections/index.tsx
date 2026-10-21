import Head from "next/head";
import React from "react";
import PageLayout from "../../components/Header/PageLayout";
import { client } from "../../utils/client";
import Reflections from "../../components/reflections/Reflections";

const ReflectionsPage = ({ reflections }) => {
  return (
    <PageLayout>
      <Head>
        <title>
          Sauvik Banerjjee | Reflections | Thoughts | Perspectives
        </title>
        <meta
          name="description"
          content="Sauvik Banerjjee | Reflections — personal thoughts, perspectives, insights and contemplations on technology, futurism, AI, and the human condition"
        ></meta>
        <meta property="og:image" content="/Sauvik_Banerjjee_OgImage.png" />
      </Head>
      <h1 style={{ display: "none" }}>Reflections - Sauvik Banerjjee</h1>
      <Reflections reflections={reflections} />
    </PageLayout>
  );
};

export async function getStaticProps() {
  async function getContent() {
    // Fetches reflection entries from Sanity using the "reflection" document schema
    const CONTENT_QUERY = `*[_type == "reflection"] | order(_updatedAt desc) {
  ...,
  author->,
  mainImage {
    ...,
    asset->
  },
  mainVideo {
    ...,
    asset->
  },
  videoUrl,
  categories[]->,
  body
}
`;
    const content = await client.fetch(CONTENT_QUERY);
    return content;
  }

  const reflections = (await getContent()) || [];
  reflections.sort(
    (a, b) =>
      new Date(b._updatedAt || 0).getTime() -
      new Date(a._updatedAt || 0).getTime()
  );

  return {
    props: {
      reflections,
    },
    revalidate: 1,
  };
}

export default ReflectionsPage;
