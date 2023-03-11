const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient({
    log: process.env.NODE_ENV === 'dev' ? ["query"] : []
})

module.exports = db