const express = require("express")
const app = express()
app.use(express.json())

const projects = [
    {id:1, title: "Teste 1"},
    {id:2, title: "Teste 2"},
    {id:3, title: "Teste 3"},
]
let countRequest = 0

//middlewares
function checkIdExist(req, res, next){
    const {id} = req.params
    const findId = projects.find((obj) =>{
        return obj.id == id ? true : false
    })

    if(findId){
        next()
    } else {
        res.status(400).send("ID inexistente")
    }
}

app.use((req,res,next)=>{
    console.log(`${countRequest + 1}`)
    next()
})


//Litsar todos os projetos
app.get('/projects', (req,res) => {
    res.json(projects)
})

//Atualizadar o projeto
app.put('/projects/:id',checkIdExist,(req,res)=>{
    const {id} = req.params
    const {title} = req.body
    const newObj = projects.map(obj => 
         obj.id == id ? {...obj, title:title}: obj
    )
    res.json(newObj)
}) 
//Deletar o projeto
app.delete('/projects/:id',checkIdExist,(req,res)=>{
    const { id } = req.params
    const getIndex = projects.findIndex(b => b.id == id)
    projects.splice(getIndex,1)
    res.json(projects)
})

//adicionar o projeto
app.post('/projects', (req,res) => {
    const {id, title} = req.body
    projects.push(req.body)
    res.json(projects)
})

app.post('/projects/:id/tasks', checkIdExist,(req,res) => {
    const { id } = req.params
    const {title} = req.body
    const project = projects.find(b => b.id == id)
    project.tasks.push(title)
    res.json(projects)

})

app.listen(3000)