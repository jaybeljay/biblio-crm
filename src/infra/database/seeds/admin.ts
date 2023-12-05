import mongoose from 'mongoose';
import { Admin, AdminSchema } from '../module/schemas/admin.schema';

const data: Admin[] = [
  {
    firstName: 'Юлия',
    lastName: 'Бельдюгина',
    email: 'yuliya_beldyugina@mail.ru',
    password: '$2b$10$F76yAiNNt5WyI6qoRjp81egubUxyga/mj2am032sWp2/jyOKZ8FTW', //Qwerty12345!
    isActive: true,
    isSuperAdmin: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seed() {
  const conn = mongoose.createConnection(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_NAME,
  });
  const AdminModel = conn.model(Admin.name, AdminSchema);
  AdminModel.create(data).then(() => conn.close());
}

seed();
