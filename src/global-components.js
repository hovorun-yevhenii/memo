import Vue from "vue";

const upperFirst = string => string.charAt(0).toUpperCase() + string.slice(1);

const camelCase = str =>
  str
    .replace(/\s(.)/g, $1 => $1.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, $1 => $1.toLowerCase());

const requireComponent = require.context(
  "./components/_global",
  true,
  /(Svg)[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(
    camelCase(
      fileName
        .split("/")
        .pop()
        .replace(/\.[^/.]+$/, "")
    )
  );

  Vue.component(componentName, componentConfig.default || componentConfig);
});
