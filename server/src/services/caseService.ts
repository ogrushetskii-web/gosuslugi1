import { CaseStatus, Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { logActivity } from '../utils/activityLogger';

export const listCases = async (familyId: string) => {
  return prisma.case.findMany({
    where: { familyId },
    include: {
      agency: true,
      documents: true,
      comments: { include: { author: true }, orderBy: { createdAt: 'desc' }, take: 1 }
    }
  });
};

export const getCase = async (familyId: string, id: string) => {
  return prisma.case.findFirst({
    where: { id, familyId },
    include: {
      agency: true,
      documents: true,
      comments: { include: { author: true } },
      history: true,
      reminders: true
    }
  });
};

export const createCase = async (
  familyId: string,
  ownerId: string,
  payload: {
    title: string;
    description?: string;
    agencyId?: string;
    deadline?: Date;
  }
) => {
  const newCase = await prisma.case.create({
    data: {
      familyId,
      ownerId,
      title: payload.title,
      description: payload.description,
      agencyId: payload.agencyId,
      deadline: payload.deadline ?? null
    }
  });
  await logActivity({ familyId, userId: ownerId, action: 'case.created', metadata: { caseId: newCase.id } });
  return newCase;
};

export const updateCase = async (
  familyId: string,
  id: string,
  data: Partial<Prisma.CaseUpdateInput>
) => {
  const updated = await prisma.case.update({
    where: { id },
    data,
    include: { agency: true }
  });
  await logActivity({ familyId, action: 'case.updated', metadata: { caseId: updated.id } });
  return updated;
};

export const updateCaseStatus = async (
  familyId: string,
  id: string,
  status: CaseStatus,
  progress?: number
) => {
  return updateCase(familyId, id, { status, progress });
};

export const addCaseComment = async (
  familyId: string,
  caseId: string,
  authorId: string,
  content: string
) => {
  const comment = await prisma.comment.create({
    data: { caseId, authorId, content }
  });
  await logActivity({ familyId, userId: authorId, action: 'case.comment', metadata: { caseId } });
  return comment;
};
