
import EcoReportForm from "@/components/EcoReportForm";

// Home Page displayed in screen 
export default function HomePage(){
  return (
    <main className="flex min-h-screen flex-col justify-start items-center p-3 md:p-6 bg-slate-200">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-blue-500">Eco-Repoter Form</h1>
      <EcoReportForm/>
    </main>
  )
}