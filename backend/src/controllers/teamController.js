const fetch = require('node-fetch')
const { urlBrazilCup, urlBrazilianChampionship } = require('../config/config.json')
const { resolvePromises } = require('../utils/helpers')

async function findTeam(teamId){
    const brazilCup = await fetch(`${urlBrazilCup}/equipes.json`)
        .then(res => res.json())
    const brazlianChampionship = await fetch(`${urlBrazilianChampionship}/equipes.json`)
        .then(res => res.json())

    const teams = await resolvePromises([brazilCup, brazlianChampionship])
    const team = teams.find(team => team.id == teamId)
    return team
}

async function getTeamById(request, response) {
    const { teamId } = request.params
    const team = await findTeam(teamId)   
    response.json(team)
}

module.exports = { findTeam, getTeamById }