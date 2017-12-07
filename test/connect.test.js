import { expect } from "chai";
import { mount, render } from "enzyme";
import React from "react";

import Context, { connect } from "../src";
import { noop } from "../src/utils";

import { ContextNoop, Noop } from "./utils";

describe("@connect", () => {
  it("should render silently without arguments", () => {
    const Component1 = connect(Noop);
    const Component2 = connect()(Noop);
    const wrapper1 = render(<Component1 />);
    const wrapper2 = render(<Component2 />);

    expect(wrapper1).to.be.blank();
    expect(wrapper2).to.be.blank();
  });

  it("should render silently with arguments", () => {
    const Component1 = connect(noop)(Noop);
    const Component2 = connect(noop, noop)(Noop);
    const wrapper1 = render(<Component1 />);
    const wrapper2 = render(<Component2 />);

    expect(wrapper1).to.be.blank();
    expect(wrapper2).to.be.blank();
  });

  it("should get props from context", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const Component = connect(mapContextToProps)(Noop);
    const context = { context: { flat: true } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Noop)).to.have.prop("flat", true);
  });

  it("should set context props", () => {
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = connect(null, mapContextToChildContext)(ContextNoop);
    const context = { context: { listLevel: 0 } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Noop)).to.have.prop("listLevel", 1);
  });

  it("should get and set context props", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = connect(mapContextToProps, mapContextToChildContext)(
      ContextNoop
    );
    const context = { context: { flat: true, listLevel: 0 } };
    const wrapper = mount(<Component />, { context });

    expect(wrapper.find(Noop)).to.have.props({ listLevel: 1, flat: true });
  });

  it("should get context from <Context>", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const Component = connect(mapContextToProps)(Noop);
    const wrapper = mount(
      <Context flat>
        <Component />
      </Context>
    );

    expect(wrapper.find(Noop)).to.have.prop("flat", true);
  });

  it("should set context of <Context>", () => {
    const mapContextToProps = context => ({ flat: context.flat });
    const mapContextToChildContext = context => ({
      listLevel: context.listLevel + 1
    });
    const Component = connect(mapContextToProps, mapContextToChildContext)(
      ContextNoop
    );
    const context = { context: { flat: true, listLevel: 0 } };
    const wrapper = mount(
      <Context flat>
        <Component />
      </Context>,
      { context }
    );

    expect(wrapper.find(ContextNoop)).to.have.prop("flat", true);
    expect(wrapper.find(Noop)).to.have.prop("listLevel", 1);
  });
});
