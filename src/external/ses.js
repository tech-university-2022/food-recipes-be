const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");

const sendResetPasswordViaEmail = async (email, newPassword) => {
    const client = new SESClient({
        region: 'ap-southeast-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS,
            secretAccessKey: process.env.AWS_SECRET
        }
    })


    const sendEmailCommand = new SendEmailCommand({
        Message: {
            Subject: {
                Data: `[IMPORTANT] Password reset for Mi Recipe`,
                Charset: 'UTF-8'
            },
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `
                    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                        <!--100% body table-->
                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                        align="center" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                              <a href="https://github.com/thinhlh" title="logo" target="_blank">
                                                <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                              </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0 35px;">
                                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                                requested to reset your password</h1>
                                                            <span
                                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                                We cannot simply send you your old password for your account with email: ${email}. Hence, we send you your new password, use this password to access your account. You can change your password for further security.
                                                            </p>
                                                            <a href="javascript:void(0);"
                                                                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#1e1e2d;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">${newPassword}</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.thinhlh.com</strong></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                        <!--/100% body table-->
                    </body>
                    `
                }
            }
        },
        Destination: {
            ToAddresses: [email],
        },
        Source: "thinhlh0812@gmail.com"
    });

    client
        .send(sendEmailCommand)
        .catch((e) => { console.log(e) });
}

module.exports = sendResetPasswordViaEmail