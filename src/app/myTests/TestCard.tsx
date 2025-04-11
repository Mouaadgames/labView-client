import Link from "next/link"

function TestCard({
  id,
  type,
  location,
  status,
  creationDate,
  labName
}: {
  id: string,
  type: string,
  location: string,
  status: boolean,
  creationDate: string,
  labName: string
}) {
  return (
    <div className="bg-gradient-to-r from-grey-100 from-50% to-red-100 to-95% p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 glow">
      <div className="flex justify-between">
        <h3 className="font-bold text-xl text-gray-800 mb-2">{type}</h3>
        <a href={"https://www.google.com/maps/place/Jemaa+el-Fnaa/@31.6196575,-7.9856502,15.06z/data=!4m6!3m5!1s0xdafef41749d6bf9:0x72aec20ce3a1e60d!8m2!3d31.6259521!4d-7.9890491!16zL20vMDR5dnFs?entry=ttu&g_ep=EgoyMDI1MDQwNy4wIKXMDSoASAFQAw%3D%3D" + location} className="text-gray-600 italic flex hover:underline cursor-pointer"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
          {labName}</a>
      </div>
      <p className={"text-sm mb-4 " + (status ? 'text-gray-600' : 'text-red-600')}>{
        status ? "Ready for download and review" : "Not ready yet"
      }
      </p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">{creationDate}</span>
        <Link href={"/myTests/" + id} className="text-red-600 font-semibold hover:underline">View Result →</Link>
      </div>
    </div>

  )
}
export default TestCard