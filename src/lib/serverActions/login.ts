import { cookies } from "next/headers";
import { encrypt } from "../auth";
import { prisma } from '@/lib/prisma'
import { randomCode } from '../utils'
import { redirect } from 'next/navigation'

const EXPIRATIONTIME = 24 * 3600 * 1000

export async function login(e: FormData) {
  "use server"
  const CNI = e.get("CNI") as string
  const birthDate = e.get("date") as string
  console.log(encodeURI(CNI), new Date(birthDate));

  const currentUser = await prisma.user.findFirst({
    where: {
      cne: CNI.toUpperCase(),
    }
  })
  console.log(currentUser);

  if (!currentUser) {
    redirect("/login?e=cant be found")
  }

  const ConfirmationCode = (await prisma.confirmationCodes.create({
    data: {
      value: randomCode(),
      user: {
        connect: {
          user_id: currentUser.user_id
        }
      }
    }
  }))

  redirect("/login/" + ConfirmationCode.id)

}


export async function SMSConfirmation(e: FormData) {
  "use server"
  const SMSCode = e.get("SMSCode") as string
  const SMSId = e.get("SMSId") as string

  const confirmationCode = await prisma.confirmationCodes.findFirst({
    where: {
      id: SMSId,
      value: SMSCode
    },
    select: {
      user: {
        select: {
          user_id: true
        }
      }
    }
  })
  console.log(confirmationCode);



  if (!confirmationCode) {
    return redirect("/login/" + SMSId + "?e=Error")
  }
  const user = { id: confirmationCode.user.user_id };
  // Create the session
  const expires = new Date(Date.now() + EXPIRATIONTIME);
  const session = await encrypt({ user, expires });

  // Save the session in a cookie
  // give him jwt
  (await cookies()).set("session", session, { expires, httpOnly: true });
  
  redirect("/myTests/")

}