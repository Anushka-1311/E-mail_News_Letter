import express from 'express'
import { authenticate, admin } from '../middlewares/authMiddleware.js'
import { subscribe, getVariables, sendMails } from '../controllers/templateController.js'

const router = express.Router()

router.route('/subscribe').post(authenticate,subscribe)

router.route('/getvariables/:name').get(authenticate,admin,getVariables)

router.route('/sendMails').post(authenticate,admin,sendMails)

export default router