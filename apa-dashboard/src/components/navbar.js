import Nav from 'react-bootstrap/Nav';

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
      
    </div>
  );
}

export default NavBar;
