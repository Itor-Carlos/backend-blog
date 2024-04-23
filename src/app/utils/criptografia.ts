const crypto_module = require('crypto');

const DADOS_CRIPTOGRAFAR = {
  algoritmo: 'aes256',
  segredo: 'chaves',
  tipo: 'hex',
};

export function criptografar(senha: string) {
  const cipher = crypto_module.createCipher(
    DADOS_CRIPTOGRAFAR.algoritmo,
    DADOS_CRIPTOGRAFAR.segredo,
  );
  cipher.update(senha);
  return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
}
