import ItemType from "schema/user/type";

describe("Item Type", () => {
  it("Should match snapshot", () => {
    expect(ItemType.getFields()).toMatchSnapshot();
  });
});
