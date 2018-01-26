const UserToken = (sequelize, DataTypes) => {
  const UserToken = sequelize.define("UserToken", {
    uid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING
    },
    origin: {
      type: DataTypes.STRING
    },
    ttl: {
      type: DataTypes.BIGINT
    }
  });

  UserToken.associate = models => {
    UserToken.belongsTo(models.User);
  };

  return UserToken;
};

export default UserToken;
