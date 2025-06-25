import Hero from "../component/hero";
import WhyChooseUs from "../component/WhyChooseUs";

const Home = () => {
  return (
    <>
      <div className="bg-amber-50/30">
        <Hero />
        <WhyChooseUs/>
      </div>
    </>
  );
};
export default Home;
