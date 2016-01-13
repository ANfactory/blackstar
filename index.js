var app = require('./src/server');

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => console.log(`App listening on port ${app.get('port')}`));