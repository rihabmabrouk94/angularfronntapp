import {CarteOperation} from './CarteOperation';

export class CarteOperationSession {
  carte_operation_session_id: number;
  carte_operation_id: number;
  usersession_id: number;
  time: number;
  label: string;
  end_time: string;
  quantity: number;
  start_time: string;
  createdAt: string;
  updatedAt: string;

  CarteOperations: CarteOperation;
}
