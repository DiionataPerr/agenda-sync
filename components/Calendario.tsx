import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { fetchEventsFromAirtable } from '../lib/airtable';

export default function Calendario() {
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const carregarEventos = async () => {
      const dados = await fetchEventsFromAirtable();
      setEventos(
        dados.map(evento => ({
          title: evento.title,
          start: evento.start,
        }))
      );
    };

    carregarEventos();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Agenda</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={eventos}
        height="auto"
      />
    </div>
  );
}
