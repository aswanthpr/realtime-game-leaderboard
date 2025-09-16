
import { createServer } from 'http';
import app from "./app"
import {initSocket} from "./socket/index"


const httpServer = createServer(app);

initSocket(httpServer);


httpServer.listen(process.env.PORT,()=>{
    console.log(`server is running on http:localhost:${process.env.PORT}`)
});
            