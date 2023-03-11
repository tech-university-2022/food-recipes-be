const db = require("../config/db.js");
const authService = require("./auth.service.js");


async function getAccountByEmail(email) {

    const account = await db.account.findUnique({
        where: {
            email: email
        }
    })

    return account;
}

const createAccount = async (name, email, password, avatarUrl) => {

    const account = await db.account.create({
        data: {
            name: name,
            email: email,
            password: authService.hash(password),
            avatarUrl: avatarUrl,
            metadata: {
                enabled: true
            }
        }
    })


    let { password: _, ...extractedAccount } = account;

    return extractedAccount
}
async function updateAccount(email,newName,newAvatarUrl){
   const newInfor = prisma.account.update({
        where: {
            email: email
        },
        data: {
            name: newName,
            avatarUrl: newAvatarUrl,
            metadata: {
                enabled: true
            }
            
        }
    })
    return newInfor
}
async function deleteAccount(email){
    await prisma.user.update({
        where: {
          email: email,
        },
        data:{
            metadata: {
                enabled: false
            }
        }
      })
}


module.exports = { getAccountByEmail, createAccount,updateAccount,deleteAccount };
