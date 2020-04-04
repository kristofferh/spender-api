const Tag = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
    },
  });

  Tag.associate = (models) => {
    const User = Tag.belongsTo(models.User);
    const Items = Tag.belongsToMany(models.Item, { through: "ItemTags" });
    return [
      {
        name: "User",
        association: User,
      },
      {
        name: "Items",
        association: Items,
      },
    ];
  };

  return Tag;
};

export default Tag;
