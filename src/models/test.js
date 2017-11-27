module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define(
    "Test",
    {
      firstName: DataTypes.STRING
    },
    {
      classMethods: {
        // associate: function(models) {
        //   // associations can be defined here
        // }
      }
    }
  );
  return Test;
};
