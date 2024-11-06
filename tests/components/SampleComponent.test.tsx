import SampleComponent, { isValidEmail } from "../../app/components/SampleComponent";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";

describe("SampleComponent tests", () => {
  const mockDogImageUrl = "https://example.com/fake-dog.jpg";
  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            message: mockDogImageUrl,
            status: "success",
          }),
      }),
    );
  });

  it("renders the Sample Component", async () => {
    render(<SampleComponent hasOrangeText={false} />);
    await waitFor(() => expect(screen.getByText("Hello World")).toBeInTheDocument());
  });

  it("does basic email validation", () => {
    expect(isValidEmail("nikshahee@gmail.com")).toBe(true);
    expect(isValidEmail("nikps@yahoo.com")).toBe(true);
    expect(isValidEmail("nikshahee@gmail")).toBe(false);
    expect(isValidEmail("@gmail.com")).toBe(false);
  });

  it("should display a dog image when API call is successful", async () => {
    await act(async () => {
      render(<SampleComponent hasOrangeText={false} />);
    });

    const dogImage = screen.getByAltText("Image of dog");
    expect(dogImage.getAttribute("src")).toBe(mockDogImageUrl);
  });

  it("should handle API error gracefully", async () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error("API Error")));

    await act(async () => {
      render(<SampleComponent hasOrangeText={false} />);
    });

    const dogImage = screen.queryByAltText("Image of dog");
    expect(dogImage).not.toBeInTheDocument();
  });

  it("should update email display when valid email is entered", async () => {
    const { getByLabelText, getByText } = render(<SampleComponent hasOrangeText={false} />);

    const emailInput = getByLabelText(/email/i);
    const testEmail = "test@example.com";

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: testEmail } });
    });

    expect(getByText(`The most recent valid email is : ${testEmail}`)).toBeInTheDocument();
  });
});
