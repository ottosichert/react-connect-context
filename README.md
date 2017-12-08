# react-connect-context
Get and manipulate React context in a convenient manner

## Introduction

### TL;DR

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Context, { connect } from "react-connect-context";

@connect(context => ({ theme: context.theme }))
class ThemeName extends Component {
  static propTypes = {
    theme: PropTypes.string.isRequired
  };

  render() {
    const { theme } = this.props;
    return theme;
  }
}

ReactDOM.render(
  <Context theme="dark">
    Current theme: <ThemeName />

    <div>
      Down the tree: <ThemeName />
    </div>

    <Context theme="light">
      Overridden theme: <ThemeName />
    </Context>
  </Context>,

  document.getElementById("app")
);
```

> Current theme: dark  
> Down the tree: dark  
> Overridden theme: light

### Get started

```sh
$ npm install -S react-connect-context
$ yarn add react-connect-context
```
