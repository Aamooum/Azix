import "@styles/animations.css";

const RelatedProductsAnimation = ({ title }) => {
  return (
    <div className="flex items-center text-3xl text-white h-16 bg-black marquee-container w-full">
      <div className="marquee-content">
        {Array(5).fill(title).join(" // ")}
      </div>
    </div>
  );
};

export default RelatedProductsAnimation;
