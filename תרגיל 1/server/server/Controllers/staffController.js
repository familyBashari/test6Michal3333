import staffModel from "../models/staffModel.js";
import path, { basename } from "path";
import jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

export {
    addStuff,
    login
}
async function addStuff(req, res) {
    try {
        const existingStaff = await staffModel.findOne({ id: req.body.id });
        if (existingStaff) return res.status(409).send('Stuff already exists');
        
        const newStaff = new staffModel({
          ...req.body,
        });
        await newStaff.save();
        return res.status(200).send('Stuff added successfully');
      } catch (error) {
        console.error('Error adding Stuff:', error);
        return res.status(500).send(error.message);
      }
}

async function login(req, res) {
    console.log("I am in login");
      // Our login logic starts here
      try {
        // Get user input
        const { id,password} = req.body;
        // Validate user input
        if (!id || !password) {
        console.log("All input is required");
          res.status(400).send("All input is required");
          return;
        }
        // Validate if user exist in our databases-leaders or students
        const staff = await staffModel.findOne({ id,password });
        if(staff==null){
          res.status(404).send('not found, you have to sign in');
          return;}
        console.log(staff);
          // Create token
          const token = jwt.sign({
              id: staff.id,
              password:staff.password,
            },
            "dsdddder", {
              expiresIn: "2h",
            }
          );
          // save user token
          staff.token = token;
          console.log(token);
          let StaffAndToken={staff,"token":token}
        //   let user={"token":token,"name":staff.name,"userType":userT};
          res.status(200).send(StaffAndToken).end();     
      } 
      catch (err) {
        console.log(err);
      }
      // Our register logic ends here
  };
    