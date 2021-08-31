import * as cheerio from 'cheerio';
import axios from 'axios'

const news = (req, res)=> {
    const match_url = 'https://m.cricbuzz.com'

    let str = match_url
    let live_url = str.replace('www', 'm')

    axios.get(live_url)
        .then(function (response) {
            const $ = cheerio.load(response.data)
            const content = $('.home-page-news')
            const newsList = []
            for (let i = 0; i < content.length; i++) {
                const link = $(content[i])['0'].attribs.href
                const text = $(content[i]).text()
                const img = $(content[i]).find('img')['0'].attribs.src

                newsList.push({
                    headline: text,
                    image:
                        'https://m.cricbuzz.com/a/img/v1/595x396/' +
                        img.slice(32),
                    link: match_url + link,
                })
            }

            const result = {
                news: newsList,
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

export default news