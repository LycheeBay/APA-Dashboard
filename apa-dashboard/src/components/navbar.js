import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function NavBar() {
  return (
    <div className="NavBar">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossorigin="anonymous"
      />
      <Nav> 
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/tlac">TLAC</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/others">Others</Nav.Link>
        </Nav.Item>
      </Nav>
      <Form>
        <Row className="g-0">
          <Col md={2} className="g-0">
            <img src="/../data/apa-logo.png" alt="logo" />
          </Col>
          <Col md={3} className="g-0">
            <Form.Control placeholder="Disabled input" />
          </Col>
          <Col md={1} className="g-0">
            <Button>Search</Button>
          </Col>
          <Col md={3} className="g-0">
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={3} className="g-0">
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NavBar;
