const fetch = require('node-fetch')
const { url, urlBrazilCup, urlBrazilianChampionship } = require('../config/config.json')
const { findTeam }  = require('./teamController')
const { resolvePromises } = require('../utils/helpers')


const getTeams = (matches) => {
    const promises = matches.map(async (match) => {
        return match = {
            ...match,
            equipeMandante: await findTeam(match.idEquipeMandante),
            equipeVisitante: await findTeam(match.idEquipeVisitante)
        }
    });
    return Promise.all(promises);
}

async function getMatches(request, response) {
    const { teamId } = request.params

    const brazilCup = await fetch(`${urlBrazilCup}/partidas.json`)
        .then(res => res.json())
    const brazlianChampionship = await fetch(`${urlBrazilianChampionship}/partidas.json`)
        .then(res => res.json())

    

    let matches = await resolvePromises([brazilCup, brazlianChampionship])
    matches = matches.filter(match => match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId)
    matches = await getTeams(matches)
    response.json(matches)
}

async function getMatchesByAdversary(request, response) {
    const { teamId, adversaryId } = request.params

    const brazilCup = await fetch(`${urlBrazilCup}/partidas.json`)
        .then(res => res.json())
    const brazlianChampionship = await fetch(`${urlBrazilianChampionship}/partidas.json`)
        .then(res => res.json())

    

    let matches = await resolvePromises([brazilCup, brazlianChampionship])
    matches = matches.filter(match => (match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId) && (match.idEquipeMandante == adversaryId || match.idEquipeVisitante == adversaryId))
    matches = await getTeams(matches)
    response.json(matches)
}

async function getMatchesByChampionship(request, response) {
    const { teamId, championshipId } = request.params

    const championship = await fetch(`${url}/${championshipId}/partidas.json`)
        .then(res => res.json())

    let matches = championship.data
    matches = matches.filter(match => match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId)
    matches = await getTeams(matches)
    response.json(matches)
}

module.exports = { 
    getMatches,
    getMatchesByAdversary,
    getMatchesByChampionship
}