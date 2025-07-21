import SendMailController from "../controllers/sendEmail.controller";

class EmailService {
	private static instance: EmailService;
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

	public async sendFormData(
		email: string,
		name: string,
		description: string,
		phoneNumber: string,
		bussiness: string,
		projectType: string,
		others?: string
	): Promise<void> {
		try {
			await this.sendMailController.sendFormData(
				email,
				name,
				description,
				phoneNumber,
				bussiness,
				projectType,
				others
			);
		} catch (error) {
			console.error("Error sending form data email:", error);
			throw new Error("Failed to send form data email");
		}
	}

	public async handleSendFormData(
		req: import("express").Request,
		res: import("express").Response
	): Promise<void> {
		const {
			email,
			name,
			description,
			phoneNumber,
			bussiness,
			projectType,
			others,
		} = req.body;

		if (
			!email &&
			!name &&
			!description &&
			!phoneNumber &&
			!bussiness &&
			!projectType
		) {
			res
				.json({ message: "Missing required fields", success: false })
				.status(400);
			throw new Error("Missing required fields");
		}
		try {
			await this.sendFormData(
				email,
				name,
				description,
				phoneNumber,
				bussiness,
				projectType,
				others
			);
			res.status(200).json({ message: "Form data email sent successfully" });
		} catch (error) {
			res.status(500).json({
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	public async saveGuestMail(
		email: string
	): Promise<{ success: boolean; message: string }> {
		return await this.sendMailController.saveGuestMail(email);
	}

	public async handleSaveGuestMail(
		req: import("express").Request,
		res: import("express").Response
	): Promise<void> {
		const { email } = req.body;
		if (!email) {
			res.status(400).json({ success: false, message: "Email is required" });
			return;
		}
		const result = await this.saveGuestMail(email);
		if (result.success) {
			res.status(200).json(result);
		} else {
			res.status(500).json(result);
		}
	}
}

export const emailService = EmailService.getInstance();
export const handleSendFormData = emailService.handleSendFormData.bind(emailService); 