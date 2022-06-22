import {fetchData, writeData, fetchUsersData, writeUsersData} from '../utils/utils';
import createError, {HttpError} from 'http-errors';
import {Request, Response, NextFunction} from 'express';
import asyncHandler from 'express-async-handler'
import { createData, findAllData, findById, updateData, deleteData, createNewUser } from '../models/models';
import bcrypt from 'bcryptjs';
import {v4 as uuidv4} from 'uuid'; 
import jwt from 'jsonwebtoken';
import { validateUser, validateUserLoginDetails } from '../models/inputValidator';
// export const newClient = async function(details: InewCustomer){
//     const {fullname, email, gender, phone, address, notes} = await details;
//     const customer: IdataSchema = {
//         "id": ++customerID,
//         "fullname": fullname,
//         "email": email,
//         "gender": gender,
//         "phone": phone,
//         "address": address,
//         "notes": notes || ' '
//     }
//     // Add new customer to database
//     const allData = await fetchData();
//     writeData(customer, allData);

//     return allData;
// }


export const getCustomers = asyncHandler(async function (req:Request, res: Response, next: NextFunction) {
    
    const data = await findAllData();
    res.status(200).render('showCustomers', {title: 'Customers', data});
    // Array to render
    // res.render('index', { title: 'Express' });
  })

export const getCustomersById = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await findById(id);
    res.status(200).json(data);
    // Single customer to render
    // res.render('index', { title: 'Express' });
  })


export const addCustomer = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const customerDetails: InewCustomer = req.body;
    const data = await createData(customerDetails);
    const allData = await findAllData();
    res.status(200).render('showCustomers', {title: 'Customers', data: allData});
    // Array to render
    // await res.render('index', { title: 'Express' });
  })


export const updateCustomerDetails = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    if(!req.body){
        res.status(400);
        throw new Error('No new data given');
    }
    console.log(req.body)
    const customerDetails: IupdateCustomer = req.body;
    const data = await updateData(customerDetails);
    res.status(200).redirect('/users');
    // Array to render
    // res.render('index', { title: 'Express' });
  })


 
export const deleteCustomerDetails = asyncHandler(async function(req:Request, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    const data = await deleteData(id);
    if (data === -1){
      res.status(404);
      throw new Error('No customer which such id exists');
    }
    res.status(200).render('showCustomers', {title: 'Customers', data});
    // Array to render. When deleted, Take user to the all customers page
    // res.render('index', { title: 'Express' });
  })

  export const getAddCustomerPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
    const token = req.cookies.token
    if(!token){
      res.status(401).render('login')
    }
    res.status(201).render('addCustomer', {title: 'Add Customer', token: token});
  })

export const getUpdatePage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const token = req.cookies.token
  console.log(token)
  if(!token){
    res.status(401).render('login')
  }
  res.status(201).render('update', {title: 'Update', token: token});
})

export const getUpdatePageById = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const id = req.path.split('/')[2]
  const token = req.cookies.token
  if(!token){
    res.status(401).render('login')
  }
  res.status(201).render('updateById', {title: 'Update', token: token, id: id});
})


export const getCustomerToDelete = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
    const reqPath = req.path;
    const user = req.user;
    const customerId = reqPath.split('/')[3];
    res.status(201).render('deleteCustomer', {title: 'Delete Customer Records', id: customerId, user: user?.fullname})
})

/*******************************************Authentication and Authorization************************************/

export const getRegisterPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  res.render('register', {title: "Register"})
})
export const getLoginPage = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  res.render('login', {title: "Login"})
})




export const registerUser = asyncHandler(async function(req:Request, res: Response, next: NextFunction){
  const {name, email, password, confirmPassword, access_token} = req.body
  const valid = await validateUser(name, email, password, confirmPassword, access_token)
  if(valid){
    console.log('It is valid')
    if(!name || !email || !password){
      res.status(400);
      // err.status()
      throw new Error('Please add all fields')
    }
    // Check if User email exists
    const allData = fetchUsersData();
    const userExists = allData.find((data)=> data.email === email)
    if(userExists){
      res.status(400);
      throw new Error('A user already exists with same email');
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create id
    const userId = uuidv4();
    const newUser = await createNewUser(userId, name, email, hashedPassword);
    const userData = await fetchUsersData();
    if(!newUser){ 
      res.status(400);
      throw new Error('Invalid user data');
  
    }
    // Store cookies
    const token = generateToken(newUser.id);
    res.cookie('token', token);
    res.status(201).json({
      name:newUser.fullname, 
      email: newUser.email, 
      token: token
    });
    writeUsersData(newUser, userData);

  }

   
})


export const loginUser = asyncHandler(async function(req: Request, res: Response, next: NextFunction){

  const {email, password, repeat_password} = req.body;
  const valid = await validateUserLoginDetails( email, password, repeat_password)
  if (valid){
    const allData = await fetchUsersData();
    const user = allData.find((user)=> user.email === email);
    if (user && (await bcrypt.compare(password, user.password))){
        //Store cookies 
        const token = generateToken(user.id);
        res.cookie('token', token);

        res.status(201).redirect('/users');
    }else{
      res.status(400);
      throw new Error('Invalid password or email');
    }
  }

  // res.json({message: 'Logged In'})
})  

export const logout = asyncHandler( async function(req: Request, res: Response, next: NextFunction){
    if(req.cookies.token){
      req.cookies.token = null;
      res.status(200).redirect('/');
    }
})

// Generate Token
const generateToken = function(id: string){
  if(process.env.JWT_SECRET ){
      return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
  }
    
}

/*********************************** */

