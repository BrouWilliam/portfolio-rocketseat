const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express:server,
    autoescape: false,
    noCache: true
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

server.get('/video', function(req, res){
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id

    })
        if(!video){
            return res.send('Video not found')
        }

    return res.render('video', { item: video })
})

server.use(function(req, res){
    res.status(404).render('not-found')
})

server.listen(5000, function(){
    console.log('Server is runing')
})