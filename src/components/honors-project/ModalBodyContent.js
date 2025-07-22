import BottleContent from "./modal-contents/BottleContent"
import FabricContent from "./modal-contents/FabricContent"
import LaptopContent from "./modal-contents/LaptopContent"
import HeadphonesContent from "./modal-contents/HeadphonesContent"
import NewspaperContent from "./modal-contents/NewspaperContent"
import RecordplayerContent from "./modal-contents/RecordplayerContent"
import SewingmachineContent from "./modal-contents/SewingmachineContent"
import GamesContent from "./modal-contents/GamesContent"
import PrinterContent from "./modal-contents/PrinterContent"
import LearningstatementContent from "./modal-contents/LearningstatementContent"

/* 

This is where you link the components that contain the writing contents (stored in the modal-contents
folder) to an icon that's being clicked

*/

export default function ModalBodyContent({ contentTitle }) {
    return (
        <div>
            {contentTitle === "bottle" && <BottleContent />}
            {contentTitle === "fabric" && <FabricContent />}
            {contentTitle === "laptop" && <LaptopContent />}
            {contentTitle === "headphones" && <HeadphonesContent />}
            {contentTitle === "newspaper" && <NewspaperContent />}
            {contentTitle === "record-player" && <RecordplayerContent />}
            {contentTitle === "sewing-machine" && <SewingmachineContent />}
            {contentTitle === "games" && <GamesContent />}
            {contentTitle === "printer" && <PrinterContent />}
            {contentTitle === "learningstatement" && <LearningstatementContent />}
        </div>
    )
}
