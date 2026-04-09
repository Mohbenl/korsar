import Hero from "@/components/Hero";
import Categorie from "@/components/Categorie";
import About from "@/components/About";
import Whyus from "@/components/Whyus";
import TechInnovation from "@/components/Innovation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Home() {
    return(
        <>
            <Navbar />
            <Hero />
            <Categorie />
            <About />
            <Whyus />
            <TechInnovation />
            <Newsletter />
            <Footer />
        </>

    ); ;
}