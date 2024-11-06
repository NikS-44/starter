import { mock } from "jest-mock-extended";

interface User {
  id: string;
  name: string;
}

interface UserService {
  getUser(id: string): Promise<User>;
}

const mockUserService = mock<UserService>();

mockUserService.getUser.mockResolvedValue({ id: "1", name: "Alice" });

describe("UserService", () => {
  it("should fetch user data", async () => {
    const user = await mockUserService.getUser("1");
    expect(user).toEqual({ id: "1", name: "Alice" });
    expect(mockUserService.getUser).toHaveBeenCalledWith("1");
  });
});
