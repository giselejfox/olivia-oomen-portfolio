'use client'

import { useState } from "react";
import { pinnedImagesData } from "@/data/pinnedImagesData";

import ProjectModal from "@/components/honors-project/ProjectModal"
import BackgroundAndIcons from "@/components/honors-project/BackgroundAndIcons";
import IntroModal from "@/components/honors-project/IntroModal";
import { getWindowHeight } from "@/lib/utils";

// Determines which height to use based on the window height breakpoints set
function findIconHeight(imageData) {
    const windowHeight = getWindowHeight()
    if (windowHeight < 667) {
        return imageData.smHeight
    } else if (windowHeight >= 667 && windowHeight < 900) {
        return imageData.mdHeight
    } else if (windowHeight >= 900) {
        return imageData.lgHeight
    } 
}

export default function HonorsProject() {

  // ___ STATES ___

  // Takes the pinned images data and turns it into an object that looks like:
  // {bottle: true, sewing-machine: false, newspaper: true}
  // true means that the icon has been clicked on, false means it hasn't been clicked on yet
  const [projectIconStatus, setProjectIconStatus] = useState(
    pinnedImagesData.reduce((acc, icon) => {
      acc[icon.title] = false;
      return acc;
    }, {})
  );
  // Determines whether or not to show the intro modal
  const [showIntroModal, setShowIntroModal] = useState(true)
  // Determines whether or not the modal with the writing about a topic is showing
  const [showTopicModal, setShowTopicModal] = useState(false)
  // Sets what content to show inside the modal based on what icon you clicked on
  const [topicModalContentTitle, setTopicModalContentTitle] = useState("")


  // ___ HANDLERS ___
  const handleCloseIntroModal = () => setShowIntroModal(false)
  const handleCloseTopicModal = () => setShowTopicModal(false);
  const handleProjectClick = (contentTitle) => {
    // Tells the modal what to show, opens the modal, and changes the status of the icon to true so it turns from white to the image
    setTopicModalContentTitle(contentTitle)
    setShowTopicModal(true)
    // If the project hasn't been clicked before it updates the status to having been clicked
    if (!projectIconStatus[contentTitle]) {
      const newProjectIconStatusHolder = {...projectIconStatus, [contentTitle]: true}
      setProjectIconStatus(newProjectIconStatusHolder)
    }
  }


  // ___ ELEMENT BUILDERS ___

  // This takes the data we made about the icons and turns it into html
  const pinnedImageElements = pinnedImagesData.map((imageData, index) => {
    const iconHeight = findIconHeight(imageData)
    // If the icon is labeled as having been clicked (projectIconStatus[title] = true) we show the clicked version, otherwise the unclicked version
    return (
      <button type="button" onClick={() => handleProjectClick(imageData.title)} key={index} className="topic-icon" style={{top:imageData.percentFromTop, left:imageData.percentFromLeft}}>
        {projectIconStatus[imageData.title] && <img style={{height: iconHeight}} src={"img/honors-project/pinned-images/"+imageData.title+"-clicked.png"} alt={imageData.altText} /> }
        {!projectIconStatus[imageData.title] && <img style={{height: iconHeight}} src={"img/honors-project/pinned-images/"+imageData.title+"-unclicked.png"} alt={imageData.altText} /> }
      </button>
    )  
  })


  // ___ RETURN STATEMENT ___

  return (
    <div className="App">
      <BackgroundAndIcons pinnedImageElements={pinnedImageElements} />
      <IntroModal showModal={showIntroModal} handleCloseModal={handleCloseIntroModal} />
      <ProjectModal showModal={showTopicModal} modalContentTitle={topicModalContentTitle} handleCloseModal={handleCloseTopicModal} />
    </div>
  );
}


