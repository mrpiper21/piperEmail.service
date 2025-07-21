import nodemailer, { Transporter } from 'nodemailer';

class SendMailController {
  private static instance: SendMailController;
  private transporter: Transporter;

  private constructor() {
    // You must use a Gmail App Password for recipientPassword
    // if (!process?.env.recipientEmail || !process?.env.recipientPassword) {
    //   throw new Error('Gmail credentials not configured in environment variables');
    // }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "ornamastudios@gmail.com",
        pass:"saws wrne tnkx pqhj"
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      logger: process.env.NODE_ENV === 'development'
    });
  }

  public static getInstance(): SendMailController {
    if (!SendMailController.instance) {
      SendMailController.instance = new SendMailController();
    }
    return SendMailController.instance;
  }

  public async verifyConnection(): Promise<void> {
    try {
      await this.transporter.verify();
      console.info('Mail transporter connection verified');
    } catch (error) {
      console.error('Mail transporter verification failed:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error('Failed to verify mail transporter');
    }
  }

//   public async sendMail(
//     email: string,
//     otp: string,
//     organization: string = 'OTP Service',
//     subject: string = 'Your One-Time Password'
//   ): Promise<void> {
//     try {
//       if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         throw new Error('Invalid email address');
//       }

//       if (!otp || otp.length < 4 || otp.length > 8) {
//         throw new Error('Invalid OTP format');
//       }

//       const mailOptions = {
//         from: `"${organization}" <${process.env.GMAIL_USER}>`,
//         to: email,
//         subject: subject,
//         text: `Your verification code is: ${otp}`,
//         html: this.generateHtmlTemplate(otp, organization),
//       };

//       const info = await this.transporter.sendMail(mailOptions);
//       console.info(`Email sent to ${email}`, { messageId: info.messageId });
//     } catch (error: unknown) {
//       const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//       console.error(`Failed to send email to ${email}`, { error: errorMessage });
//       throw new Error(`Failed to send email: ${errorMessage}`);
//     }
//   }
  public async sendFormData(
    email: string,
    name: string,
    description: string,
    phoneNumber: string
  ): Promise<void> {
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Invalid email address');
      }
      const mailOptions = {
        from: `"Form Submission" <${"ornamastudios@gmail.com"}>`, // must match authenticated user
        to: "ornamastudios@gmail.com",
        replyTo: email,
        subject: 'New Form Submission',
        text: `New form submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nDescription: ${description}`,
        html: this.generateFormHtmlTemplate(name, email, phoneNumber, description)
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.info(`Form data email sent to ${process.env.recipientEmail} (submitted by ${email})`, { messageId: info.messageId });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Failed to send form data email to ${process.env.recipientEmail} (submitted by ${email})`, { error: errorMessage });
      throw new Error(`Failed to send form data email: ${errorMessage}`);
    }
  }

  private generateHtmlTemplate(otp: string, organization: string): string {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vellagram Security Code</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            color: #0f172a;
            line-height: 1.6;
            padding: 20px 0;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(42, 71, 89, 0.15);
            position: relative;
        }
        
        /* Animated gradient background */
        .email-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #3A86A8, #2A4759, #1B7E3D, #3A86A8);
            background-size: 200% 100%;
            animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .header {
            background: linear-gradient(135deg, #2A4759 0%, #3A86A8 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .logo-container {
            position: relative;
            z-index: 2;
            margin-bottom: 20px;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto;
            display: block;
            filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
        }
        
        .brand-name {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 2px;
            margin-top: 15px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.2);
            position: relative;
            z-index: 2;
        }
        
        .tagline {
            color: rgba(255,255,255,0.9);
            font-size: 14px;
            font-weight: 400;
            margin-top: 8px;
            position: relative;
            z-index: 2;
        }
        
        .content {
            padding: 50px 40px;
            text-align: center;
            background: #ffffff;
            position: relative;
        }
        
        .security-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 30px;
            background: linear-gradient(135deg, #1B7E3D, #22C55E);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 24px rgba(27, 126, 61, 0.3);
        }
        
        .title {
            font-size: 24px;
            font-weight: 700;
            color: #0f172a;
            margin-bottom: 10px;
        }
        
        .subtitle {
            color: #64748b;
            font-size: 16px;
            margin-bottom: 40px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .otp-container {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px dashed #3A86A8;
            border-radius: 16px;
            padding: 30px;
            margin: 40px 0;
            position: relative;
        }
        
        .otp-container::before {
            content: '';
            position: absolute;
            top: -1px;
            left: -1px;
            right: -1px;
            bottom: -1px;
            background: linear-gradient(45deg, #3A86A8, #2A4759);
            border-radius: 16px;
            z-index: -1;
            opacity: 0.1;
        }
        
        .otp-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .otp-code {
            font-size: 42px;
            font-weight: 800;
            color: #2A4759;
            letter-spacing: 8px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            margin: 20px 0;
            text-shadow: 0 2px 4px rgba(42, 71, 89, 0.1);
        }
        
        .expiry-notice {
            background: linear-gradient(135deg, #fef3c7, #fde68a);
            border: 1px solid #f59e0b;
            border-radius: 12px;
            padding: 20px;
            margin: 30px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }
        
        .warning-icon {
            width: 20px;
            height: 20px;
            background: #f59e0b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }
        
        .expiry-text {
            color: #92400e;
            font-size: 14px;
            font-weight: 600;
        }
        
        .security-tips {
            background: #f8fafc;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            border-left: 4px solid #3A86A8;
        }
        
        .security-tips h3 {
            color: #2A4759;
            font-size: 16px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .security-tips ul {
            color: #64748b;
            font-size: 14px;
            margin-left: 20px;
        }
        
        .security-tips li {
            margin-bottom: 6px;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e2e8f0;
        }
        
        .support-link {
            color: #3A86A8;
            text-decoration: none;
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
        }
        
        .support-link:hover {
            color: #2A4759;
            text-decoration: underline;
        }
        
        .footer-text {
            color: #64748b;
            font-size: 12px;
            margin-top: 20px;
            line-height: 1.5;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
            body {
                padding: 10px 0;
            }
            
            .email-container {
                margin: 0 10px;
                border-radius: 12px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .content {
                padding: 40px 25px;
            }
            
            .otp-code {
                font-size: 36px;
                letter-spacing: 6px;
            }
            
            .brand-name {
                font-size: 24px;
            }
            
            .title {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-container">
                <svg class="logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <radialGradient id="energyGradient" cx="50%" cy="30%">
                            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
                            <stop offset="60%" style="stop-color:#e2e8f0;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#cbd5e1;stop-opacity:1" />
                        </radialGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <circle r="90" fill="url(#energyGradient)" opacity="0.2"/>
                    <circle r="75" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
                    <g filter="url(#glow)">
                        <path d="M-40,20 L0,80 L40,20" 
                              stroke="#ffffff" 
                              stroke-width="8" 
                              fill="none" 
                              stroke-linecap="round" 
                              stroke-linejoin="round"/>
                    </g>
                    <circle cx="0" cy="-40" r="4" fill="#ffffff" opacity="0.8"/>
                    <circle cx="20" cy="-30" r="3" fill="#ffffff" opacity="0.6"/>
                    <circle cx="-20" cy="-30" r="3" fill="#ffffff" opacity="0.6"/>
                </svg>
            </div>
            <div class="brand-name">VELLAGRAM</div>
            <div class="tagline">Secure Authentication</div>
        </div>
        
        <div class="content">
            
            <h1 class="title">Your Security Code</h1>
            <p class="subtitle">Use this one-time password to complete your secure authentication</p>
            
            <div class="otp-container">
                <div class="otp-label">One-Time Password</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="expiry-notice">
                <div class="warning-icon">⏰</div>
                <div class="expiry-text">This code expires in 10 minutes</div>
            </div>
            
            <div class="security-tips">
                <h3>
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    Security Tips
                </h3>
                <ul>
                    <li>Never share this code with anyone</li>
                    <li>Vellagram will never ask for your OTP via email or phone</li>
                    <li>If you didn't request this code, please contact support immediately</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>
                <a href="https://github.com/sauravhathi/otp-service" class="support-link" target="_blank">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    Visit our Website
                </a>
            </p>
            <p class="footer-text">
                This email was sent because an OTP was requested for your account.<br>
                If you have any questions, please contact our support team.
            </p>
        </div>
    </div>
</body>
</html>
    `;
  }

  private generateFormHtmlTemplate(name: string, email: string, phoneNumber: string, description: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f8fafc; color: #222; }
          .container { max-width: 500px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 24px; }
          h2 { color: #2563eb; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
          th { background: #f1f5f9; color: #2563eb; }
          .desc { white-space: pre-line; background: #f9fafb; border-radius: 4px; padding: 12px; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>New Form Submission</h2>
          <table>
            <tr><th>Name</th><td>${name}</td></tr>
            <tr><th>Email</th><td>${email}</td></tr>
            <tr><th>Phone Number</th><td>${phoneNumber}</td></tr>
          </table>
          <div>
            <strong>Description:</strong>
            <div class="desc">${description}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

export default SendMailController;