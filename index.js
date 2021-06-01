const express =require('express');
const hbs = require('express-handlebars');
const path = require ('path');
const nodemailer = require ('nodemailer'); 
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));
//Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: process.env.MAIL_USER, 
      pass: process.env.MAIL_PASS, 
    },
  });
  transporter.verify().then(()=>{
    console.log("Preparado para enviar correo!");
});


app.set("view engine", ".hbs")

app.set('views', path.join(__dirname, 'views'));
app.use((express.static (path.join(__dirname, "public"))));

app.engine(
    '.hbs',
hbs({
    defaultlayout: "main",
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partial'),
    extname: '.hbs'
}));

app.get('/', (req,res)=>{
    res.render('Index', {Ruta:'css/Style.css'});
 })


 app.get('/Video', (req,res)=>{
    res.render('Video', {Ruta:'css/Contacto.css'});
 })

 app.get('/Contactos', (req,res)=>{
   res.render('Contactos', {Ruta:'css/Contacto.css'});
})




 app. post ('/Contactos', async(req, res)=>{
  await transporter.sendMail({
  from: process.env.MAIL_USER,
  to:process.env.MAIL_USER, 
  subject: `${req.body.Nombre} requiere su atención sobre: ${req.body.Asunto}`, 
  html: `<h1>Nombre:${req.body.Nombre}</h1>
      <h1>Correo:${req.body.email}</h1>
      <h1>Telefono:${req.body.Celular}</h1>
      <h1>Solicita la siguiente información:</h1>
  <h1>${req.body.message}</h1>` 
});
  res.redirect('/');
})


app.listen(PORT,()=>{
    console.log (`Server on http://localhost:${PORT}`);
})