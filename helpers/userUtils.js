import { ROLES } from './constants';
import { getUsers } from '../connect/api';

export const userRoleToString = userRole => {
  return Object.keys(ROLES).find(key => ROLES[key] === userRole);
};

export const setUserDetailsWithRole = async (setUserDetails, userInfo) => {
  if (userInfo && userInfo.email) {
    const user = await getUsers(userInfo.email);
    if (user) {
      const { role, approved } = user;
      setUserDetails({ ...userInfo, role, approved });
    } else {
      console.error('User not found!', userInfo.email);
    }
  } else {
    console.error('UserInfo object not valid!', userInfo);
  }
};

export const isAdmin = user => {
  return user.role === ROLES.OWNER || user.role === ROLES.ADMIN;
};