import _ from "lodash";

const convertCamelCaseToSnakeCaseObj = (obj) => {
  const newObj = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(obj)) {
    newObj[_.snakeCase(key)] = value;
  }

  return newObj;
};

export default convertCamelCaseToSnakeCaseObj;
