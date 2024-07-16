import "./Footer.css";

const Footer = () => {
  return (
    <footer>
    <div class="footer-about">
      <h3>About Us</h3>
      <p>
        Discover and enjoy the best music tailored to your preferences. Our
        platform brings you personalized recommendations, trending tracks, and
        more.
      </p>
    </div>

    <div class="footer-contact">
      <h3>Contact Us</h3>
      <p>Email: support@harmonisync.com</p>
      <p>Phone: +251 (94) 567-8901</p>
      <p>Address: Addis Ababa, Ethiopia</p>
    </div>

    <div class="footer-links">
      <h3>Quick Links</h3>
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 HarmoniSync. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer
