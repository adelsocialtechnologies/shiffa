import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { DoctorProvider } from "../context/DoctorContext";
import { PatientProvider } from "../context/UserContext";
import { CategoryProvider } from "../context/CategoriesContext";
import { ReportProvider } from "../context/ReportContext";
import { AppointmentProvider } from "../context/AppointmentContext";
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shiffa Admin Panel",
  description: "Doctors appointment system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <CategoryProvider>
          <DoctorProvider>
            <PatientProvider>
              <ReportProvider>
                <AppointmentProvider>{children}</AppointmentProvider>
              </ReportProvider>
            </PatientProvider>
          </DoctorProvider>
        </CategoryProvider>
      </body>
    </html>
  );
}

// import { usePatientContext } from "../context/PatientContext";

//   const { patients, loading, error, getPatientById } = usePatientContext();

//   const [selectedPatient, setSelectedPatient] = useState(null);

//   const handleViewDetails = async (id) => {
//     const patient = await getPatientById(id);
//     setSelectedPatient(patient);
//   };

// import { useCategoryContext } from "../context/CategoryContext";

//   const { categories, loading, error, addCategory } = useCategoryContext();
//   const [newCategory, setNewCategory] = useState("");

//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) return;
//     await addCategory(newCategory);
//     setNewCategory("");
//   };

//   if (loading) return <p>Loading categories...</p>;
//   if (error) return <p>Error: {error}</p>;




// import { useReportContext } from "../context/ReportContext";

// const ReportsDashboard = () => {
//   const {
//     dailyReports,
//     monthlyReports,
//     loading,
//     error,
//     getAllDailyReports,
//     getAllMonthlyReports,
//     getTodayReport,
//   } = useReportContext();

//   useEffect(() => {
//     getAllDailyReports();
//     getAllMonthlyReports();
//   }, []);

//   const handleTodayReport = async () => {
//     const report = await getTodayReport();
//     console.log("Today's Report:", report);
//   };

//   if (loading) return <p>Loading reports...</p>;
//   if (error) return <p>Error: {error}</p>;



// import { useAppointmentContext } from "../context/AppointmentContext";

// const AppointmentsDashboard = () => {
//   const {
//     appointments,
//     loading,
//     error,
//     getAllAppointments,
//     changeStatus,
//     uploadReport,
//   } = useAppointmentContext();

  // useEffect(() => {
  //   getAllAppointments();
  // }, []);

  // const handleStatusChange = async () => {
  //   const response = await changeStatus("676ceae89899b04f6cbd8b89", "confirmed");
  //   console.log(response.message);
  // };

  // const handleReportUpload = async () => {
  //   const response = await uploadReport("676ceae89899b04f6cbd8b89", "www.reportpdf.in");
  //   console.log(response.message);
  // };

  // if (loading) return <p>Loading appointments...</p>;
  // if (error) return <p>Error: {error}</p>;
