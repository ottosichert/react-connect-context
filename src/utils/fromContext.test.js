import { expect } from "chai";
import { mount, render } from "enzyme";
import React from "react";

import Context from "Components/Context";
import { Empty } from "Tests/utils/components";
import { GetContext } from "Tests/utils/context";
import { empty } from "Utils/functions";

import fromContext from "./fromContext";

describe("@fromContext", () => {
  it("should render silently without arguments", () => {
    const Component1 = fromContext(Empty);
    const Component2 = fromContext()(Empty);
    const wrapper1 = render(<Component1 />);
    const wrapper2 = render(<Component2 />);

    expect(wrapper1).to.be.blank();
    expect(wrapper2).to.be.blank();
  });

  it("should render silently with arguments", () => {
    const Component1 = fromContext(empty)(Empty);
    const Component2 = fromContext(empty, empty)(Empty);
    const wrapper1 = render(<Component1 />);
    const wrapper2 = render(<Component2 />);

    expect(wrapper1).to.be.blank();
    expect(wrapper2).to.be.blank();
  });

  it("should get props from context", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const Component = fromContext(mapContextToProps)(Empty);
    const context = { context: { flat: true } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Empty)).to.have.prop("flat", true);
  });

  it("should set context props", () => {
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = fromContext(null, mapContextToChildContext)(GetContext);
    const context = { context: { listLevel: 0 } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Empty)).to.have.prop("listLevel", 1);
  });

  it("should get and set context props", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = fromContext(mapContextToProps, mapContextToChildContext)(
      GetContext
    );
    const context = { context: { flat: true, listLevel: 0 } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Empty)).to.have.props({ listLevel: 1, flat: true });
  });

  it("should get context from <Context>", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const Component = fromContext(mapContextToProps)(Empty);
    const wrapper = mount(
      <Context flat>
        <Component />
      </Context>
    );

    expect(wrapper.find(Empty)).to.have.prop("flat", true);
  });

  it("should set context of <Context>", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = fromContext(mapContextToProps, mapContextToChildContext)(
      GetContext
    );
    const wrapper = mount(
      <Context flat>
        <Component />
      </Context>
    );

    expect(wrapper.find(GetContext)).to.have.prop("flat", true);
    expect(wrapper.find(Empty)).to.have.prop("listLevel", 1);
  });
});
