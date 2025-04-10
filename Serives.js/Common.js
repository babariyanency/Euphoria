const nodemailer = require('nodemailer');
require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: 'babariyanency06@gmail.com',
        pass: process.env.MAIL_PASSWORD,
    },
});

exports.sendMail = async function ({ to, subject, text, html }) {
    let info = await transporter.sendMail({
        from: '"Euphoria" <babariyanency06@gmail.com>',
        to,
        subject,
        text,
        html
    });
    return info;
}

exports.invoiceTemplate = function (order) {
    return (
        `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Email Receipt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
        body {
            font-family: Helvetica, sans-serif;
            font-size: 13px;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 680px;
            margin: 0 auto;
            padding: 15px;
        }
        .logotype {
            background: #000;
            color: #fff;
            width: 75px;
            height: 75px;
            line-height: 75px;
            text-align: center;
            font-size: 11px;
        }
        .column-title {
            background: #eee;
            text-transform: uppercase;
            padding: 15px 5px 15px 15px;
            font-size: 11px;
        }
        .column-header {
            background: #eee;
            text-transform: uppercase;
            padding: 15px;
            font-size: 11px;
            border-right: 1px solid #eee;
        }
        .row {
            padding: 7px 14px;
            border-left: 1px solid #eee;
            border-right: 1px solid #eee;
            border-bottom: 1px solid #eee;
        }
        .alert {
            background: #ffd9e8;
            padding: 20px;
            margin: 20px 0;
            line-height: 22px;
            color: #333;
        }
        .socialmedia {
            background: #eee;
            padding: 20px;
            display: inline-block;
        }

        /* Mobile Responsive Styles */
        @media only screen and (max-width: 600px) {
            .container {
                width: 100% !important;
                padding: 10px;
            }
            .logotype {
                width: 50px;
                height: 50px;
                line-height: 50px;
                font-size: 9px;
            }
            .column-title {
                font-size: 12px;
                padding: 12px;
            }
            .column-header,
            .row {
                font-size: 10px;
                padding: 10px;
            }
            table {
                width: 100% !important;
            }
            .alert {
                font-size: 12px;
            }
            .socialmedia {
                width: 100%;
                padding: 15px;
            }
        }

        /* Smaller Screen Sizes (max-width: 480px) */
        @media only screen and (max-width: 480px) {
            .logotype {
                font-size: 10px;
                height: 60px;
                width: 60px;
                line-height: 60px;
            }
            .alert {
                font-size: 11px;
            }
            .column-header {
                font-size: 10px;
                padding: 8px 5px;
            }
            .row {
                padding: 5px;
                font-size: 9px;
            }
        }

        </style>
        </head>
        <body>
        <div class="container">
        
        <table width="100%">
            <tr>
                <td width="75px"><div class="logotype">Euphoria</div></td>
                <td width="300px"><div style="background: #ffd9e8;border-left: 15px solid #fff;padding-left: 30px;font-size: 26px;font-weight: bold;letter-spacing: -1px;height: 73px;line-height: 75px;">Order invoice</div></td>
                <td></td>
            </tr>
        </table> 
        <br><br>
        <h3>Your contact details</h3>
        <p>Here are the contact details of the user, along with their order details and the delivery address. This information includes the items purchased, order date, and expected delivery time.</p><br>
        <table width="100%" style="border-collapse: collapse;">
            <tr>
                <td widdth="50%" style="background:#eee;padding:20px;">
                    <strong>Date:</strong>${order.createdAt ? new Date(order.createdAt).toDateString() : null}<br>
                    <strong>Order-nr:</strong>${order.id}<br>
                    <strong>Payment type:</strong>${order.paymentMethod}<br>
                </td>
                <td style="background:#eee;padding:20px;">
                    <strong>Username:</strong>${order.selectedAddress[0].fname}<br>
                    <strong>E-mail:</strong>${order.selectedAddress[0].email}<br>
                    <strong>Phone:</strong>${order.selectedAddress[0].phno}<br>
                </td>
            </tr>
        </table><br>
        <table width="100%">
            <tr>
                <td>
                    <table>
                        <tr>
                            <td style="vertical-align: text-top;">
                                <div style="background: #ffd9e8 url(https://cdn0.iconfinder.com/data/icons/commerce-line-1/512/comerce_delivery_shop_business-07-128.png);width: 50px;height: 50px;margin-right: 10px;background-position: center;background-size: 42px;"></div>   
                            </td>
                            <td>
                                <strong>Delivery Address</strong><br>
                                ${order.selectedAddress[0].address}<br>
                                ${order.selectedAddress[0].city}<br>
                                ${order.selectedAddress[0].state}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table><br>
        <table width="100%" style="border-top:1px solid #eee;border-bottom:1px solid #eee;padding:0 0 8px 0"></table><br>
        <div style="background: #ffd9e8 url(https://cdn4.iconfinder.com/data/icons/basic-ui-2-line/32/shopping-cart-shop-drop-trolly-128.png) no-repeat;width: 50px;height: 50px;margin-right: 10px;background-position: center;background-size: 25px;float: left; margin-bottom: 15px;"></div> 
        <h3>Your articles</h3>

        <table width="100%" style="border-collapse: collapse;border-bottom:1px solid #eee;">
            <tr>
                <td width="40%" class="column-header">Product</td>
                <td width="20%" class="column-header">Size</td>
                <td width="20%" class="column-header">Quantity</td>
                <td width="20%" class="column-header">Price</td>
            </tr>
            ${order.items.map((item) =>
                `<tr>
                    <td class="row"><span style="color:#777;font-size:11px;">${item.brand}</span><br>${item.title}</td>
                    <td class="row">${item.sizes}</td>
                    <td class="row">${item.quantity}</td>
                    <td class="row">${item.price}</td>
                </tr>`
            )}
        </table><br>
        <table width="100%" style="background:#eee;padding:20px;">
            <tr>
                <td>
                    <table width="300px" style="float:right">
                        <tr>
                            <td><strong>Grand total:</strong></td>    
                            <td style="text-align:right">${order.totalAmount}</td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
        <div class="alert">"Thank you for choosing our perfume shop for your fragrance needs. We truly appreciate your purchase and trust in our collection. We are dedicated to offering you the finest scents that match your unique style and personality. We hope that the fragrance you selected brings you joy and confidence. Should you need any assistance or have any questions, please feel free to reach out. We look forward to serving you again soon!"</div>
        </div><!-- container -->
        </body>
        </html>`
    );
}
