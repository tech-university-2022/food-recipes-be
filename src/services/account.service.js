import db from "../config/db.js"
import authService from "./auth.service.js";


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

export default { getAccountByEmail, createAccount, updateAccount,deleteAccount};