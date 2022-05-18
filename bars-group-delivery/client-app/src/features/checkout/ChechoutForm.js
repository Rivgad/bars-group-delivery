import { Formik } from "formik";
import { Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { number, object, string } from "yup";
import { RequestStatus } from "../../helpers";
import phoneSchema from "../common/phoneShema";

const schema = object({
    phone: phoneSchema,
    address: string().required('Введите адрес'),
    entrance: number().min(0, 'Неверное значение').optional(),
    intercom: number().min(0, 'Неверное значение').optional(),
    floor: number().min(0, 'Неверное значение').optional(),
    flat: number().min(0, 'Неверное значение').optional(),
    comment: string().optional(),
})
const CheckoutFrom = ({ onSubmit }) => {
    const { isLoggedIn, user: currentUser } = useSelector(state => state.auth)
    const currentOrder = useSelector((state) => state.orders.currentOrder);
    const ordersEmpty = Object.entries(currentOrder).length !== 0;
    const isLoading = useSelector(state=> state.orders.status) === RequestStatus.Loading;

    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
                phone: isLoggedIn ? currentUser.phone : '',
                address: '',
                entrance: '',
                intercom: '',
                floor: '',
                flat: '',
                comment: ''
            }}
        >
            {({
                handleSubmit,
                handleChange,
                setFieldValue,
                values,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Label>
                        <h4>Доставка</h4>
                    </Form.Label>
                    <Row className='mb-3' >
                        <Col>
                            <FloatingLabel label='Номер телефона' controlId='validationFormikPhone'>
                                <NumberFormat
                                    disabled={isLoggedIn}
                                    format="+# (###) ###-##-##"
                                    mask="_"
                                    onValueChange={(values) => setFieldValue('phone', values.value)}
                                    isInvalid={!!errors.phone}
                                    value={values.phone}
                                    type="text"
                                    name="phone"
                                    customInput={Form.Control}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row className='mb-3' >
                        <Col>
                            <FloatingLabel label='Адрес доставки' controlId='validationFormikAddress'>
                                <Form.Control
                                    type='text'
                                    name='address'
                                    isInvalid={!!errors.address}
                                    placeholder="Адрес доставки"
                                    value={values.address}
                                    onChange={handleChange}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Row xs={2} md={4}>
                        <Col className='mb-4'>
                            <FloatingLabel controlId="entrance" label="Подъезд">
                                <NumberFormat
                                    allowNegative={false}
                                    onValueChange={(values) => setFieldValue('entrance', values.value)}
                                    isInvalid={!!errors.entrance}
                                    value={values.entrance}
                                    type="text"
                                    name="entrance"
                                    customInput={Form.Control}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col className='mb-4'>
                            <FloatingLabel controlId="intercom" label="Домофон">
                                <NumberFormat
                                    allowNegative={false}
                                    onValueChange={(values) => setFieldValue('intercom', values.value)}
                                    isInvalid={!!errors.intercom}
                                    value={values.intercom}
                                    type="text"
                                    name="intercom"
                                    customInput={Form.Control}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col className='mb-4'>
                            <FloatingLabel controlId="floor" label="Этаж">
                                <NumberFormat
                                    allowNegative={false}
                                    onValueChange={(values) => setFieldValue('floor', values.value)}
                                    isInvalid={!!errors.floor}
                                    value={values.floor}
                                    type="text"
                                    name="floor"
                                    customInput={Form.Control}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col className='mb-4'>
                            <FloatingLabel controlId="flat" label="Квартира">
                                <NumberFormat
                                    allowNegative={false}
                                    onValueChange={(values) => setFieldValue('flat', values.value)}
                                    isInvalid={!!errors.flat}
                                    value={values.flat}
                                    type="text"
                                    name="flat"
                                    customInput={Form.Control}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Form.Group className='mb-4' controlId="comment">
                        <Form.Label>Комментарий</Form.Label>
                        <Form.Control
                            value={values.comment}
                            onChange={handleChange}
                            name='comment'
                            type='text'
                            as='textarea'
                            placeholder="Напишите, как вас найти или пожелания для блюд..." />
                    </Form.Group>
                    <Button disabled={ordersEmpty || isLoading} type='submit' className='w-100' size='lg'>Заказать</Button>
                </Form>
            )}
        </Formik>
    );
}

export default CheckoutFrom;