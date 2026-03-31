import { FaWhatsapp } from "react-icons/fa6";
import Lottie from "lottie-react";
import mob_whatsapp_icon from '../../src/mob_whatsapp_icon.json'
import desk_whatsapp_icon from '../../src/desk_whatsapp_icon.json'

const WhatsAppButton = () => {
  return (
     <a href="https://wa.me/9363414353" target="blank">
      <Lottie
        animationData={mob_whatsapp_icon}
        loop={true}
        autoplay={true}
        className=" w-full block sm:hidden"
      />

      <Lottie
        animationData={desk_whatsapp_icon}
        loop={true}
        autoplay={true}
        className=" w-full hidden sm:block"
      />
      </a>
  );
};

export default WhatsAppButton;