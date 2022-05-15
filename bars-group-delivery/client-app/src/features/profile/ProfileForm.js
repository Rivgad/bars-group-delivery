import { object, string } from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import { Button, Col, Form, Row } from 'react-bootstrap';

const phoneRegExp = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{11}$/;
const nameRegExp = /([\D{L}]$)/g
const schema = object({
    name: string()
        .required('Введите имя')
        .matches(nameRegExp, 'Неверный формат имени (только буквы)'),
    phone: string()
        .required('Введите номер телефона')
        .matches(phoneRegExp, 'Неверный формат номера телефона'),
});

const ProfileForm = ({name, phone, onSubmit}) => {
    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
                name: name,
                phone: phone,
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
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationFormikName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationFormikPhone">
                            <Form.Label>Номер телефона</Form.Label>
                            <NumberFormat
                                format="+# (###) ###-##-##"
                                mask="_"
                                onValueChange={(values) => setFieldValue('phone', values.value)}
                                isInvalid={!!errors.phone}
                                value={values.phone}
                                type="text"
                                name="phone"
                                customInput={Form.Control}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button type="submit" className=' w-100' size='lg'>Сохранить</Button>
                </Form>
            )}
        </Formik>
    )
}

export default ProfileForm;