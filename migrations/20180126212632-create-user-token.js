module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("UserTokens", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable("UserTokens");
  }
};
