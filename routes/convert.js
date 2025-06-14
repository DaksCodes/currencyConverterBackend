const express=require('express');
const app=express();
const API_KEY=process.env.API_KEY;
app.get('/convert',async(req,res)=>{
    const {from, to, amount}=req.query;
    try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`);
    const convertedAmount=response.data.conversion_result;
    res.send(convertedAmount);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Currency conversion failed.' });
  }
});
