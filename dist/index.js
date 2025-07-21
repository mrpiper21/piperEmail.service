"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_route_1 = __importDefault(require("./routes/email.route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/piper-emailService';
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    origin: ["*", "https://ornamastudios.com/"],
}));
app.use(express_1.default.json());
app.use("/api/mail", email_route_1.default);
// MongoDB connection
mongoose_1.default.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Basic route
app.get('/', (req, res) => {
    res.send('Piper Email Service is running!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
