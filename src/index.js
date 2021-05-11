import app from './app'
require('./database');

app.listen(process.env.PORT, () => {
    console.log(`Server started on port `,process.env.PORT)
});