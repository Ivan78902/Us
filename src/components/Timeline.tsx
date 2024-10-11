import React, { useState, useRef } from 'react';
import { timelineEvents, TimelineEvent } from '../data/timeline';
import { PlusCircle, Trash2, Image } from 'lucide-react';

const Timeline: React.FC = () => {
  const [events, setEvents] = useState(timelineEvents);
  const [newEvent, setNewEvent] = useState<TimelineEvent>({ id: '', date: '', title: '', description: '', photo: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addEvent = () => {
    if (newEvent.date && newEvent.title) {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
      setNewEvent({ id: '', date: '', title: '', description: '', photo: '' });
    }
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewEvent({ ...newEvent, photo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-lavender py-16">
      <h2 className="text-4xl font-script text-center text-burgundy mb-12">Our Journey Together</h2>
      <div className="container mx-auto px-4">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row items-center mb-16 timeline-item">
            <div className="md:w-1/2 md:px-8">
              <h3 className="text-2xl font-script text-rose-gold mb-2">{event.title}</h3>
              <p className="text-plum mb-2">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-plum">{event.description}</p>
              <button
                onClick={() => removeEvent(event.id)}
                className="mt-2 text-burgundy hover:text-rose-gold transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
            {event.photo && (
              <div className="md:w-1/2 mt-4 md:mt-0">
                <img src={event.photo} alt={event.title} className="rounded-lg shadow-lg max-w-full h-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 mt-8">
        <h3 className="text-2xl font-script text-center text-burgundy mb-4">Add New Event</h3>
        <div className="flex flex-col items-center">
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="mb-2 p-2 rounded"
          />
          <input
            type="text"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            placeholder="Event Title"
            className="mb-2 p-2 rounded w-full max-w-md"
          />
          <textarea
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            placeholder="Event Description"
            className="mb-2 p-2 rounded w-full max-w-md"
          />
          <div className="mb-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center"
            >
              <Image size={20} className="mr-2" />
              Upload Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoUpload}
              accept="image/*"
              className="hidden"
            />
          </div>
          {newEvent.photo && (
            <img src={newEvent.photo} alt="Preview" className="mb-2 max-w-xs rounded-lg shadow-lg" />
          )}
          <button
            onClick={addEvent}
            className="bg-rose-gold text-white font-sans py-2 px-6 rounded-full hover:bg-burgundy transition duration-300 flex items-center"
          >
            <PlusCircle size={20} className="mr-2" />
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Timeline;