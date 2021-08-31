import express from 'express'
import featured from './controllers/featured.js'
import news from './controllers/news.js'
import recent from './controllers/recent.js'
import upcoming from './controllers/upcoming.js'

const router = express.Router()

router.get('/news',news)
router.get('/featured',featured)
router.get('/recent',recent)
router.get('/upcoming',upcoming)

export default router