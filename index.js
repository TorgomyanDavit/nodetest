import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from 'dotenv';
dotenv.config();

export const app = express();
app.use(cookieParser());
app.use(session({
  cookie: { 
    // expires : getTokenExparationTime(),
    secure: false, // It means that the cookie will only be sent over HTTPS
    httpOnly: false, // inaccessible to JavaScript on the client side.
    sameSite:"strict" // inaccessible to JavaScript on the client side.
  },
  secret: "asdasdas654d5sd13asdasdas1d32as1d31a3",// This is the secret used to sign the session cookie.
  resave: false, // when false will only be saved back to the session store if changes were made during the request 
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  // name: 'connect.sid', // Customize the cookie name
}));

app.use(cors({
  origin: [
    'https://www.holtrinity.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials:true,
  optionsSuccessStatus: 200,          
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/', async (req, res) => {
  res.send('Hello,Test!');
});

app.get('/getToken', async (req, res) => {
  res.cookie('_csrf', "newCsrfToken", {
    secure: true, // It means that the cookie will only be sent over HTTPS
    httpOnly: false, // inaccessible to JavaScript on the client side.
    sameSite: 'none', // send cookie when open  browser's in address bar.
  });

  // Send the response to the client
  res.send({ name: 'Hello, TypeScript Express App!' });
});


app.listen(process.env.FLOWERS_BACKEND_PORT || 8000, () => {
  console.log(`PORT work -> ${process.env.FLOWERS_BACKEND_PORT}`);
});










// Controller Old
// import VideoRouterController from "./router/video/video.js";
// import AlbomRouterController from "./router/albom/albom.js";
// import UnionRouterController from "./router/union/union.js";
// import InfoRouterController from "./router/info/info.js";
// import PriestRouterController from "./router/priest/priest.js";
// import SubscriberUserController from "./router/subscriberUser/subscribUser.js";
// import AllTitleController from "./router/allTitle/allTitle.js";
// import NewsesController from "./router/newses/newses.js";
// import { Server } from 'socket.io';
// import { socket_connect } from "./socketIo/socketIo.js";
// import HeaderController from "./router/headerController/index.js";
// Authentication Admin
// app.use("/admin",CheckGlobalAdminAuthenticated);
// app.use(AuthRouterController);
// app.use(VideoRouterController);
// app.use(AlbomRouterController);
// app.use(UnionRouterController);
// app.use(InfoRouterController);
// app.use(PriestRouterController);
// app.use(SubscriberUserController);
// app.use(AllTitleController);
// app.use(NewsesController);
// app.get("/users",async (req, res) => {
//   const query = 'SELECT * FROM users';
//   const users = await pool.query(query)
//   return res.send({success:true,status:true,data:users,message:'users are delivered !'});
// });