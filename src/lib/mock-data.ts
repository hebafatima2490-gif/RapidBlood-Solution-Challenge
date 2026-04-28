export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export interface BloodStock {
  type: BloodType;
  units: number;
  status: 'Available' | 'Low' | 'Critical';
}

export interface BloodBank {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  stock: BloodStock[];
}

export interface Donor {
  id: string;
  name: string;
  bloodType: BloodType;
  location: {
    lat: number;
    lng: number;
  };
  isAvailable: boolean;
}

export interface EmergencyRequest {
  id: string;
  hospitalName: string;
  bloodType: BloodType;
  unitsRequired: number;
  status: 'Pending' | 'Accepted' | 'Preparing' | 'Dispatched' | 'In-Transit' | 'Delivered';
  createdAt: string;
  eta?: number;
}

export const MOCK_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    name: 'Metropolis Blood Center',
    location: { lat: 40.7128, lng: -74.006, address: 'Downtown Metropolis' },
    stock: [
      { type: 'O-', units: 5, status: 'Low' },
      { type: 'A+', units: 25, status: 'Available' },
      { type: 'B+', units: 12, status: 'Available' },
    ],
  },
  {
    id: 'bb-2',
    name: 'Eastside Medical Bank',
    location: { lat: 40.7306, lng: -73.9352, address: 'East Side, Metropolis' },
    stock: [
      { type: 'O-', units: 1, status: 'Critical' },
      { type: 'AB+', units: 8, status: 'Available' },
    ],
  },
];

export const MOCK_DONORS: Donor[] = [
  { id: 'd-1', name: 'John Doe', bloodType: 'O-', location: { lat: 40.712, lng: -74.01 }, isAvailable: true },
  { id: 'd-2', name: 'Jane Smith', bloodType: 'B+', location: { lat: 40.725, lng: -73.98 }, isAvailable: true },
];

export const MOCK_REQUESTS: EmergencyRequest[] = [
  {
    id: 'req-101',
    hospitalName: 'St. Mary\'s Trauma Center',
    bloodType: 'O-',
    unitsRequired: 2,
    status: 'In-Transit',
    createdAt: new Date().toISOString(),
    eta: 8,
  },
];