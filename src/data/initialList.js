import { v4 as uuid } from 'uuid';
export const initialList = [
  {
    id: uuid(),
    title: 'Learn JavaScript',
    done: true,
  },
  {
    id: uuid(),
    title: 'Learn React',
    done: true,
  },
  {
    id: uuid(),
    title: 'Get a job',
    done: false,
  },
];
