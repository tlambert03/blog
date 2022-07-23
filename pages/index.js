import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
// import Layout from '../components/Layout2';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import { getGlobalData } from '../utils/global-data';
import { getPosts } from '../utils/mdx-utils';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="mb-12 text-center text-3xl lg:text-5xl">
          {globalData.blogTitle}
        </h1>
        <PostList posts={posts}></PostList>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
