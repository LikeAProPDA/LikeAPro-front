import FullCalendar from "@fullcalendar/react";
import { Card } from "react-bootstrap";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";
import { getSchedule } from "../../lib/apis/scheduleApi";
import Swal from "sweetalert2";

const CalandarForm = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    getSchedule().then((data) => {
      setSchedule(data);
    });
  }, []);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const handleEventClick = (arg) => {
    Swal.fire({
      title: arg.event._def.title,
      text: arg.dateStr,
      confirmButtonText: "확인",
    });
  };

  return (
    <Card
      className="p-4"
      style={{
        borderRadius: "15px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Card.Body>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          expandRows={true}
          locale="kr"
          initialView="dayGridMonth"
          weekends={false}
          events={schedule}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
          headerToolbar={{
            start: "prev",
            center: "title",
            right: "next",
          }}
          titleFormat={{
            month: "long",
            year: "numeric",
          }}
          contentHeight={370}
        />
      </Card.Body>
    </Card>
  );
};

export default CalandarForm;
