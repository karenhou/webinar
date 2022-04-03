/**
 * check if passed in value is empty
 *
 * @param {*} value
 * @returns {boolean} true or false
 */
export const isObjEmpty = (value) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};
