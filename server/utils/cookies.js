
export const formatCookie = (name, value, options) => [
  `${name}=${value}`,
  ...Object.entries(options).map(([key, setting]) => (
    setting && (setting === true ? key : `${key}=${setting}`)
  ))
].join('; ');

export const parseCookies = (cookies = '') => cookies.split(';').reduce((o, c) => {
  const [name, ...value] = c.split('=');
  o[name.trim()] = value.join('=').trim();
  return o;
}, {});