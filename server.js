const express = require ('express');
const app = express();
const articlerouter = require ('./routes/articles');
const mongoose = require ('mongoose');
const Articles = require('./models/article')
const methodOverride = require('method-override');


mongoose.connect('mongodb+srv://khorf:6mqpfQWr@cluster0.kfsal.mongodb.net/<dbname>?retryWrites=true&w=majority',{useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true});

app.set('view engine','ejs');

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))



app.get('/', async (req,res)=> {
const articles =await  Articles.find().sort({createdAt: 'desc'})

    res.render('articles/index', { articles : articles});

})




app.use('/articles', articlerouter);
app.listen(5000, err => {
    if (!err) {console.log('App listening on port 5000');}
})