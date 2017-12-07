import PropTypes from "prop-types";
import { Component } from "react";

export default class Context extends Component {
  static contextTypes = {
    context: PropTypes.object
  };

  static childContextTypes = {
    context: PropTypes.object.isRequired
  };

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  getChildContext() {
    const { context } = this.context;
    const {
      // eslint-disable-next-line no-unused-vars
      children,
      ...props
    } = this.props;

    return {
      context: {
        ...context,
        ...props
      }
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
