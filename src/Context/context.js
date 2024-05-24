import React from "react";

const userContext = React.createContext()
const UserProvider = userContext.Provider

export default userContext
export {UserProvider}