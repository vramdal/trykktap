import { render } from "@testing-library/react";
import App from "./App";
import React from "react";

describe("App tests", () => {
  it("should render", () => {
    const rendered = render(<App/>);
    expect(rendered.queryByText("Destinasjon")).toBeInTheDocument();
    expect(rendered.queryByText("Utlegg")).toBeInTheDocument();
    expect(rendered.queryByText("Resultat")).toBeInTheDocument();
    expect(rendered).toMatchSnapshot();
  });
});