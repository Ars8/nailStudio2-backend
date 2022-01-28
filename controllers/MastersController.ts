import express from "express";
import { AppointmentModel } from "../models/AppointmentModel";
import { UserModel } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class MastersController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const masters = await UserModel.find({}).exec();

      res.json({
        status: 'success',
        data: masters,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      });
    }
  }

  async getMasterAppointment(req: any, res: express.Response): Promise<void> {
    try {
      const masterId = req.params.id;

      if (!isValidObjectId(masterId)) {
        res.status(400).send();
        return;
      }

      const appointment = await AppointmentModel.find({user: masterId}).exec();

      if (!appointment) {
        res.status(404).send();
        return;
      }

      res.json({
        status: 'success',
        data: appointment,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {
      const data: any = {
        appointmentDate: req.body.appointmentDate,
        appointmentTime: req.body.appointmentTime,
        user: req.body._id,
      };

      const appointment = await AppointmentModel.create(data);

      res.status(201).json({
        status: 'success',
        data: appointment,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  }
}

export const MastersCtrl = new MastersController();