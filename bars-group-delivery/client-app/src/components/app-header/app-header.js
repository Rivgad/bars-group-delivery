import {
    Container,
    Navbar,
    Nav,
} from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Basket3 } from 'react-bootstrap-icons';

const AppHeader = (props) => {
    const {onCartButtonClick, totalPrice } = props;
    
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
                        <Nav.Item>
                            <Nav.Link >
                                Личный кабинет
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{'minWidth':125}}>
                            <Nav.Link onClick={onCartButtonClick} className='  d-flex justify-content-center align-items-center'>
                                <Basket3 width={20} height={20} className='me-2'>
                                    
                                </Basket3>
                                {
                                    totalPrice != null ?
                                    `${totalPrice} ₽`
                                    :
                                    <span>Корзина</span>
                                }
                                
                            </Nav.Link>
                        </Nav.Item>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default AppHeader;