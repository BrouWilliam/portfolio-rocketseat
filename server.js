const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape: false
})

server.get('/', function(req, res){
    const about = {
        avatarUrl: 'https://avatars.githubusercontent.com/u/36682030?v=4',
        name: 'William Pereira',
        role: 'Desenvolvedor Front-end',
        description: 'Programador full-stack, focando em trazer soluções de tecnologia para o mercado',
        links: [
            {
                name: 'Github', url: 'https://github.com/BrouWilliam',
            },
            {
                name: 'Twitter', url: '',
            },
            {
                name: 'Linkedin', url: 'https://www.linkedin.com/in/william-xavier-pereira-06927915b'
            }
        ]

    }
    
    return res.render('about', { about })
})

server.get('/portfolio', function(req, res){
    return res.render('portfolio', { items: videos })
})

server.use(function(req, res){
    res.status(404).render('not-found')
})

server.listen(5000, function(){
    console.log('Server is runing')
})