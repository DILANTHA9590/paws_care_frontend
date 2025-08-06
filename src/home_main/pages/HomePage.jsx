import { motion, AnimatePresence, delay, color } from "framer-motion";

import Header from "../component/Header";

import OurServices from "../component/OurServices";

import PetSupportSection from "../component/PetSupportSection";
import AboutUs from "../component/AboutUs";
import DoctorHomeSection from "../component/DoctorHomeSection";
import Footer from "../component/Footer";
export default function HomePage() {
  return (
    <>
      <div className="h-full overflow-hidden overflow-y-auto">
        <Header />

        {/* Main container for the Services section */}
        <OurServices />
        <PetSupportSection />
        <AboutUs />

        <DoctorHomeSection />
        <Footer />
      </div>
    </>
  );
}
