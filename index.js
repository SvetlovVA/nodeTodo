const express = require('express')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = new express();
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views') // каталог где храняться все виды сайта
app.use(express.urlencoded({extended: true})) // чтоб Экспресс понимал данные принятые с формы из BODY
app.use(todoRoutes)
app.use(express.static(path.join(__dirname, 'public')))

async function start(){
    try {
        await mongoose.connect('mongodb+srv://nodetwo:nodetwo@cluster0.gsara.mongodb.net/nodetwo',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })

        app.listen(PORT, () => {
            console.log('Стартануло!');
        })

    } catch (e){
        console.log(e);
    }
}

start().then(r => '')


