import { CustomException } from "../../helpers.js";
import * as userData from "../../data/user.js";
import { user as initUser } from "../../config/mongoCollections.js";
import { closeConnection } from "../../config/mongoConnection.js";

let user = await initUser();
await user.deleteMany({});

let id;

try {
  console.log('TESTING CREATE USER');
  const res = await userData.createUser(
    'santa',
    'clause',
    'santa@stevens.edu',
    'northpole',
    'doctor',
    []
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
  console.log('TESTING GET USER');
  const res = await userData.getUser(id);
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

await closeConnection();