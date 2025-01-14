"use client";
import Link from "next/link";
import Sidebar, { SidebarItem } from "@/components/sidebarAdmin/page";
import StudentTableByInstitute, { Student } from "@/components/StudentTable";
import { getStudentsByInstitute } from "@/helpers/student.helper";
import { InstitutionsData } from "@/store/institutionsData";
import { User, History, Globe2, MessageCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import InstitutionPayments, { Payment } from "@/components/InstitutionPayments";
import { getPaymentsByInstitution } from "@/helpers/institution.helper";

const DashboardInstitution: React.FC = () => {
  const [view, setView] = useState<string>("students");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [studentsByInstitute, setStudentsByInstitute] = useState<Student[]>([]);
  const [paymentsByInstitute, setPaymentsByInstitute] = useState<Payment[]>([]);
  const getInstitutionData = InstitutionsData(
    (state) => state.getInstitutionData
  );
  const institute = InstitutionsData((state) => state.institutionData);
  const Tickets = InstitutionsData((state) => state.ticketInsti);
  const getTickets = InstitutionsData((state) => state.getTickets);

  useEffect(() => {
    const fetchInstitutionData = async () => {
      try {
        await getInstitutionData();
        console.log("Institution data:", institute);
      } catch (error) {
        console.error("Error fetching institution data:", error);
      }
    };

    fetchInstitutionData();
  }, [getInstitutionData]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (institute?.id) {
        try {
          const students = await getStudentsByInstitute(institute.id);
          setStudentsByInstitute(students);
        } catch (error) {
          console.error("Error fetching students:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchStudents();
  }, [institute?.id]);

  useEffect(() => {
    if (institute?.id) {
      console.log("Fetching tickets for institute id:", institute.id);
      getTickets(institute.id);
      console.log("Tickets after fetching:", Tickets);
    }
  }, [getTickets, institute?.id]);

  useEffect(() => {
    const fetchGetPaymentsByInstitute = async () => {
      if (institute?.id) {
        setPaymentsByInstitute(await getPaymentsByInstitution(institute.id));
      }
    };
    fetchGetPaymentsByInstitute();
  }, [institute?.id]);


  const handleModal = () => {
    const tickets = Tickets || []; // Ensure Tickets is an array

    // Convert the React component to HTML string
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      <div className="flex flex-col gap-4 w-full overflow-y-auto h-96">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <li
              key={ticket.id}
              className="flex items-center h-48 mb-6 shadow-lg rounded-lg border border-gray-200/40"
            >
              <div className="flex h-full items-center w-full">
                <div className="flex flex-col gap-1 h-full w-full text-left p-2">
                  <p className="text-lg text-gray-900">
                    Fecha del Ticket: {ticket.date}
                  </p>
                  <p className="text-base text-gray-900">
                    Monto: ${ticket.amount}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No hay tickets disponibles.
          </p>
        )}
      </div>
    );

    Swal.fire({
      width: "80%",
      title: "Detalles de los Tickets",
      padding: "1em",
      confirmButtonColor: "black",
      confirmButtonText: "Volver",
      html: htmlContent,
    });
  };
  return (
    <section className="h-screen flex pt-16 items-center">
      <Sidebar background="bg-orange-100">
        <SidebarItem
          icon={<User />}
          text="Alumnos"
          active={view === "students"}
          bgActive="bg-orange-200"
          onClick={() => setView("students")}
        />
        <SidebarItem
          icon={<User />}
          text="Boletas"
          active={view === "admins"}
          bgActive="bg-orange-200"
          onClick={handleModal}
        />
        <SidebarItem
          icon={<History />}
          text="Historial de Pagos"
          active={view === "historial-pagos"}
          bgActive="bg-orange-200"
          onClick={() => setView("historial-pagos")}
        />
        <Link href="/chatPage" passHref legacyBehavior>
          <a target="_blank" rel="noopener noreferrer">
            <SidebarItem
              icon={<MessageCircle />}
              text="Chat en vivo"
              bgActive="bg-orange-200"
            />
          </a>
        </Link>
      </Sidebar>
      <div className="flex-1 h-full bg-orange-50 p-12">
        {isLoading ? (
          <div className="h-[90vh] text-lg flex items-center justify-center">
            Cargando...
          </div>
        ) : (
          <>
            {view === "students" && (
              <StudentTableByInstitute
                studentByInstitute={studentsByInstitute}
              />
            )}
            {view === "historial-pagos" && (
              <InstitutionPayments payments={paymentsByInstitute} />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardInstitution;
