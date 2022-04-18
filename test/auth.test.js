const { registration, login } = require("../controllers/auth");
const jestConfig = require('../jest.config')
const authService = require('../service/auth')
describe("Auth", () => {
  //beforeAll(fn)
  //afterAll(fn)
  //beforeEach(fn)
  //afterEach(fn)
  let req, res;
  beforeEach(() => {
    req = { body: { email: "user@test.com", password: "123456" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    authService.create = jest.fn((data) => data);
  });
  test("signup new user", async () => {
    result = await registration(req,res)
    console.log(result);
    expect(authService.create).toHaveBeenCalled()
    expect(authService.create).toHaveBeenCalledWith(req.body)
    expect(result.code).toBe(201)
  });
});

describe("login", () => {
  let req, res;
  beforeEach(() => {
    req = { body: { email: "user@test.com", password: "123456" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn((data) => data) };
    authService.login = jest.fn((data) => data);
  });
  test("login new user", async () => {
    result = await login(req,res)
    console.log(result);
    const{email,password}=req.body
    expect(authService.login).toHaveBeenCalled()
    expect(authService.login).toHaveBeenCalledWith( email, password )
    expect(result.code).toBe(200)
  });
});