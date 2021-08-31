import * as cheerio from 'cheerio';
import axios from 'axios'

const featured = (req, res)=> {
    // const base_url = 'https://m.cricbuzz.com'
    const match_url = 'https://m.cricbuzz.com'

    let str = match_url
    let live_url = str.replace('www', 'm')

    axios.get(live_url)
        .then(function (response) {
            const $ = cheerio.load(response.data)

            const listGroup = $('.list-group')
            const content = $(listGroup[0]).children()

            const matchList = []

            for (let i = 1; i < content.length - 1; i++) {
                const link = $(content[i])['0'].attribs.href
                const header = $(content[i]).find('.matchheader').text()
                const status = $(content[i])
                    .find('.list-content > :last-child')
                    .text()
                const teamA = $(content[i])
                    .find('.list-content > :first-child > :first-child')
                    .text()
                const teamB = $(content[i])
                    .find('.list-content > :first-child > :last-child')
                    .text()

                matchList.push({
                    header: header,
                    teamA: teamA,
                    teamB: teamB,
                    status: status,
                    link: match_url + link,
                })
            }

            const result = {
                featured: matchList,
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

export default featured