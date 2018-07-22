const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const app = express();
const keys = require('./config/keys');
require('./models/User');
require('./config/passport')(passport);
const index = require('./routes');
const auth = require('./routes/auth');

// Mongoose Setup
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURL, {
  useNewUrlParser: true
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.log(err));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// Global Variables
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});
// Routing
app.use('/', index);
app.use('/auth', auth);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})