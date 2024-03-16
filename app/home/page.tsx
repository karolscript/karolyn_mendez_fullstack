import Header from "../components/header/Header";
import { useSession } from 'next-auth/react';
import Layout from "../layout";
import Search from "../components/search/search";

const Home = () => {
  
    return (
        <>
          <Search />
        </>
    );
};

export default Home;