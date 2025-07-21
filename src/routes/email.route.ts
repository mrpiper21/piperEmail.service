import express from 'express'
import { emailService, handleSendFormData } from "../services/email.service";

const router = express.Router();

// const handleSendMail = async (req: express.Request, res: express.Response) => {
//   const { to, otp } = req.body;
//   try {
//     await emailService.sendOtpEmail(to, otp);
//     res.status(200).json({ message: 'OTP email sent successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
//   }
// };

// router.post('/send-mail', handleSendMail);
router.post("/send-form", handleSendFormData);
router.post(
	"/guest-email",
	emailService.handleSaveGuestMail.bind(emailService)
);

export default router