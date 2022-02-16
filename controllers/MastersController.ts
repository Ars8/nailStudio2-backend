import express from "express";
import { AppointmentModel } from "../models/AppointmentModel";
import { UserModel } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class MastersController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const masters = await UserModel.find({}).exec();

      const data: any = masters.map((item) => {
        const userData = {
          _id: item._id,
          username: item.username,
          fullname: item.fullname,
          workingHours: item.workingHours,
        }
        return userData;
      })

      res.json({
        status: 'success',
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error
      });
    }
  }

  async getMaster(req: any, res:express.Response): Promise<void> {
    try {
      const masterId = req.params.id;

      if (!isValidObjectId(masterId)) {
        res.status(400).send();
        return;
      }

      const masterData = await UserModel.findById(masterId).exec();

      if(!masterData) {
        res.status(404).send();
        return;
      }

      const master = {
        username: masterData.username,
        fullname: masterData.fullname,
        workingHours: masterData.workingHours,
      }

      res.json({
        status: 'success',
        data: master,
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
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

      const appointment = await AppointmentModel.find({user: masterId}).sort({appointmentDate: 'asc'}).exec();

      if (!appointment) {
        res.status(404).send();
        return;
      }

      const data: any = appointment.map(item => {
        const date = {
          appointmentDate: item.appointmentDate,
        }
        return date
      })

      res.json({
        status: 'success',
        data: data,
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