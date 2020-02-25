import React from 'react'

//style
import '../../index.scss'

//components
import { Container } from 'react-bootstrap'
import Navheader from './Navheader'

function Main(props){
    const { showBackLink, children} = props
    return(
        <Container fluid={true} className="px-0">
            <Navheader showBackLink={showBackLink} />
            {children}
        </Container>
    )
}
export default Main