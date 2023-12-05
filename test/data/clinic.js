import { CustomException } from "../../helpers.js";
import * as clinicData from "../../data/clinic.js";
import * as userData from "../../data/user.js";
import { clinic as initClinic } from "../../config/mongoCollections.js";
import { user as initUser } from "../../config/mongoCollections.js";

const main = async () => {

  let clinic = await initClinic();
  let user = await initUser();

  const reset = async () => {
    await clinic.deleteMany({});
    await user.deleteMany({});
  }

  await reset();

  let id;

  try {
    const res = await userData.createUser(
      'santa',
      'clause',
      'santa@stevens.edu',
      'northpole',
      'doctor'
    );
    id = res._id;
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    console.log('TESTING CREATE CLINIC');
    const res = await clinicData.createClinic(
      'North Pole Clinic', id
    );
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    const res = await userData.updateUser({
      userId: id.toString(),
      role: 'admin'
    });
    id = res._id;
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  try {
    console.log('TESTING CREATE CLINIC');
    const res = await clinicData.createClinic(
      'North Pole Clinic', id
    );
    console.log(res);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  console.log();

  try {
    const res = await userData.removeUser(id);
  } catch(e) {
    if(e instanceof CustomException) {
      console.log(e.code, e.message);
    }
    else console.log(e);
  }

  await reset();

}

export default main;