const LocalStrategy = require('passport-local').Strategy
var User = require('./models/model_user')
module.exports = function(passport){

    // passport.use()
// ใช้ LocalStrategy โดยใช้ username และ password
// ภายใน function จะใช้ User.findOne() เพื่อหา username ใน Database
// ถ้าเจอ ก็ compareSync ด้วย bcrypt หากตรง แสดงว่า login ถูกต้อง
// ก็จะ callback (คือ callback function) ส่งต่อไปให้ `req.user` จะมีค่า user
// และไป step ถัดไปคือ serialzie และ deserialize

passport.use(
    new LocalStrategy((username, password, callback) => {
        User.findOne({ username: username }, (err, user) => {
          console.log('======> Find in data: Input | '+username);
            if (err) {
              console.log('======> Find in data: Error');
              return callback(err);
            }else{
                if(user){
                    console.log('======> Find in data: Found | '+username);
                    var vaild = bcrypt.compareSync(password, user.password)
                    console.log('======> Find in data: Password | '+vaild);
                    if(vaild){
                        console.log('======> Find in data: OK ');
                        callback(null,{
                            id: user._id,
                            username: user.username,
                            password: user.password
                        })
                    }else{
                        console.log('======> Find in data: Pass not OK ');
                        return callback(null, false);
                    }
                }else{
                  console.log('======> Find in data: Not Found');
                    return callback(null, false);
                }
            }
        });
    })
  );
  
  // serializeUser และ seserialize จะใช้ร่วมกับ session เพื่อจะดึงค่า user ระหว่าง http request
  // โดย serializeUser จะเก็บ ค่าไว้ที่ session
  // ในที่นี้คือ callback(null, user._id_) - ค่า _id จะถูกเก็บใน session
  // ส่วน derialize ใช้กรณีที่จะดึงค่าจาก session มาหาใน DB ว่าใช่ user จริงๆมั้ย
  // โดยจะเห็นได้ว่า ต้องเอา username มา `User.findById()` ถ้าเจอ ก็ callback(null, user)
  passport.serializeUser((user, callback) => {
      console.log('======> Serizlize data ID: '+user._id);
      callback(null, user.id);
  });
  
  passport.deserializeUser((id, callback) => {
      console.log('======> Verify by ID: '+id);
      User.findById(id, (err, user) => {
          if (err) {
          return callback(err);
          }
          callback(null, user);
      });
  });
}