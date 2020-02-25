import React from 'react'
import { Link } from 'react-router-dom'

//style
import './_listmatches.scss'

//components
import { Row, Col, ListGroup } from 'react-bootstrap'

function ListMatches({ matches }){
    return(
        <Row className="mb-5 justify-content-center">
            <Col lg={9}>
                <ListGroup className="list-matches">
                    {matches.map((match, index) => (
                        <ListGroup.Item
                            key={index}
                            className="d-flex justify-content-between"
                            as="div"
                            variant="primary" >
                            <div className="match-results row m-0 w-100 align-items-center">
                                <div className="championship-info col-12 text-center">
                                    <p className="m-0">
                                        <Link to={`/championship/${match.idCampeonato}`}><strong>{match.nomeCampeonato}</strong></Link>
                                    </p>
                                    <p className="m-0"><strong>Rodada:</strong> {match.rodada} / <strong>Fase:</strong> {match.fase}</p>
                                </div>
                                <div className="team-info col p-0 d-flex align-items-center justify-content-between">
                                    <Link className="team-link d-flex" to={`/adversary/${match.idEquipeMandante}`}>
                                        <img src={match.equipeMandante.urlLogo} alt={`logo-${match.equipeMandante.nome}`} />
                                        {match.equipeMandante.nome}
                                    </Link>
                                    <div className="team-score">{match.placar.golsMandante}</div>
                                </div>

                                <div className="separator col-auto">x</div>

                                <div className="team-info col p-0 d-flex align-items-center justify-content-between">
                                    <div className="team-score">{match.placar.golsVisitante}</div>
                                    <Link className="team-link d-flex" to={`/adversary/${match.idEquipeVisitante}`}>
                                        <img src={match.equipeVisitante.urlLogo} alt={`logo-${match.equipeVisitante.nome}`} />
                                        {match.equipeVisitante.nome}
                                    </Link>                                            
                                </div>
                                <div className="additional-info col-12 text-center">
                                    <p className="m-0">
                                    <strong>Data:</strong> {match.dataDaPartida.dayOfMonth}/{match.dataDaPartida.monthValue}/{match.dataDaPartida.year}
                                    </p>
                                    <p className="m-0">
                                        <strong>Hora:</strong> {match.dataDaPartida.hour}:{match.dataDaPartida.minute}
                                    </p>
                                    <p className="m-0">
                                        <strong>Estádio:</strong> {match.nomeEstadio}
                                    </p>
                                </div>
                            </div>                              
                        </ListGroup.Item>
                    ))}                        
                </ListGroup>
            </Col>
        </Row>
    )
}

export default ListMatches