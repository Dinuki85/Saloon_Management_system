export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  token?: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface Staff {
  id: number;
  name: string;
  specialization: string;
  availability?: string;
}

export interface Appointment {
  id: number;
  user: User;
  service: Service;
  staff: Staff;
  date: string;
  timeSlot: string;
  status: string;
}
