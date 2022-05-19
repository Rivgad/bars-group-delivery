import { Alert, Button, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NotFoundPage = () => {
  return (
    <Container fluid className='p-5'>
      <Alert variant='danger' className='d-flex justify-content-center flex-wrap p-4'>
        <Alert.Heading>Данной страницы не существует</Alert.Heading>
        <div className='w-100 d-flex justify-content-center flex-wrap mt-5'>
          <LinkContainer to='/'>
            <Button size='lg' className='w-50'>На главную</Button>
          </LinkContainer>
        </div>
      </Alert>
    </Container>
  );
}

export default NotFoundPage;