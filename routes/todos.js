const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')

router.get('/', async (req, res) => {
    const todos = await Todo.find({}).lean()
    /*
    По умолчанию запросы Mongoose возвращают экземпляр класса MongooseDocument.
    Документы намного тяжелее обычных объектов JavaScript, потому что у них много внутреннего состояния
    для отслеживания изменений. Включение этой опции "lean" указывает Mongoose пропустить создание полного
    документа Mongoose и просто предоставить вам POJO.
    */
    res.render('index', {
        title : "TODOS list",
        isIndex: true,
        todos
    })
})

router.get('/create', (req, res) => {
    res.render('create', {
        title : "Create",
        isCreate: true
    })
})

router.post("/create", async (req,res) => {
    // Создани объекта модели
    const todo = new Todo({
        title: req.body.title
    })
    // Сохранение объекта в БД
    await todo.save()
    res.redirect("/")
})

router.post("/complete", async (req, res) => {
    const todo = Todo.findById(req.body.id).lean()
    const cd = !!req.body.completed
    await todo.updateOne({complete: cd})
    res.redirect("/")
})

module.exports = router