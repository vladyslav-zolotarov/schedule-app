import { api } from '../config/axios';
import { v4 } from 'uuid';

export const getTasks = async () => {
  return await api.get('/tasks');
};

export const createTask = async (task, date) => {
  return await api.post('/tasks', {
    id: v4(),
    date,
    task,
  });
};

export const deleteTask = async (id) => {
  return await api.delete(`/tasks/${id}`);
};

export const updateTaskAction = async (id, date, task) => {
  return await api.put(`/tasks/${id}`, {
    date,
    task,
  });
};
