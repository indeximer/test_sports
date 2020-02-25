import React, { useState, useEffect } from 'react'


//api
import { getByAdversary as getMatchesByAdversary } from '../../api/matchesAPI'

//components
import { Container } from 'react-bootstrap'
import ListMathes from '../Common/ListMatches'
import Title from '../Common/Title'
import Loader from '../Common/Loader'
import Main from '../layout/main'

function AdversaryMatchList(props){
    const [matches, setMatches] = useState([])
    const [adversary, setadversary] = useState()
    const [loading, setLoading] = useState(true)
    const { match } = props

    useEffect(() =>{
        const abortController = new AbortController()
        const signal = abortController.signal

        getMatchesByAdversary(match.params.adversaryId, signal)
            .then(res => {
                setMatches(res.matches)
                setadversary(res.team)
                setLoading(false)
            })
            .catch(error => console.log(error))

        return function cleanup(){
            abortController.abort()
        }
    }, [])

    return(
        <Main showBackLink={true}>
            <Container className="pt-5">
                {adversary &&
                    <Title 
                    titleText={adversary.nome}
                    subTitleText={`${adversary.cidade} - ${adversary.estado}`}
                    titleImage={adversary.urlLogo}
                    titleImageAlt={`logo-${adversary.nome}`}/>
                }                
                {loading &&
                    <Loader />
                }
                <ListMathes matches={matches} loading={loading} />
            </Container>
        </Main>
    )
}

export default AdversaryMatchList