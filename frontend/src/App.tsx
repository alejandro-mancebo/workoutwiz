// import './App.css'
import { Section } from "./components/sections";
import IMAGES from "./assets/images";
import { Header } from "./components/header";

function App() {
  return (
    <div className="   h-screen ">
      <Header />
      {/* <h1 className=" from-neutral-200  text-ww-red">WorkoutWiz</h1> */}
      <div className="container mx-auto px-40">
        <Section
          src={IMAGES.man_in_gym_1.img}
          alt={IMAGES.man_in_gym_1.alt}
          title={"Work Hard to Get Better Life"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
          }
          position={false}
        />
        <Section
          src={IMAGES.man_in_gym_2.img}
          alt={IMAGES.man_in_gym_2.alt}
          title={"Work Hard to Get Better Life"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
          }
          position={true}
        />
        <Section
          src={IMAGES.man_in_gym_3.img}
          alt={IMAGES.man_in_gym_3.alt}
          title={"Work Hard to Get Better Life"}
          content={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut"
          }
          position={false}
        />
      </div>
    </div>
  );
}

export default App;
