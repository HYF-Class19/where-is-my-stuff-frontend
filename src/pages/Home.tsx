
import Navbar from "../components/Home/Navbar";
import "./styles/Home.css";
import { withDarkMode } from "../context/WithDarkMode";

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      {/* <Menu /> */}
    </>
  );
};
export default withDarkMode(Home);
