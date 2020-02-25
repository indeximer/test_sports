const fetch = require('node-fetch')
const { url, urlChampionships, urlBrazilCup, urlBrazilianChampionship } = require('../config/config.json')
const { findTeam }  = require('./teamController')
const { resolvePromises } = require('../utils/helpers')

async function findChampionship (championshipId) {
    const championshipPromisse = await fetch(`${urlChampionships}/${championshipId}.json`)
        .then(res => res.json())

    let championship = await resolvePromises([championshipPromisse])
    championship = championship.find(championship => championship.id == championshipId)
    return championship
}

const setChampionshipName = (matches) => {
    const newMatches = matches.map(match => (
        {
            nomeCampeonato: match.idCampeonato == 670 ? 'Copa do Brasil' : 'Campeonato Brasileiro',
            ...match
        }
    ))
    return newMatches
}

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
async function fetchStadium(stadiumId){
    const stadiums = await fetch(`${url}/estadios.json`)
        .then(res => res.json())

    let stadium = await stadiums
    stadium = stadium.data.find(stadium => stadium.id == stadiumId)
    return stadium.nome
}

const getStadium = (matches) => {
    const promises = matches.map(async (match) => {
        return match = {
            ...match,
            nomeEstadio: await fetchStadium(match.idEstadio),
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
    matches = await getStadium(matches)
    matches = setChampionshipName(matches)
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
    matches = await getStadium(matches)
    matches = setChampionshipName(matches)
    matches = {
        team: await findTeam(adversaryId),
        matches
    }
    response.json(matches)
}

async function getMatchesByChampionship(request, response) {
    const { teamId, championshipId } = request.params

    const championship = await fetch(`${urlChampionships}/${championshipId}/partidas.json`)
        .then(res => res.json())

    let matches = championship.data
    matches = matches.filter(match => match.idEquipeMandante == teamId || match.idEquipeVisitante == teamId)
    matches = await getTeams(matches)
    matches = {
        championship: await findChampionship(championshipId),
        matches
    }
    response.json(matches)
}

module.exports = { 
    getMatches,
    getMatchesByAdversary,
    getMatchesByChampionship
}