const express= require('express');
const cors=require('cors');
const axios=require('axios')
const dotenv=require('dotenv')
dotenv.config()
const API_KEY=process.env.API_KEY;
const app=express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("welcome");
})

app.get('/convert',async(req,res)=>{
    const {from, to, amount}=req.query;
    try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
    const convertedAmount=response.data.conversion_result;
    res.json({ result: convertedAmount });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Currency conversion failed.' });
  }
});

app.get('/history', async(req,res)=>{
  const{from,to}=req.query;
  const endDate=new Date();
  const startDate=new Date();
  startDate.setDate(endDate.getDate()-30);

   const formatDate = (d) => d.toISOString().split('T')[0];
    app.get('/history', async(req,res)=>{
  const{from,to}=req.query;
  const endDate=new Date();
  const startDate=new Date();
  startDate.setDate(endDate.getDate()-30);

   const formatDate = (d) => d.toISOString().split('T')[0];

   if (from === to) {
    const rates = {};
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate);
      rates[formattedDate] = { [to]: 1.0 }; // flat value of 1.0
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.json(rates);
  }
        
   try{
    const response = await axios.get(`https://api.frankfurter.app/${formatDate(startDate)}..${formatDate(endDate)}`, {
      params: {
        from,
        to
      }
    });
    res.json(response.data.rates);
   }
   catch(error){
    console.error("Frankfurter error:", error.message);
    res.status(500).json({ error: 'Failed to fetch historical exchange rates.' });
   }
})
app.listen(5000);
