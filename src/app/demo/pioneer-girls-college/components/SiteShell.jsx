import Header from "./Header";
import Footer from "./Footer";

export default function SiteShell({ children }) {
  return (
    <div className="pioneer-college-demo">
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
