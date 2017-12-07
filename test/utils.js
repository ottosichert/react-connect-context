import PropTypes from "prop-types";
import React, { Component } from "react";

export class Noop extends Component {
  render() {
    return null;
  }
}

export class ContextNoop extends Component {
  static contextTypes = {
    context: PropTypes.object
  };

  render() {
    const { context } = this.context;
    return context ? <Noop {...context} /> : null;
  }
}
