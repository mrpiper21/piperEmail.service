"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSendFormData = exports.emailService = void 0;
const sendEmail_controller_1 = __importDefault(require("../controllers/sendEmail.controller"));
class EmailService {
    constructor() {
        this.sendMailController = sendEmail_controller_1.default.getInstance();
    }
    static getInstance() {
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
    sendFormData(email, name, description, phoneNumber, bussiness, projectType, others) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.sendMailController.sendFormData(email, name, description, phoneNumber, bussiness, projectType, others);
            }
            catch (error) {
                console.error("Error sending form data email:", error);
                throw new Error("Failed to send form data email");
            }
        });
    }
    handleSendFormData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, name, description, phoneNumber, bussiness, projectType, others, } = req.body;
            if (!email &&
                !name &&
                !description &&
                !phoneNumber &&
                !bussiness &&
                !projectType) {
                res
                    .json({ message: "Missing required fields", success: false })
                    .status(400);
                throw new Error("Missing required fields");
            }
            try {
                yield this.sendFormData(email, name, description, phoneNumber, bussiness, projectType, others);
                res.status(200).json({ message: "Form data email sent successfully" });
            }
            catch (error) {
                res.status(500).json({
                    error: error instanceof Error ? error.message : "Unknown error",
                });
            }
        });
    }
}
exports.emailService = EmailService.getInstance();
exports.handleSendFormData = exports.emailService.handleSendFormData.bind(exports.emailService);
