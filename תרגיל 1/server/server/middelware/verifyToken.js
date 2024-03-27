
import jwt  from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  try {
    console.log("verifyToken");
    console.log(req.headers)
    const token=req.headers.authorization.split(' ')[1];
    console.log("token of me",token);
    if (!token) {
      return res.status(403).send("אנא התחבר שנית-התז או הסיסמא שגויים");
    }

    const decoded = jwt.verify(token, "dsdddder");
    req.staff = decoded;
    // console.log(req.originalUrl);
    // console.log(req.baseUrl);

    // if(req.user.userType=="leader"&&req.originalUrl!="/courses" || req.user.userType=="student"&&req.originalUrl!="/students")
    //  res.status(401).send("אנא התחבר שנית-התז או הסיסמא שגויים");//לשקר אין רגליים!! האקר יקר תחזור בתשובה!!!

  } catch (err) {
    console.log("auth was not succeed");
    console.log(err)
    return res.status(401).send("אנא התחבר שנית-התז או הסיסמא שגויים");;
  }
  console.log("auth succeed");
  return next();
};

export default  verifyToken;