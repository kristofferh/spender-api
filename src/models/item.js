let Item = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Item.associate = (models) => {
    const Users = Item.belongsTo(models.User, {
      onDelete: "CASCADE",
    });
    const Tags = Item.belongsToMany(models.Tag, {
      through: "ItemTags",
    });
    return [
      {
        name: "Users",
        association: Users,
      },
      {
        name: "Tags",
        association: Tags,
      },
    ];
  };

  return Item;
};

export default Item;
