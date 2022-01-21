import { model, Schema, Document } from 'mongoose';
import { UserModelDocumentInterface } from './UserModel';

export interface AppointmentModelInterface {
  _id?: string;
  appointmentTime: string;
  user: UserModelDocumentInterface;
}

export type AppointmentModelDocumentInterface = AppointmentModelInterface & Document;

const AppointmentSchema = new Schema<AppointmentModelInterface>(
  {
    appointmentTime: {
      required: true,
      type: String,
      maxlength: 280,
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

export const TweetModel = model<AppointmentModelDocumentInterface>('Appointment', AppointmentSchema);
