import { expect } from "chai";
import { mount, render } from "enzyme";
import React from "react";

import { Empty } from "Tests/utils/components";
import { GetContext } from "Tests/utils/context";

import Context from ".";

describe("<Context>", () => {
  it("should render silently", () => {
    const wrapper = render(<Context>Test</Context>);
    expect(wrapper).to.be.ok;
  });

  it("should create context", () => {
    const wrapper = mount(
      <Context>
        <GetContext />
      </Context>
    );

    expect(wrapper).to.containMatchingElement(<Empty />);
  });

  it("should initialize default context", () => {
    const wrapper = mount(
      <Context>
        <GetContext />
      </Context>
    );

    expect(wrapper.find(Empty)).to.have.props(Context.defaultProps);
  });

  it("should apply context props", () => {
    const wrapper = mount(
      <Context flat>
        <GetContext />
      </Context>
    );

    expect(wrapper.find(Empty)).to.have.prop("flat", true);
  });
});
