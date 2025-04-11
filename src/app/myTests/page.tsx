import { prisma } from "@/lib/prisma"
import TestCard from "./TestCard"
import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

async function page() {

  const se = await getSession()
  if (!se) {
    return redirect("/login")
  }
  console.log(se);

  const tests = await prisma.medicalReports.findMany({
    where: {
      user_id: se.user.id
    },
    include: {
      lab: {
        select: {
          location: true,
          lab_name: true
        }
      }
    }
  })
  return (
    <>

      <main className="relative z-10 flex-grow flex flex-col items-center px-6 py-20">
        <h2 className="text-3xl font-bold text-purple-800 mb-8">🧪 Your Analysis</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
          {
            tests.map(t =>
              <TestCard key={t.report_id} id={t.report_id} labName={t.lab.lab_name} status={t.reportReady} type={t.report_title} creationDate={t.created_at.toLocaleDateString() + " " + t.created_at.getHours() + "h"} location={t.lab.location} />
            )
          }
        </div>
      </main>
    </>
  )
}
export default page