const path = require("path");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const Transaction = require("../models/transaction.model");

const enableAntiCSRF = false;

// eslint-disable-next-line no-unused-vars
const generateFormToken = (username) => {
    const formToken = jwt.sign(
        {
            username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: `${process.env.JWT_VERIFY_FORM_EXPIRATION_MINUTES} minutes`,
        }
    );
    return formToken;
};

const renderTransactionForm = async (req, res) => {
    let transactions = await Transaction.find({}).sort({ createdAt: -1 });
    transactions = transactions.map((transaction) => {
        const editableTransaction = transaction.toObject();
        const { createdAt } = editableTransaction;
        editableTransaction.date = dayjs(createdAt).format("HH:mm:ss DD/MM/YYYY");
        return editableTransaction;
    });
    if (enableAntiCSRF) {
        res.render(path.join("pages", "home"), {
            transactions,
            validation: {
                token: generateFormToken(req.user.username),
                expiry: process.env.JWT_VERIFY_FORM_EXPIRATION_MINUTES,
            },
        });
    } else {
        res.render(path.join("pages", "home"), {
            transactions,
        });
    }
};

const createTransaction = async (req, res, next) => {
    const { receiver, amount } = req.body;
    const { user } = req;
    if (enableAntiCSRF) {
        const { token } = req.body;
        try {
            const { username } = jwt.verify(token, process.env.JWT_SECRET);
            if (username !== user.username) {
                throw new Error("Invalid token");
            }
        } catch (error) {
            res.render(path.join("pages", "error"), { messge: error.message });
            return;
        }
    }
    const transaction = new Transaction({ sender: user.username, receiver, amount });
    try {
        await transaction.save();
        res.redirect("/");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    renderTransactionForm,
    createTransaction,
};
