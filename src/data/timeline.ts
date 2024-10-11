export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  photo?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2024-02-10',
    title: 'Our First Date',
    description: 'The day we officially started dating'
  },
  {
    id: '2',
    date: '2024-05-15',
    title: 'First Trip Together',
    description: 'Our unforgettable weekend getaway'
  },
  {
    id: '3',
    date: '2025-02-10',
    title: 'One Year Anniversary',
    description: 'Celebrating our first year together'
  },
  // Add more events as needed
];