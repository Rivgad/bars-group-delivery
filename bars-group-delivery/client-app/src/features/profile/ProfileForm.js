import { object, string } from 'yup';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import { Button, Col, Form, Row } from 'react-bootstrap';
import phoneSchema from '../common/phoneShema';
import { updateUserInfo } from './profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RequestStatus } from '../../helpers';
import PageLoadingIndicator from '../common/PageLoadingIndicator';
import ErrorIndicator from '../common/ErrorIndicator';


const nameRegExp = /([\D{L}]{3,}$)/g;

const schema = object({
    name: string()
        .matches(nameRegExp, 'Неверный формат имени (только буквы, не менее 3 букв)'),
    phone: phoneSchema
});

const ProfileForm = () => {
    const dispatch = useDispatch();

    const onSubmit =(values)=>{
        dispatch(updateUserInfo(values))
    }
    let phone = useSelector(state => state.profile.phone);
    let name = useSelector(state => state.profile.name);

    const status = useSelector(state=> state.profile.status);
    const isLoading = status === RequestStatus.Loading;
    const isError = status === RequestStatus.Failed;
    const errorCode = useSelector(state=> state.profile.errorCode);

    if(isLoading === true){
        return <PageLoadingIndicator/>
    }
    if(isError === true && !errorCode){
        return <ErrorIndicator/>
    }
    
    return (
        <Formik
            validationSchema={schema}
            onSubmit={onSubmit}
            initialValues={{
                name: name ?? "",
                phone: phone ?? "",
            }}
            enableReinitialize
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
                                isInvalid={!!errors.phone || errorCode}
                                value={values.phone}
                                type="text"
                                name="phone"
                                customInput={Form.Control}
                            />
                            {
                                errorCode === "DuplicateUserName" ?
                                    <Form.Control.Feedback type="invalid">
                                        Телефонный номер уже занят
                                    </Form.Control.Feedback>
                                    :
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone}
                                    </Form.Control.Feedback>
                            }
                        </Form.Group>
                    </Row>

                    <Button type="submit" className=' w-100' size='lg' disabled={isLoading}>Сохранить</Button>
                </Form>
            )}
        </Formik>
    )
}

export default ProfileForm;