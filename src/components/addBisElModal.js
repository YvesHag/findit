import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, Row, Col, } from 'reactstrap';


const ChangeStatusForm = (props) => {

  console.log(props)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(prevState => !prevState);

  //const [selectedState, setSelectedState] = useState(props.roomStatus)

 /*  function getSelectedState(status){

    setSelectedState(status)

    console.log(selectedState)

  }
  */

  function preventReload(e){
    e.preventDefault();
    props.toggleModal()
  }
  

  return (
    <Modal isOpen={ props.toggleModalOpen } toggle={ props.toggleModal }>
      <ModalHeader toggle={ props.toggleModal} style={{ backgroundColor: props.statusColor }}><div>Add new BIS electrical cabinet</div></ModalHeader>
      <ModalBody>
        <Form>
          <Row className="form-group">
            <Col md={4}>
            <Label>El. Number :</Label>
              
            </Col>
            <Col md={7}>
                <Input id="ElNumberInput" name="ElNumberInput" type="text" />
            </Col>
          </Row>

          <Row className="form-group">
            <Col md={4}>
              Cabinet Name
            </Col>
            <Col md={7}>
                <Input id="CabinateNameInput" name="CabinateNameInput" type="text" />
            </Col>
          </Row>

          <Row className="form-group">
            <Col md={4}>
              PLC-Id
            </Col>
            <Col md={7}>
                <Input id="PLCIdInput" name="PLCIdInput" type="text" />
            </Col>
          </Row>

          <Row className="form-group">
            <Col md={4}>
              Location Level
            </Col>
            <Col md={7}>
                <Input id="LocationLavelInput" name="locationLavelInput" type="text" />
            </Col>
          </Row>
          <Button color="primary" onClick={(e)=>{preventReload(e)}} >Submit</Button>
        </Form>
      </ModalBody>
    </Modal>

  );
}

export default ChangeStatusForm;