const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({
    pathname: "/",
  }),
}));

import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ResultComponent from "./ResultComponent";

describe("Result Component", () => {
  it("render users table", () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <ResultComponent />
      </MemoryRouter>
    );
    const table = queryByTestId("users_table");
    expect(table).toBeDefined();
  });
});
