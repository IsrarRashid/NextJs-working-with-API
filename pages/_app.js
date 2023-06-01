import "../styles/globals.css";
import Layout from "./components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  // Israr Rashid
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
