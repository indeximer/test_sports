import React, { useState, useEffect } from 'react'


//api
import { getByChampionship as getMatchesByChampionship  } from '../../api/matchesAPI'

//components
import { Container } from 'react-bootstrap'
import ListMathes from '../Common/ListMatches'
import Title from '../Common/Title'
import Loader from '../Common/Loader'
import Main from '../layout/main'

function ChampionshipMatchList(props){
    const [matches, setMatches] = useState([])
    const [championship, setChampionship] = useState()
    const [loading, setLoading] = useState(true)

    const { match } = props

    useEffect(() =>{
        const abortController = new AbortController()
        const signal = abortController.signal

        getMatchesByChampionship(match.params.championshipId, signal)
            .then(res => {
                setMatches(res.matches)
                setChampionship(res.championship)
                setLoading(false)
            })
            .catch(error => console.log(error))

        return function cleanup(){
            abortController.abort()
        }
    }, [])

    return(
        <Main showBackLink={true} >
            <Container className="pt-5">
                {championship &&
                    <Title 
                    titleText={championship.nome}
                    titleImage={championship.urlLogo}
                    titleImageAlt={`logo-${championship.nome}`}/>
                }                
                {loading &&
                    <Loader />
                }
                <ListMathes matches={matches} loading={loading} />
            </Container>
        </Main>
    )
}

export default ChampionshipMatchList