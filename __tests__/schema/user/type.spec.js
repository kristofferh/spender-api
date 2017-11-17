import UserType from "schema/user/type";

describe("User Type", () => {
  it("Should match snapshot", () => {
    expect(UserType.getFields()).toMatchSnapshot();
  });
});
