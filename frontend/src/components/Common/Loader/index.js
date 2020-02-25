import React from 'react'

//style
import './_loader.scss'

//assets
import loader from '../../../assets/img/loading.gif'

//components
import { Row, Col } from 'react-bootstrap'

function Loader() {
    return(
        <Row className="loader">
            <Col className="text-center">
                <img className="loader-img" src={loader} alt="loader-gif" />
            </Col>
         </Row>
    )
}

export default Loader