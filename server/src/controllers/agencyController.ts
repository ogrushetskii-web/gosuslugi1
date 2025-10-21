import asyncHandler from 'express-async-handler';
import { createAgency, listAgencies } from '../services/agencyService';

export const listAgenciesController = asyncHandler(async (_req, res) => {
  const agencies = await listAgencies();
  res.json(agencies);
});

export const createAgencyController = asyncHandler(async (req, res) => {
  const agency = await createAgency(req.body);
  res.status(201).json(agency);
});
