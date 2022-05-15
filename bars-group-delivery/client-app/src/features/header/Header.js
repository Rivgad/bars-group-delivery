import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
} from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../auth/authSlice';
import BasketOffcanvasButton from '../basket/BasketOffcanvasButton';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

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
                        <Nav.Link>Меню</Nav.Link>
                    </Nav>
                    <Nav className='justify-content-end me-3'>
                        <Nav.Item className='me-1'>
                            {
                                currentUser ?
                                    <NavDropdown title="Личный кабинет" id="basic-nav-dropdown" align='end'>
                                        <NavDropdown.Item onClick={() => navigate('/profile')}>Мой профиль</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => navigate('/orders')}>Мои заказы</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item onClick={() => dispatch(logout())}>Выйти</NavDropdown.Item>
                                    </NavDropdown>
                                    :
                                    <NavLink to='login' className=' nav-link'>
                                        Войти
                                    </NavLink>
                            }
                        </Nav.Item>
                        <Nav.Item style={{ 'minWidth': 140 }}>
                            <BasketOffcanvasButton/>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;