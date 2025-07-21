"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_service_1 = require("../services/email.service");
const router = express_1.default.Router();
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
router.post('/send-form', email_service_1.handleSendFormData);
exports.default = router;
