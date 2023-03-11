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
async function updateAccountName(email,newName){
   prisma.account.update({
        where: {
            email: email
        },
        data: {
            name: newName,
            metadata: {
                enabled: true
            }
            
        }
    })

}
async function updateAccountAvatar(email,newAvatarUrl){
    prisma.account.update({
         where: {
             email: email
         },
         data: {
             avatarUrl: newAvatarUrl,
             metadata: {
                 enabled: true
             }
         }
     })
 
 }
 async function updateAccountPassword(email,newPassword){
    prisma.account.update({
         where: {
             email: email
         },
         data: {
             password:  authService.hash(newPassword),
             metadata: {
                 enabled: true
             }
         }
     })
 }


export default { getAccountByEmail, createAccount, updateAccountName,updateAccountAvatar,updateAccountPassword};