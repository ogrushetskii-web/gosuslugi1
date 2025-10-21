import { prisma } from '../config/prisma';

export const listAgencies = () => prisma.agency.findMany();

export const createAgency = (data: { name: string; address?: string; phone?: string }) => {
  return prisma.agency.create({ data });
};
