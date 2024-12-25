export const dynamic = 'force-dynamic'
import Footer from "@components/Footer";
import ShopProducts from "@components/ShopProducts";


const Page = ({searchParams}) => {
    return(
        <>
            <ShopProducts searchParams={searchParams} />
            <Footer />
        </>
    );
};

export default Page;