const express= require("express");
const cors = require("cors");
const stripe= require("stripe")(SECRETKEY);


const app= express();

app.use(cors());
app.post("/enviar-pago", async (req, res)=>{
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'T-shirt',
              },
              unit_amount: 2000,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
      });
    res.json({ id: session.id });
    })



app.listen(3000, ()=>{console.log(`funcionando en puerto 3000`)});