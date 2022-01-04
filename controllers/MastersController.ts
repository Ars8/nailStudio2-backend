import express from "express";
import { UserModel } from "../models/UserModel";

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
}

export const MastersCtrl = new MastersController();