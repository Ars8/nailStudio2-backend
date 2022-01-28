import { model, Schema, Document } from 'mongoose';
import { UserModelDocumentInterface } from './UserModel';

export interface AppointmentModelInterface {
  _id?: string;
  appointmentDate: Date;
  appointmentTime: string;
  user: UserModelDocumentInterface;
}

export type AppointmentModelDocumentInterface = AppointmentModelInterface & Document;

const AppointmentSchema = new Schema<AppointmentModelInterface>(
  {
    appointmentDate: {
      required: true,
      type: Date,
    },
    appointmentTime: {
      required: true,
      type: String,
    },
    user: {
      required: true,
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

export const AppointmentModel = model<AppointmentModelDocumentInterface>('Appointment', AppointmentSchema);
