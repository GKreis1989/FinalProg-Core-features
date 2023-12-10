import { CustomException } from "../../helpers.js";
import * as userData from "../../data/user.js";
import { user as initUser } from "../../config/mongoCollections.js";

const main = async () => {

  let user = await initUser();

  const reset = async () => {
    await user.deleteMany({});
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
      userId: id.toString(),
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