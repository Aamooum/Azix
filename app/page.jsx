import Footer from "@components/Footer";
import HomeStatic from "@components/HomeStatic";
import HomeDynamic from "@components/HomeDynamic";

export default function Home() {
  return (
    <div>
      <HomeStatic />
      <HomeDynamic />
      <Footer />
    </div>
  );
}