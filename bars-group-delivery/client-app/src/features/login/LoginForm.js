import { Formik } from "formik";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { RequestStatus } from "../../helpers";
import { auth } from "../auth/authSlice";
import phoneSchema from "../common/phoneShema";

const schema = object({
    phone: phoneSchema,
    password: string()
        .required('Введите пароль')
})
const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = ({ phone, password }) => {
        dispatch(auth({ phone, password }))
    }
    const status = useSelector(state => state.auth.status);
    const isLoading = status === RequestStatus.Loading;

    return (
        <Formik
            validationSchema={schema}
            onSubmit={handleSubmit}
            initialValues={{
                phone: '',
                password: ''
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
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="validationFormikName">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control
                                type='password'
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button type="submit" className=' w-100' size='lg' disabled={isLoading}>
                        {
                            isLoading ?
                                <><Spinner
                                animation="border"
                                    as="span"
                                    role="status"
                                    size='sm'
                                    aria-hidden="true"
                                /></>
                                :
                                <>Войти</>
                        }
                    </Button>
                </Form>
            )}

        </Formik>
    );
}

export default LoginForm;