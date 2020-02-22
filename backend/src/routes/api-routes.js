const { getTeamById } = require('../controllers/teamController')
const { getMatches, getMatchesByAdversary, getMatchesByChampionship } = require('../controllers/matchController')


module.exports = (app) => {
  // @TEAM methods
  app.get('/api/team/:teamId', getTeamById)

  // @MATCH methods
  app.get('/api/matches/:teamId', getMatches)
  app.get('/api/matches/:teamId/adversary/:adversaryId', getMatchesByAdversary)
  app.get('/api/matches/:teamId/championship/:championshipId', getMatchesByChampionship)
}