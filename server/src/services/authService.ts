import { authenticator } from 'otplib';
import { nanoid } from 'nanoid';
import { hash, compare } from 'bcryptjs';
import { prisma } from '../config/prisma';
import { mailer } from '../config/mailer';
import { clearEmailCode, storeEmailCode, verifyEmailCode } from '../utils/verificationStore';
import { signToken } from '../utils/token';

export const register = async (params: {
  familyName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { email: params.email } });
  if (existing) {
    throw new Error('Пользователь уже существует');
  }

  const family = await prisma.family.create({
    data: {
      name: params.familyName,
      securitySetting: { create: {} }
    }
  });

  const passwordHash = await hash(params.password, 10);
  const user = await prisma.user.create({
    data: {
      email: params.email,
      passwordHash,
      firstName: params.firstName,
      lastName: params.lastName,
      role: 'ADMIN',
      familyId: family.id
    }
  });

  const code = nanoid(6).toUpperCase();
  storeEmailCode(user.email, code);
  await mailer.sendMail({
    to: user.email,
    subject: 'Подтвердите аккаунт',
    text: `Ваш код подтверждения: ${code}`
  });

  return { userId: user.id, familyId: family.id };
};

export const confirmEmail = async (email: string, code: string) => {
  const success = verifyEmailCode(email, code);
  if (!success) {
    throw new Error('Неверный код подтверждения');
  }
  await prisma.user.update({ where: { email }, data: { emailVerified: true } });
  clearEmailCode(email);
};

export const login = async (email: string, password: string, totp?: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Пользователь не найден');
  }
  const passwordValid = await compare(password, user.passwordHash);
  if (!passwordValid) {
    throw new Error('Неверные учётные данные');
  }
  if (!user.emailVerified) {
    throw new Error('Email не подтверждён');
  }
  if (user.totpSecret) {
    if (!totp || !authenticator.check(totp, user.totpSecret)) {
      throw new Error('Неверный одноразовый код');
    }
  }
  const token = signToken({ sub: user.id, familyId: user.familyId, role: user.role });
  return { token, user };
};

export const setupTotp = async (userId: string) => {
  const secret = authenticator.generateSecret();
  const otpauth = authenticator.keyuri(userId, 'Family Portal', secret);
  await prisma.user.update({ where: { id: userId }, data: { totpSecret: secret } });
  return { secret, otpauth }; 
};

export const disableTotp = async (userId: string) => {
  await prisma.user.update({ where: { id: userId }, data: { totpSecret: null } });
};

export const requestPasswordReset = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;
  const code = nanoid(6).toUpperCase();
  storeEmailCode(email, code);
  await mailer.sendMail({ to: email, subject: 'Сброс пароля', text: `Код для сброса: ${code}` });
};

export const resetPassword = async (email: string, code: string, newPassword: string) => {
  const valid = verifyEmailCode(email, code);
  if (!valid) {
    throw new Error('Неверный код');
  }
  const passwordHash = await hash(newPassword, 10);
  await prisma.user.update({ where: { email }, data: { passwordHash } });
  clearEmailCode(email);
};
