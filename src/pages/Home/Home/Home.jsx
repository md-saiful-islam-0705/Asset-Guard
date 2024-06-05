import About from "../About";
import Banner from "../Banner/Banner";
import Package from "../Package";
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <>
        <Helmet>
            <title>
                Home
            </title>
        </Helmet>
        <div>
            <Banner></Banner>
            <About></About>
            <Package></Package>
        </div>
        </>
    );
};

export default Home;