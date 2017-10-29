import bcrypt from "bcrypt";

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email address must be valid"
        },
        isUnique(value, next) {
          User.find({ where: { email: value } })
            .then(user => {
              // reject if a different user wants to use the same email
              if (user && this.id !== user.id) {
                return next("Email already in use!");
              }
              return next();
            })
            .catch(err => {
              return next(err);
            });
        }
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [6, 128],
          msg: "Password must be between 6 and 128 characters in length"
        }
      },
      set(val) {
        this.setDataValue("password", val);
        let salt = bcrypt.genSaltSync(5);
        let hash = bcrypt.hashSync(val, salt);
        this.setDataValue("passwordHash", hash);
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = models => {
    User.hasMany(models.Item, { onDelete: "cascade" });
    //User.hasMany(models.Tag, { onDelete: "cascade" });
  };

  User.prototype.verifyPassword = function(password, done) {
    return bcrypt.compare(password, this.passwordHash, (err, res) => {
      return done(err, res);
    });
  };

  User.prototype.toJSON = function() {
    var values = this.get();

    // Dont' return passwordHash
    delete values.passwordHash;

    return values;
  };

  return User;
};

export default User;
