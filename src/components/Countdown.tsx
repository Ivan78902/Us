import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Event {
  id: string;
  name: string;
  date: string;
}

const Countdown: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', name: 'First Anniversary', date: '2025-02-10' }
  ]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });
  const [selectedEvent, setSelectedEvent] = useState<Event>(events[0]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(events[0].date));

  function calculateTimeLeft(targetDate: string) {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(selectedEvent.date));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const addEvent = () => {
    if (newEvent.name && newEvent.date) {
      const event: Event = {
        id: Date.now().toString(),
        name: newEvent.name,
        date: newEvent.date
      };
      setEvents([...events, event]);
      setNewEvent({ name: '', date: '' });
    }
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    if (selectedEvent.id === id) {
      setSelectedEvent(events[0]);
    }
  };

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-2xl font-bold mx-2" key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="bg-peach py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-script text-burgundy mb-8">Countdown to Our Special Moments</h2>
        <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg inline-block mb-8">
          <h3 className="text-2xl font-script text-rose-gold mb-4">{selectedEvent.name}</h3>
          {timerComponents.length ? timerComponents : <span>It's time!</span>}
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-script text-burgundy mb-4">Add New Event</h3>
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event Name"
              className="mb-2 p-2 rounded w-full max-w-md"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="mb-2 p-2 rounded w-full max-w-md"
            />
            <button
              onClick={addEvent}
              className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center"
            >
              <PlusCircle size={20} className="mr-2" />
              Add Event
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-script text-burgundy mb-4">Upcoming Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white p-4 rounded-lg shadow-lg">
                <h4 className="text-xl font-script text-rose-gold mb-2">{event.name}</h4>
                <p className="text-plum mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="bg-rose-gold text-white font-sans py-1 px-4 rounded-full hover:bg-burgundy transition duration-300 text-sm"
                  >
                    Set as Countdown
                  </button>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="text-burgundy hover:text-rose-gold transition-colors duration-300"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;