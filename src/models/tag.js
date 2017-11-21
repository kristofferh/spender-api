const Tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Tag.associate = models => {
    Tag.belongsTo(models.User);
  };

  return Tag;
};

export default Tag;
