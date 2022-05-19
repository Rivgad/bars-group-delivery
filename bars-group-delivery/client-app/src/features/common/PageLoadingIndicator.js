import { Spinner } from "react-bootstrap"

const PageLoadingIndicator = () => {
    return (
        <div className='d-flex justify-content-center p-5'>
            <Spinner animation="border" style={{ width: 300, height: 300 }} />
        </div>
    )
}

export default PageLoadingIndicator;