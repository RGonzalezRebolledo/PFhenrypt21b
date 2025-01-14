export interface IEmployeeProps {
  id?: string;
  name: string;
  dni: number;
  birthdate: Date;
  phone: number;
  role: string;
  active?: boolean;
}

export interface IEmployeeError {
  name?: string;
  dni?: string;
  birthdate?: string;
  phone?: number;
  role?: string;
} 