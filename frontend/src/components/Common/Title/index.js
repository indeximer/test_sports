import React from 'react'

//style
import './_title.scss'

//components
import { Row, Col } from 'react-bootstrap'

function Title({ titleText, titleImage, titleImageAlt, subTitleText }){
    return(
        <Row>
            <Col className="section-title-wrapper d-flex align-items-center justify-content-center mb-5">
                {titleImage &&
                    <img src={titleImage} alt={titleImageAlt} />
                }
                <div>
                    <h1 className="section-title mb-0">
                        {titleText}
                    </h1>
                    {subTitleText &&
                        <h2 className="section-subtitle mb-0">
                            {subTitleText}
                        </h2>
                    }                    
                </div>
            </Col>
         </Row>
    )
}

export default Title