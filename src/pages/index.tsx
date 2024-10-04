import { useAuthStore } from "@/store/auth";
import LoggedHome from "./_loggedHome";
import LandingPage from "./_landing";

const Home = () => {
  const token = useAuthStore((state) => state.token);

  return token ? <LoggedHome /> : <LandingPage />;
};

export default Home;
