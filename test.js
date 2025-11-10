const supertest = require('supertest');
const app = require('./server')


//Vérifier jwt
describe('JWT Authentication', () => {
  it('should return a token for valid credentials', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'admin', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
  });
});


//Vérification de l'API des tâches

describe('Task API', () => {
  it('should return all tasks', async () => {
    const res = await supertest(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should create a new task', async () => {
    const res = await supertest(app)
      .post('/tasks')
      .send({ title: 'Test task' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test task');
  });

    it('should delete a task by ID', async () => {
    const newTaskRes = await supertest(app)
      .post('/tasks')
      .send({ title: 'Task to delete' });
    const taskId = newTaskRes.body.id;
    const res = await supertest(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toBe(204);
  });
});
