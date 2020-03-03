import { useState } from 'react'
import Link from 'next/link'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';

import {APP_NAME} from '../config'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <Link href="/">
            <NavLink className="font-weight-bold" >{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <Link href="/signup">
                    <NavLink>
                      Signup
                    </NavLink>    
                </Link>
            </NavItem>
            <NavItem>
                <Link href="/signin">
                    <NavLink>
                      Signin
                    </NavLink>    
                </Link>
            </NavItem>
            
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;