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
              // Reject if a different user wants to use the same email
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
    }
  });

  User.associate = models => {
    User.hasMany(models.Item, { onDelete: "cascade" });
    User.hasMany(models.Tag, { onDelete: "cascade" });
  };

  return User;
};

export default User;
