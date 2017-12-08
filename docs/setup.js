import PropTypes from "prop-types";
import { Component } from "react";

import { connect } from "../src";

@connect(context => ({ theme: context.theme }))
class ThemeName extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired
  };

  render() {
    return this.props.theme;
  }
}

global.ThemeName = ThemeName;
