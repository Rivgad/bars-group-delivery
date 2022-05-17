import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';
import BasketOffcanvasButton from '../basket/BasketOffcanvasButton';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);
    const handleClickLogout = () => dispatch(logout());
    return (
        <>
            <Navbar className='position-sticky' fixed='top' bg='light' expand="lg">
                <Container fluid>
                    <Link className='nav-link' to='/'>
                        <Navbar.Brand >
                            Название бренда
                        </Navbar.Brand>
                    </Link>
                    <Nav className="me-auto">
                        <LinkContainer to='/categories'>
                            <Nav.Link>Меню</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className='justify-content-end me-3'>
                        <Nav.Item className='me-1'>
                            {
                                currentUser ?
                                    <NavDropdown title="Личный кабинет" id="basic-nav-dropdown" align='end'>
                                        <LinkContainer to='/profile' >
                                            <NavDropdown.Item >Мой профиль</NavDropdown.Item>
                                        </LinkContainer>
                                        <LinkContainer to='/orders' >
                                            <NavDropdown.Item >Мои заказы</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={handleClickLogout}>Выйти</NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <LinkContainer to='/login' replace>
                                        <Nav.Link>
                                            Войти
                                        </Nav.Link>
                                    </LinkContainer>
                            }
                        </Nav.Item>
                        <Nav.Item style={{ 'minWidth': 140 }}>
                            <BasketOffcanvasButton />
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;