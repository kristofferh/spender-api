const Tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING
    }
  });

  Tag.associate = models => {
    Tag.belongsTo(models.User);
    Tag.belongsToMany(models.Item, { through: "ItemTags" });
  };

  return Tag;
};

export default Tag;
