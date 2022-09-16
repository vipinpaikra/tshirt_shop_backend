const stripe = require("stripe")(
    "sk_test_51KhrxtSFEvISu0b36Fag9Ikejrx1hj04KmGVmRwD1L0BPZaL5zXB3VI8Pse32zZJecjDQEVQcBJfplgTGLNGajfe007Iuhi0yL"
);
const uuid = require("uuid/v4");
const { Order } = require("../models/Order");
const Ordercomplete = require("../models/Ordercomplete");
exports.makepayment = (req, res) => {
    const { token, products } = req.body;

    console.log("body", token.email);

    let amount = 0;
    products.map((p) => {
        amount = amount + p.price;
    });

    const idempotencyKey = uuid();

    return stripe.customers
        .create({
            email: token.email,
            source: token.id,
        })
        .then((customer) => {
            stripe.paymentIntents
                .create(
                    {
                        amount: amount * 100,
                        currency: "usd",
                        customer: customer.id,
                        receipt_email: token.email,
                        shipping: {
                            name: token.card.name,
                            address: {
                                line1: token.card.address_line1,
                                line2: token.card.address_line2,
                                city: token.card.address_city,
                                country: token.card.address_country,
                                postal_code: token.card.address_zip,
                            },
                        },
                    },
                    { idempotencyKey }
                )
                .then((result) => res.status(200).json(result))
                .then((result) => {
                    Ordercomplete.insertMany({
                        email: `${token.email}`,
                        product: `${products[0]._id}`,
                        price: `${products[0].price}`,
                    });
                })

                // .then((result)=>{
                //     Order.insertMany
                // })
                .catch((err) => console.log(err));
        });
};
