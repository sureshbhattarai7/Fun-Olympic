const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser")
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');

const User = require('./Model/userModel');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

require('dotenv').config({path: './config.env'});
const app = express();
const userRoute = require('./Route/userRoute');
const newsRoute = require('./Route/newsRoute');
const sportRoute = require('./Route/sportRoute');

const cors = require('cors');
const { default: mongoExpressSanitize } = require('mongo-express-sanitize');
require('./Database/databaseConnection');

app.use(mongoExpressSanitize());
app.use(helmet());

app.use(express.json());
app.use(cors());
app.use(xss());

app.use(cookieParser());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://127.0.0.1:5173']
    }
});

//socket connection
io.on("connection", async (socket) => {
    console.log('Successfully client is connected');
    // console.log(socket);
    var userID = socket.handshake.auth.token;
    console.log(userID);


    if (userID) await User.findByIdAndUpdate({ _id: userID }, { $set: { is_online: 1 } });

    socket.on('send_message', async (data) => {
        // console.log(data);

        io.emit('message', data);
    });

    socket.on('disconnect', async () => {
        console.log("Sorry client is been disconnected");

        var userID = socket.handshake.auth.token;
        console.log(userID);

        if (userID) await User.findByIdAndUpdate({ _id: userID }, { $set: { is_online: 0 } });


        // await User.findByIdAndUpdate({ _id: userID }, { $set: { is_online: 0 } });
    })

})

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})


//passportjs connection for google authentication
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    callbackURL: "/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: ['profile', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        console.log(cb);
        User.findOrCreate({ googleId: profile.id, fname: profile.name.givenName, lname: profile.name.familyName, email: profile.emails[0].value, photo: profile._json.picture }, function (err, user) {
            return cb(err, user);
        });

    }
));

app.get('/auth/google', passport.authenticate('google'));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        const userdetail = req.user;
        console.log(userdetail);

        const encodedUserDetail = encodeURIComponent(JSON.stringify(userdetail));
        res.redirect(`http://127.0.0.1:5173/userdashboard?data=${encodedUserDetail}`);
    });



const limiter = rateLimit({
    max: 100,
    windoMs: 60 * 60 * 1000,
    message: 'To many requests from this IP, please try again later in an hour!'
});
app.use(limiter);


app.use('/user', userRoute);
app.use('/news', newsRoute);
app.use('/sports', sportRoute);


const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`App is connected at ${PORT}`);
});
