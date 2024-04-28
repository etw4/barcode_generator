const express=require('express');
const {Canvas}=require('canvas');
const jsBarcode=require('jsbarcode');

const app=express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.render('index', {data:''});
})

app.post('/', (req, res)=>{
    const canvas=new Canvas();
    jsBarcode(canvas,req.body.qrcodee, {
        lineColor: '#0aa',
        width:4,
        height:40,
        displayValue:true
    });

    canvas.toDataURL('image/png', (err,png)=>{
        res.render('index', {data:png});
    })
})
const port=process.env.PORT||3000;

app.listen(port, console.log('server run at port', port));