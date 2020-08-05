/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret);


/**
 * Pago con stripe.
 */
exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge) => {
            // asynchronously called
            response.send(charge);
        })
        .catch(err =>{
            console.log(err);
        });

});


exports.sendMail = functions.database.ref('/sales/{uid}').onCreate((snapshot, context) => {

    const sale = snapshot.val();

    // getting dest email by query string

    const mailOptions = {
        from: 'report@sample.com',  // You can write any mail Adress you want this doesn't effect anything
        to: sale.user.email, // This mail adress should be filled with any mail you want to read it
        tile: 'Congratulations!',
        subject: 'your order has been taken correctly', // Sample Subject for you template
        html: `<body style="margin: 0; padding: 0;"> 
            <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                <tr>
                    <td style="padding: 10px 0 30px 0;">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #cccccc; border-collapse: collapse;">
                            <tr>
                                <td align="center" bgcolor="#70bbd9" style="padding: 40px 0 30px 0; color: #153643; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/h1.gif" alt="Creating Email Magic" width="300" height="230" style="display: block;" />
                                </td>
                            </tr>
                            <tr>
                                <td bgcolor="#ffffff" style="padding: 40px 30px 40px 30px;">
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td style="color: #153643; font-family: Arial, sans-serif; font-size: 24px;">
                                                
                                                <b>Congratulations!</b>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 20px 0 30px 0; color: #153643; font-family: Arial, sans-serif; font-size: 16px; line-height: 20px;">
                                                Thank you for shopping at La Perrada de Chalo. 
                                                Visit our website
                                                <a href="https://www.laperradadechalo.com/">laperradadechalo.com</a>
                                            </td>
                                        </tr>
                                        <tr>
            
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>                
                        </table>
                    </td>
                </tr>
            </table>
        </body>
            ` // email content in HTML. You can write any Html template in here
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
