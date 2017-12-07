import PropTypes from "prop-types";
import React, { Component } from "react";

import { noop } from "./utils";

export default (
  mapContextToPropsOrWrappedComponent,
  optionalMapContextToChildContext
) => {
  const withArguments = !(
    mapContextToPropsOrWrappedComponent &&
    mapContextToPropsOrWrappedComponent.prototype instanceof Component
  );
  const mapContextToPropsFunction =
    (withArguments && mapContextToPropsOrWrappedComponent) || noop;
  const mapContextToChildContextFunction =
    optionalMapContextToChildContext || noop;

  const connectContext = WrappedComponent =>
    class FromContextWrapper extends Component {
      static childContextTypes = {
        context: PropTypes.object.isRequired
      };

      static contextTypes = {
        context: PropTypes.object
      };

      static propTypes = {
        mapContextToProps: PropTypes.func.isRequired,
        mapContextToChildContext: PropTypes.func.isRequired
      };

      static defaultProps = {
        mapContextToProps: mapContextToPropsFunction,
        mapContextToChildContext: mapContextToChildContextFunction
      };

      static displayName = `ConnectContext(${WrappedComponent.name})`;

      getChildContext() {
        const { context } = this.context;
        const {
          mapContextToProps, // eslint-disable-line no-unused-vars
          mapContextToChildContext,
          ...props
        } = this.props;

        return {
          context: {
            ...context,
            ...mapContextToChildContext(context, props)
          }
        };
      }

      render() {
        const { context } = this.context;
        const {
          mapContextToProps,
          mapContextToChildContext, // eslint-disable-line no-unused-vars
          ...props
        } = this.props;

        return (
          <WrappedComponent
            {...props}
            {...mapContextToProps(context, this.props)}
          />
        );
      }
    };

  return withArguments
    ? connectContext
    : connectContext(mapContextToPropsOrWrappedComponent);
};
