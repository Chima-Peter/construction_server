// html and css code that will be sent to user email
const htmlContent = `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset</title>
                    <style>
                        /* General Reset */
                        body, table, td, a { text-size-adjust: 100%; font-family: Arial, sans-serif; }
                        body { margin: 0; padding: 0; width: 100%; background-color: #f4f4f4; }
                        table { border-collapse: collapse; width: 100%; }

                        /* Container */
                        .email-container { max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 5px; overflow: hidden; }
                        .email-header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; }
                        .email-body { padding: 20px; color: #333333; line-height: 1.5; }
                        .email-footer { background-color: #f4f4f4; padding: 20px; text-align: center; color: #777777; font-size: 12px; }

                        /* Button */
                        .reset-button {
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #007bff;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 4px;
                        font-size: 16px;
                        margin-top: 20px;
                        }

                        /* Responsive Design */
                        @media screen and (max-width: 600px) {
                        .email-container { width: 100% !important; }
                        }
                    </style>
                    </head>
                    <body>
                    <table role="presentation" class="email-container">
                        <tr>
                        <td class="email-header">
                            Password Reset Link
                        </td>
                        </tr>
                        <tr>
                        <td class="email-body">
                            <p>Hello,</p>
                            <p>You requested to reset your password. Click the button below to set a new password:</p>
                            <a href="https://buildwithseamless.co" class="reset-button">Reset Password</a>
                            <p>If you did not request this, you can safely ignore this email.</p>
                            <p>Thank you,<br>Your Company Team</p>
                        </td>
                        </tr>
                        <tr>
                        <td class="email-footer">
                            &copy; 2024 Mobs Construction. All rights reserved.
                        </td>
                        </tr>
                    </table>
                    </body>
                    </html>
                    `

export default htmlContent