import express from "express"
import config from "config"
import connect from "./util/connect"
import logger from "./util/logger"
import routes from "./routes"


const app = express()

app.use(express.json())

const serverPort = config.get<number>("port")
app.listen(serverPort, async ()=>{
    logger.info(`App is running at http://localhost:${serverPort}`)

    await connect()

    routes(app)
})