interface ObjectRequest {
  [chave: string]: string;
}

const emptyObjectRequest = (object: ObjectRequest) => {
  return Object.keys(object).length === 0;
};

export { ObjectRequest, emptyObjectRequest };
