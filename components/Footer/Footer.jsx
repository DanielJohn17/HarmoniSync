import "./Footer.css";

const Footer = () => {
  return (
    <section className="w-full h-[275px] py-10 flex flex-col items-center gap-10 bg-gray-900">
      <div className="footer_content">
        <div className="footer_about">
          <h1 className="text-xl lg:text-3xl font-satoshi font-semibold">
            About Us
          </h1>

          <p className="font-extralight text-center text-sm lg:text-base">
            Discover and enjoy the best music tailored to your preferences. Our
            platform brings you personalized recommendations, trending tracks,
            and more.
          </p>
        </div>

        <div className="footer_contact">
          <h1 className="text-2xl lg:text-xl">Contact Us</h1>
          <p className="font-extralight">
            Email: nathanaelcheramlak7@gmail.com <br /> &emsp; &emsp;
            dyohannes764@gmail.com
          </p>
          <p className="font-extralight">Phone: +251 (94) 567-8901</p>
          <p className="font-extralight">Address: Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="footer_bottom">
        <p className="font-extralight">
          &copy; 2024 HarmoniSync. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
