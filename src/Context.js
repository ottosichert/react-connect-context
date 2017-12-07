import PropTypes from "prop-types";
import { Component } from "react";

import { initial } from "Components/Context/utils/constants";

export default class Context extends Component {
  static contextTypes = {
    context: PropTypes.object
  };

  static childContextTypes = {
    context: PropTypes.object.isRequired
  };

  static propTypes = {
    agbs: PropTypes.string,
    children: PropTypes.node,
    depositPrice: PropTypes.number,
    flat: PropTypes.bool,
    information: PropTypes.string,
    listLevel: PropTypes.number,
    markdown: PropTypes.object,
    parks: PropTypes.object,
    paymentOptions: PropTypes.object,
    responsiveTables: PropTypes.bool,
    size: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string
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
        ...(context || initial),
        ...props
      }
    };
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
