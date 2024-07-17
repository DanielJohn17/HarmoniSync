import "@styles/LandingPage.css";
import Features from "@components/Features/Features";

const LandingPage = () => {
  const featuresData = {
    titles: ["Discover New Music", "Discover Artists", "Trending Now"],
    descriptions: [
      "Find new music that you'll love. With HarmoniSync, you can listen to music that you love and discover new music that you'll love.",
      "Stay ahead of the curve with our selection of up-and-coming artists and undiscovered talents.",
      "Keep your playlist fresh with the top trending songs of today. Explore the tracks that are capturing hearts and ears across the globe.",
    ],
    images: [
      "https://t3.ftcdn.net/jpg/06/72/05/68/360_F_672056808_NVyzr3kVZ71kUS0oraa8kAeNHZ2RAq50.jpg",
      "https://images.squarespace-cdn.com/content/v1/64d3a3420b7f45748ac93508/8c5f8c3e-4707-4df0-88c5-1604d9a01d8a/israel-palacio-Y20JJ_ddy9M-unsplash.jpg",
      "https://imageio.forbes.com/specials-images/imageserve/63674020d6a4c36877aecc35/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    ],
    isLeft: [false, true, false],
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* <Sidebar /> */}
      {featuresData.titles.map((title, index) => (
        <div key={index} className="w-full flex flex-col items-center">
          <Features
            title={title}
            description={featuresData.descriptions[index]}
            image={featuresData.images[index]}
            isLeft={featuresData.isLeft[index]}
          />
          {index <= 1 && <hr className="separate-feature" />}
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
