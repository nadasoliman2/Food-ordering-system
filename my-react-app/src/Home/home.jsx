import AppNavbar from "../Components/navbar";
import Header from "../Components/header";
import Footer from "../Components/footer";
import CategorySection from "./categorySection";
import PopularDishesSection from "./popularDishSection";
import SpecialOffersSection from "./specialOffersSection";
import DeliverySection from "./deliverySection";


export default function Home() {
  return (
    <>
     
      <Header />
      <CategorySection></CategorySection>
      <PopularDishesSection></PopularDishesSection>
      <SpecialOffersSection/>
      <DeliverySection></DeliverySection>
   
    </>

  )
}
