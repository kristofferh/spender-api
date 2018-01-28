const UserToken = (sequelize, DataTypes) => {
  const UserToken = sequelize.define("UserToken", {
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
    UserToken.belongsTo(models.User, {
      foreignKey: {
        name: "uid",
        allowNull: false,
        unique: true
      },
      onDelete: "CASCADE"
    });
  };

  return UserToken;
};

export default UserToken;
