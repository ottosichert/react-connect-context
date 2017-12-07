import PropTypes from "prop-types";
import React, { Component } from "react";

import { initial } from "Components/Context/utils/constants";
import { empty } from "Utils/functions";

export default (
  mapContextToPropsOrWrappedComponent,
  optionalMapContextToChildContext
) => {
  const withArguments = !(
    mapContextToPropsOrWrappedComponent &&
    mapContextToPropsOrWrappedComponent.prototype instanceof Component
  );
  const mapContextToPropsFunction = withArguments
    ? mapContextToPropsOrWrappedComponent || empty
    : empty;
  const mapContextToChildContextFunction =
    optionalMapContextToChildContext || empty;

  const fromContext = WrappedComponent =>
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

      static displayName = `FromContext(${WrappedComponent.name})`;

      getChildContext() {
        const context = this.getContext();
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

      getContext = () => {
        const { context } = this.context;

        return context || initial;
      };

      render() {
        const context = this.getContext();
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
    ? fromContext
    : fromContext(mapContextToPropsOrWrappedComponent);
};
