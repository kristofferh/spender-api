const Item = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Item.associate = models => {
    Item.belongsTo(models.User, {
      onDelete: "CASCADE"
    });
    Item.belongsToMany(models.Tag, {
      through: "ItemTags"
    });
  };

  return Item;
};

export default Item;
