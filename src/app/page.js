import "../styles/LandingPage.css";
import Navbar from './_components/Navbar/Navbar';
import Sidebar from './_components/Sidebar/Sidebar';
import Features from './_components/Features/Features';
import Footer from './_components/Footer/Footer';

const LandingPage = () => {
  const title = "Discover New Music";
  const description = "Find new music that you'll love. With HarmoniSync, you can listen to music that you love and discover new music that you'll love.";
  const image = "https://t3.ftcdn.net/jpg/06/72/05/68/360_F_672056808_NVyzr3kVZ71kUS0oraa8kAeNHZ2RAq50.jpg";
  return (
    <div className="landing-main">
        <Navbar />
        {/* <Sidebar /> */}
        <Features title={title} description={description} image={image} isLeft={false}/>
        <hr className="separate-feature"/>
        <Features title={title} description={description} image={image} isLeft={true}/>
        <hr className="separate-feature"/>
        <Features title={title} description={description} image={image} isLeft={false}/>
        <Footer />
    </div>
  )
}

export default LandingPage
