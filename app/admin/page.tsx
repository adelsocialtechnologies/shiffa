import Image from 'next/image'
import Link from 'next/link'
import AdminLogin from '@/app/components/adminLogin';

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen bg-[#131619]">
      <section className="relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="sub-container max-w-[496px]">
          <div className="flex w-full items-start mb-10">
            <Image
              src="/assets/icons/splashlogo.png"
              height={1000}
              width={1000}
              alt="patient"
              className="h-12 w-fit"
            />
            <h2 className="text-xl mt-2 ml-[-5px] text-white">Shiffa</h2>
          </div>

          <AdminLogin/>

          {/* <div className="mt-10 text-center">
            <Link href="/admin/dashboard">
              <button className="px-4 py-2 bg-red-500 text-white rounded-md transition">
                Go to Dashboard
              </button>
            </Link>
          </div> */}

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-slate-600 xl:text-left">
              © 2024 Shiffa
            </p>
            <Link href="/" className="text-[#24ae7c]">
              Doctor
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/admin-onboarding.png"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  )
}
