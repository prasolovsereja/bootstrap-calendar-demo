import { validateEventData } from "@/middlewares/validateEventData";

describe("Validate event data", () => {
  const obj1 = {
    title: "title",
    startDate: new Date(),
    endDate: new Date(),
    date: new Date(),
  };
  const obj2 = {
    title: 1,
    startDate: new Date(),
    endDate: new Date(),
    date: new Date(),
  };
  const obj3 = {
    title: "1",
    endDate: new Date(),
    date: new Date(),
  };
  const obj4 = {
    title: "1",
    startDate: new Date(),
    date: new Date(),
  };
  const obj5 = {
    title: "1",
    startDate: new Date(),
    endDate: new Date(),
  };
  test("Should be true", () => {
    expect(validateEventData(obj1)).toBeTruthy();
  });
  test("Should be false", () => {
    expect(validateEventData(obj2)).toBeFalsy();
    expect(validateEventData(obj3)).toBeFalsy();
    expect(validateEventData(obj4)).toBeFalsy();
    expect(validateEventData(obj5)).toBeFalsy();
    expect(validateEventData({})).toBeFalsy();
  });
});
