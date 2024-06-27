const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User} = require("../models");
require("dotenv").config();

const AuthController = {
    async register(req, res) {
        try {
            const { firstName, name, email, password } = req.body;
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) return res.status(400).json({ error: "Email already exists" });
            const user = await User.create({
                firstName,
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                age,
                weight,
                sexe
            });
            const userWithoutPassword = {
                id: user.id,
                firstName: user.firstName,
                name: user.name,
                email: user.email,
                role: user.role,
                age: user.age,
                weight: user.weight,
                sexe: user.sexe
            };
            res.status(201).json({ user: userWithoutPassword });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400).json({ error: "email and password are required" });
            const user = await User.findOne({ where: { email } });
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, {
                    expiresIn: "1d",
                });
                user.refreshToken = refreshToken;
                res.cookie("jwt", refreshToken, {
                    httpOnly: true,
                    sameSite: "None",
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000,
                });
                await user.save();
                res.status(200).json({
                    token,
                    id: user.id,
                    name: user.name,
                    firstName: user.firstName,
                    role: user.role,
                    age: user.age,
                    weight: user.weight,
                    sexe: user.sexe
                });
            } else {
                res.status(401).json({ error: "Invalid email or password" });
            }
        } catch (error) {
            console.log("Error login :", error);
            res.status(400).json({ error: error.message });
        }
    },

    async logout(req, res) {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.sendStatus(204);
        const refreshToken = cookies.jwt;
        // is refreshToken in db?
        const user = await User.findOne({ where: { refreshToken } });
        if (!user) {
            res.clearCookie("jwt", {
                httpOnly: true,
                sameSite: "None",
                secure: true,
            });
            return res.sendStatus(204);
        }
        // delete refreshToken from db
        user.refreshToken = null;
        await user.save();
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
        res.sendStatus(204);
    },
};

module.exports = AuthController;
