import { CustomException } from "../../helpers.js";
import * as userData from "../../data/user.js";
import { user as initUser, clinic as initClinic } from "../../config/mongoCollections.js";
import { createClinic } from "../../data/clinic.js";

const main = async () => {

  let user = await initUser();
  let clinic = await initClinic();

  const reset = async () => {
    await user.deleteMany({});
    await clinic.deleteMany({});
  }

  await reset();

  let id;

  try {
    console.log('TESTING CREATE USER');
    const res = await userData.createUser(
      'santa',
      'clause',
      'santa@stevens.edu',
      'Northpole1225!',
      'doctor'
    );
    console.log(res);
    id = res._id;
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING GET USER BY EMAIL ADDRESS');
    const res = await userData.getUserByEmailAddress("santa@stevens.edu");
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING LOGIN USER');
    const res = await userData.loginUser("santa@stevens.edu", "Northpole1225!");
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING UPDATE USER');
    const res = await userData.updateUser({
      _id: id.toString(),
      firstName: "patrick",
      lastName: "hill",
      emailAddress: "phill@stevens.edu"
    });
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING GET USER BY ID');
    const res = await userData.getUserById(id);
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING ADD USER TO CLINIC');
    await createClinic("newClinic");
    const res = await userData.addUserToClinic(id, "newClinic");
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING REMOVE USER FROM CLINIC');
    const res = await userData.removeUserFromClinic(id, "newClinic");
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    console.log('TESTING REMOVE USER');
    const res = await userData.removeUser(id);
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  await reset();

}

export default main;