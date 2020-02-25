import React from 'react'
import { Link } from 'react-router-dom'

//style
import './_navheader.scss'

//components
import { Navbar } from 'react-bootstrap'

function Navheader({ showBackLink }){
    return(
        <Navbar className="justify-content-between" expand="lg" variant="dark">
            <Navbar.Brand href="/"><img src="https://s3-sa-east-1.amazonaws.com/logos.footstast.net/88x88/gremio.png" alt="logo-gremio" /> Grêmio App</Navbar.Brand>
            {showBackLink &&
                <Navbar.Text>
                    <Link to="/">
                        <i className="fa fa-arrow-left cart"></i> Voltar
                    </Link>
                </Navbar.Text>
            }
        </Navbar>
    )
}

export default Navheader