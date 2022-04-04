const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import SearchComponent from "./SearchComponent";

describe("Search Component", () => {
  it("rendered Search Component", () => {
    const { getByTestId } = render(<SearchComponent />);
    const input = getByTestId("searchInput");
    const btn = getByTestId("searchButton");
    expect(input).toBeTruthy();
    expect(btn).toBeTruthy();
  });

  it("Change in Input field", async () => {
    await act(async () => {
      const { getByTestId } = render(<SearchComponent />);
      const input = getByTestId("searchInput");
      const inputText = "something";
      await fireEvent.change(input, { target: { value: inputText } });
      expect(input.value).toBe(inputText);
    });
  });
});
