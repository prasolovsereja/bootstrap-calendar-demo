import { HttpError } from "@/utils/HttpError";

test("HttpError test", () => {
  const error = new HttpError(400, "Error");
  expect(error.status).toBe(400);
  expect(error.message).toBe("Error");
  expect(error instanceof HttpError && error instanceof Error).toBeTruthy();
  expect(() => {
    throw error;
  }).toThrow();
});
