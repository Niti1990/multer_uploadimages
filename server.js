// import express from 'express'
// import multer from 'multer'
// import path from 'path'

const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 5000

app.use(express.json())

//fileStorageEngine
const filestorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './images') //to tell multer save file from that folder
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + '--' + file.originalname)
	},
})
//middleware
//stroage property to save the file call from multer
const upload = multer({ storage: filestorageEngine })

// Route To Load Index.html page to browser
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

// create route and pass the middleware(upload)
//for single file
app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
	console.log(req.file)
	res.send('single File upload sucess')
})

//for multiple files
app.post('/multiple', upload.array('images', 5), (req, res) => {
	console.log(req.files)
	res.send('Multiple File upload sucess')
})

app.listen(port, () =>
	console.log(`App is listening at http://localhost:${port}`)
)
