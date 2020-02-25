import React, { useState, useEffect } from 'react'


//api
import { getAll as getMatches } from '../../api/matchesAPI'

//components
import { Container } from 'react-bootstrap'
import ListMathes from '../Common/ListMatches'
import Title from '../Common/Title'
import Loader from '../Common/Loader'
import Main from '../layout/main'

function MatchList(props){
    const [matches, setMatches] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        const abortController = new AbortController()
        const signal = abortController.signal

        getMatches(signal)
            .then(res => {
                setMatches(res)
                setLoading(false)
            })

        return function cleanup(){
            abortController.abort()
        }
    }, [])

    return(
        <Main>
            <Container className="pt-5">
                <Title titleText="Todos os jogos do Grêmio"/>
                {loading &&
                    <Loader />
                }
                <ListMathes matches={matches} loading={loading} />
            </Container>
        </Main>
    )
}

export default MatchList