import { model, Schema, Document } from 'mongoose';
import { UserModelDocumentInterface } from './UserModel';

export interface AppointmentModelInterface {
  _id?: string;
  appointmentDate: Date;
  user: UserModelDocumentInterface;
}

export type AppointmentModelDocumentInterface = AppointmentModelInterface & Document;

const AppointmentSchema = new Schema<AppointmentModelInterface>(
  {
    appointmentDate: {
      required: true,
      type: Date,
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
