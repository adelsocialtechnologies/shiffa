import Image from 'next/image';
import Link from 'next/link';
import DoctorSignUp from '@/app/components/doctorSignUp';

export default function SignUp() {
  return (
    <div className="flex md:h-full bg-[#131619] py-12">
      <section className="relative flex-1 overflow-y-auto px-[5%] my-auto flex flex-wrap justify-between">
        <div className="w-full">
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

          {/* Welcome Heading */}
          <h3 className="text-4xl font-semibold text-white mt-4">Welcome 👋</h3>
          
          {/* Relative Subtext */}
          <p className="text-md text-gray-400 mt-2 mb-5">
            Create your account to get started with Shiffa's health services. It's easy and quick.
          </p>

          {/* DoctorSignUp Form */}
          <DoctorSignUp />

          {/* Terms of Use */}
          <div className="w-full mt-8 flex items-center">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-500">
              I declare that I have read the 
              <a href="/terms" className="text-[#24ae7c] font-semibold hover:underline"> Terms of Use </a> 
              of the services and accept them.
            </label>
          </div>

          {/* Sign Up Button */}
          <button className="mt-8 w-full py-2 px-6 bg-[#24ae7c] text-white font-semibold rounded-md">
            Create My Account
          </button>

          {/* Footer */}
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-slate-600 xl:text-left">
              © 2024 Shiffa
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
