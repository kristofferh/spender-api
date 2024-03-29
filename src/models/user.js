import { getAvatarPublicUrl } from "../services/aws";

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email address must be valid",
        },
        isUnique(value, next) {
          User.findOne({ where: { email: value } })
            .then((user) => {
              // Reject if a different user wants to use the same email
              if (user && this.id !== user.id) {
                return next("Email already in use!");
              }
              return next();
            })
            .catch((err) => {
              return next(err);
            });
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    avatarUrl: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ["avatar"]),
      get: function () {
        return getAvatarPublicUrl(this.avatar);
      },
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  });

  User.associate = (models) => {
    const Items = User.hasMany(models.Item, { onDelete: "cascade" });
    const Tags = User.hasMany(models.Tag, { onDelete: "cascade" });
    return [
      {
        name: "Items",
        association: Items,
      },
      {
        name: "Tags",
        association: Tags,
      },
    ];
  };

  return User;
};

export default User;
