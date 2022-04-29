const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const Contact = require('../service/schemas/task')
const User = require('../service/schemas/user')
const { newContacts, newUserForCatsTest } = require('./data/data')


describe('Test contact controller', () => {
  let user, token

  beforeAll(async () => {
    user = await User.create(newUserForCatsTest)
    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
    await User.updateOne({ id: user.id }, { token })
  })

  afterAll(async () => {
    await User.deleteOne({ id: user.id })
  })

  beforeEach(async () => {
    await Contact.deleteMany()
  })

  describe('Route get contacts', () => {
    it('should return status 200 for get all contacts', async () => {
      const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contacts).toBeInstanceOf(Array)
    })
    it('should return status 200 for get contacts by Id', async () => {
      const contact = await Contact.create({ ...newContacts, owner: user.id })
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data).toHaveProperty('_id')
      expect(res.body.data._id).toEqual(contact._id.toString())
    })
    it('should return status 404 if contacts not found', async () => {
      const res = await request(app)
        .get(`/api/contacts/${user._id}`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      expect(res.body).toHaveProperty('message')
    })
  })

  describe('Route POST for contacts', () => {
    it('should return status 201 for created contacts', async () => {
      const res = await request(app)
        .post(`/api/contacts`)
        .set('Authorization', `Bearer ${token}`)
        .send(newContacts)
        .set('Accept', 'application/json')

      expect(res.status).toEqual(201)
      expect(res.body).toBeDefined()
      expect(res.body.data).toHaveProperty('_id')
      expect(res.body.data.name).toEqual(newContacts.name)
    })
  })
})