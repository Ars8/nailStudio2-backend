import { model, Schema, Document } from 'mongoose';

export interface UserModelInterface {
  _id?: string;
  email: string;
  fullname: string;
  username: string;
  password: string;
  confirmHash: string;
  confirmed?: boolean;
  workingHours?: number[];
}

export type UserModelDocumentInterface = UserModelInterface & Document;

const UserSchema = new Schema<UserModelInterface>(
  {
    email: {
      unique: true,
      required: true,
      type: String,
    },
    fullname: {
      required: true,
      type: String,
    },
    username: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    confirmHash: {
      required: true,
      type: String,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    workingHours: {
      type: [Number],
      default: [10, 11, 12, 14, 15, 16, 17, 18],
    },
    location: String,
    about: String,
    website: String,
  },
  {
    timestamps: true,
  },
);

UserSchema.set('toJSON', {
  transform: function (_, obj) {
    delete obj.email;
    delete obj.password;
    delete obj.confirmHash;
    return obj;
  },
});

export const UserModel = model<UserModelDocumentInterface>('User', UserSchema);
