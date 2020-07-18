import ItemType from "schema/item/type";

describe("Item Type", () => {
  it("Should match snapshot", () => {
    expect(ItemType.getFields()).toMatchSnapshot();
  });
});
