// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ModalBodyContent from './ModalBodyContent';

/*

This build out the modal that pops up when you click on an icon

*/

export default function ProjectModal({showModal, modalContentTitle, handleCloseModal}) {
    
  const getCustomStyles = () => {
    switch (modalContentTitle) {
      case 'bottle':
        return { backgroundColor: '#00555A', color: 'white' };
      case 'sewing-machine':
        return { backgroundColor: '#910D0D', color: 'white' };
      case 'fabric':
        return { backgroundColor: '#720D57', color: 'white' };
      case 'laptop':
        return { backgroundColor: '#4B0062', color: 'white' };
      case 'record-player':
        return { backgroundColor: '#001D6E', color: 'white'};
      case 'newspaper':
        return { backgroundColor: '#AA3500', color: 'white'};
      case 'printer':
        return { backgroundColor: '#0D4E01', color: 'white'};
      case 'games':
        return { backgroundColor: '#522D06', color: 'white'};
      case 'headphones':
        return { backgroundColor: '#837107', color: 'white'};
      // Add more cases for other modalContentTitles as needed
      default:
        return { backgroundColor: 'white', color: 'black' }; // Default styles
    }
  };

  const getHeaderForTitle = (title) => {
    switch (title) {
      case 'sewing-machine':
        return 'Learning Sew Much About Softgoods!';
      case 'laptop':
        return 'System.out.println(“Who says coding can’t be creative?”);';
      case 'fabric':
        return 'Materials Matter!';
      case 'newspaper':
        return 'Illustration at The Daily';
      case 'record-player':
        return 'Ethnomusicology';
      case 'headphones':
        return 'Making Music';
      case 'games':
        return 'Yahtzee!';
      case 'bottle':
          return 'Tulips, Windmills, and Textbooks: Studying Abroad in the Netherlands';
      case 'printer':
        return 'Nailing It... Literally: Learning Manufacturing Techniques';
      case 'learningstatement':
          return 'Reflecting on My Learning';
      // Add cases for other titles as needed
      default:
        return title; // Use the title as is for the default
    }
  };

  // const customStyles = getCustomStyles();
  
    return (
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal">
        <Modal.Header style={{}} closeButton >
        {/* Dynamically set the modal title based on modalContentTitle */}
        <Modal.Title>{getHeaderForTitle(modalContentTitle)} </Modal.Title>
      </Modal.Header>
        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto'}}>
        <ModalBodyContent contentTitle={modalContentTitle} /></Modal.Body>
      </Modal>
    )
}
  