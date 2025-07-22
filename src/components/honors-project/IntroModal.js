import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

/*

This build out the modal that pops up when you originally enter the page

*/

export default function IntroModal({showModal, handleCloseModal}) {
    return (
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal" centered>
        <Modal.Body className="d-flex flex-column justify-content-center align-items-center text-center px-md-5 py-md-5">
            {/* Here is where you put the body text */}
            <h1 className='pb-md-3'>Welcome to my personal collection of souvenirs!</h1>
            <div className='pb-md-4'>This page is an interactive reflection on the experiences, 
              skills, and knowledge that have formed my perspective and fuelled 
              my passions as a designer. Click on the vibrant, colored areas to 
              delve into the stories that have shaped my creative journey. </div>
            <Button variant="secondary" onClick={handleCloseModal}>Let’s go!</Button>
        </Modal.Body>
        {/* <Modal.Footer className= "d-flex justify-content-center">
          <Button variant="secondary" onClick={handleCloseModal}>Let’s go!</Button>
        </Modal.Footer> */}
      </Modal>
    )
}
  