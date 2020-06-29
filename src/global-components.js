import Vue from "vue";

const requireComponent = require.context(
  "./components/_global",
  true,
  /(Svg)[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");

  Vue.component(componentName, componentConfig.default || componentConfig);
});
