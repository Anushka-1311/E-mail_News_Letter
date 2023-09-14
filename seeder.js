import User from './models/userModel.js'
import Template from './models/templateModel.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {users} from './data/users.js'
import {templates} from './data/templates.js'

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany()
        await Template.deleteMany()
        await User.insertMany(users)
        await Template.insertMany(templates)
        console.log("data added")
        process.exit()
    } catch (error) {
        console.log(`error appeared ${error}`)
        process.exit(1)        
    }
}

const destroyData = async () => {
    try {
        await Template.deleteMany()
        await User.deleteMany()
        console.log("data deleted")
        process.exit()

    } catch (error) {
        console.log(`error appeared ${error}`)
        process.exit(1)        
    }
}

if(process.argv[2] === '-d')
    destroyData()
else
    importData()