import SendMailController from "../controllers/sendEmail.controller";

class EmailService {  private static instance: EmailService;
  private sendMailController: SendMailController;

  private constructor() {
    this.sendMailController = SendMailController.getInstance();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  // public async sendOtpEmail(to: string, otp: string): Promise<void> {
  //   try {
  //     await this.sendMailController.sendMail(
  //       to,
  //       otp,
  //       'Vellagram',
  //       'Your Vellagram Security Code'
  //     );
  //   } catch (error) {
  //     console.error('Error sending OTP email:', error);
  //     throw new Error('Failed to send OTP email');
  //   }
  // }
  // public async sendForm(to: string, otp: string): Promise<void> {
  //   try {
  //     await this.sendMailController.sendFormData(
  //       email,
  //       otp,
  //       'Vellagram',
  //       'Your Vellagram Security Code'
  //     );
  //   } catch (error) {
  //     console.error('Error sending OTP email:', error);
  //     throw new Error('Failed to send OTP email');
  //   }
  // }

  public async sendFormData(email: string, name: string, description: string, phoneNumber: string): Promise<void> {
    try {
      await this.sendMailController.sendFormData(email, name, description, phoneNumber);
    } catch (error) {
      console.error('Error sending form data email:', error);
      throw new Error('Failed to send form data email');
    }
  }

  public async handleSendFormData(req: import('express').Request, res: import('express').Response): Promise<void> {
    const { email, name, description, phoneNumber } = req.body;
    try {
      await this.sendFormData(email, name, description, phoneNumber);
      res.status(200).json({ message: 'Form data email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
}

export const emailService = EmailService.getInstance();
export const handleSendFormData = emailService.handleSendFormData.bind(emailService); 