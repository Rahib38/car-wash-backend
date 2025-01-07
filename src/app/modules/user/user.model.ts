/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import mongoose, { model } from 'mongoose';
import config from '../../config';
import { IUser } from './user.interface';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      // unique: true,
      select: false,
    },
    phone: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      // default: 'user',
    },
    address: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    // Ensure `this` is a Mongoose document
    if (this.isModified('password')) { // Only hash the password if it has been modified
      if (!this.password) {
        throw new Error('Password is required');
      }

      // Hash the password
      this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
    }

    next(); // Proceed to the next middleware or save operation
  } catch (err:any) {
    next(err); // Pass the error to Mongoose error handlers
  }
});

export const userModel = model<IUser>('userModel', userSchema);
