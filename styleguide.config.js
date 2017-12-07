const path = require("path");

module.exports = {
  getComponentPathLine: componentPath => {
    const componentName = path.basename(componentPath, ".js");
    const importName =
      componentName === "Context" ? componentName : `{ ${componentName} }`;
    return `import ${importName} from "react-connect-context";`;
  },
  sections: [
    {
      name: "Components",
      components: "src/Context.js"
    },
    {
      name: "Decorators",
      sections: [
        {
          name: "@connect",
          content: "src/connect.md"
        }
      ]
    }
  ],
  title: "react-connect-context Documentation"
};
