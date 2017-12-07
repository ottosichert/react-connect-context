import { expect } from "chai";
import { mount, render } from "enzyme";
import React from "react";

import Context from "../src";

import { ContextNoop, Noop } from "./utils";

describe("<Context>", () => {
  it("should render silently", () => {
    const wrapper = render(<Context>Test</Context>);
    expect(wrapper).to.be.ok;
  });

  it("should create context", () => {
    const wrapper = mount(
      <Context>
        <ContextNoop />
      </Context>
    );

    expect(wrapper).to.containMatchingElement(<Noop />);
  });

  it("should apply context props", () => {
    const wrapper = mount(
      <Context flat>
        <ContextNoop />
      </Context>
    );

    expect(wrapper.find(Noop)).to.have.prop("flat", true);
  });
});
