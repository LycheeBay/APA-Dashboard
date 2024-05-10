import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useState} from 'react';
import apaLogo from '../data/apa-logo.png';
//import '../styles/navbar.css';

function NavBar() {
  const [color, setColor] = useState('All');
  const [building, setBuilding] = useState('All');

  // const history = useHistory();

  const handleSearch = () => {
    const url = `search?keyword=${document.getElementById('searchInput').value}&color=${color}&location=${building}`;
    const pathnameParts = window.location.href.split('/');
    console.log(pathnameParts);
    if (pathnameParts[pathnameParts.length - 1].startsWith('search')) {
      pathnameParts.pop();
      const newUrl = pathnameParts.join('/');
      window.location.href = `${newUrl}/${url}`;
    }
    else {
      window.location.href = `/${url}`;
    }
  };

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
        <Row xs="auto">
          <Col>
            <img src={apaLogo} alt="logo" height="55px" />
          </Col>
          <Col>
            <Form.Control id="searchInput" placeholder="Enter a keyword" />
          </Col>
          <Col>
            <Button onClick={handleSearch}>Search</Button>
          </Col>
          <Col>
            <DropdownButton id="color-dropdown" title={color === "All" ? "Select Volunteer Color" : color} onSelect={function(evt){console.log(evt); setColor(evt);}}>
              <Dropdown.Item eventKey="">All Colors</Dropdown.Item>
              <Dropdown.Item eventKey="Silver">Silver</Dropdown.Item>
              <Dropdown.Item eventKey="Red">Red</Dropdown.Item>
              <Dropdown.Item eventKey="Orange">Orange</Dropdown.Item>
              <Dropdown.Item eventKey="Pink">Pink</Dropdown.Item>
              <Dropdown.Item eventKey="Purple">Purple</Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col md={3} className="g-0">
            <DropdownButton id="location-dropdown" title={building === "All" ? "Select Location" : building} onSelect={function(evt){console.log(evt); setBuilding(evt);}}>
            <Dropdown.Item eventKey="All">All Buildngs</Dropdown.Item>
            <Dropdown.Item eventKey="Building-1">Building 1</Dropdown.Item>
            <Dropdown.Item eventKey="Building-2">Building 2</Dropdown.Item>
            <Dropdown.Item eventKey="Building-3">Building 3</Dropdown.Item>
            <Dropdown.Item eventKey="Building-4">Building 4</Dropdown.Item>
            <Dropdown.Item eventKey="Building-5">Building 5</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NavBar;
