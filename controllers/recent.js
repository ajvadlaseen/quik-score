import * as cheerio from 'cheerio';
import axios from 'axios'

const recent = (req, res)=> {
    const base_url = 'https://m.cricbuzz.com'
    const match_url =
        'https://m.cricbuzz.com/cricket-match/live-scores/recent-matches'

    let str = match_url
    let live_url = str.replace('www', 'm')

    axios.get(live_url)
        .then(function (response) {
            const $ = cheerio.load(response.data)

            const content = $('#international-matches').children()
            // console.log(content.length)
            const matchList = []
            for (let i = 0; i < content.length; i++) {
                const series = $(content[i]).find('h4').text()
                const games = []
                const headers = $(content[i]).find('.matchheader')
                const allStatus = $(content[i]).find('.cbz-ui-status')
                const allScores = $(content[i]).find(
                    'div.ui-live-matches > div:nth-child(3) > div > div > h3'
                )

                const links = $(content[i]).find(
                    'div.ui-live-matches > div.btn-group.cbz-btn-group > a:nth-child(2)'
                )

                for (let j = 0; j < headers.length; j++) {
                    const header = $(headers[j]).text()
                    const status = $(allStatus[j]).text()
                    const teamA =
                        $(allScores[j])
                            .find('.ui-bowl-team-scores > div:first-child')
                            .text() ||
                        $(allScores[j]).find('.ui-allscores:first-child').text()

                    const teamAScore = $(allScores[j])
                        .find('.ui-bowl-team-scores > div:last-child')
                        .text()

                    const teamB =
                        $(allScores[j])
                            .find('.ui-bat-team-scores > div:first-child')
                            .text() ||
                        $(allScores[j]).find('.ui-allscores:last-child').text()

                    const teamBScore = $(allScores[j])
                        .find('.ui-bat-team-scores > div:last-child')
                        .text()

                    const link = base_url + $(links[j])['0'].attribs.href

                    games.push({
                        header: header,
                        teamA: teamA + ' - ' + teamAScore,
                        teamB: teamB + ' - ' + teamBScore,
                        status: status,
                        link: link,
                    })
                }
                matchList.push({
                    series: series,
                    games: games,
                })
            }

            const result = {
                recent: matchList,
            }

            res.json(result)
        })
        .catch(function (error) {
            if (!error.response) {
                console.log(error)
                res.json(error.message)
            } else {
                console.log(error.response)
                res.json(
                    'Something Went Wrong - Enter the Correct API URL' +
                        error.response
                )
            }
        })
}

export default recent