/**
 * Converte uma string em um slug amigável para URLs.
 * Remove acentos, converte para minúsculas, substitui espaços por hífens
 * e remove caracteres especiais.
 *
 * @param input - String a ser convertida em slug
 * @returns Slug gerado
 * @example
 * toSlug('Manutenção Preventiva - Janeiro 2025')
 * // returns: 'manutencao-preventiva-janeiro-2025'
 */
export function toSlug(input: string): string {
  return input
    .normalize('NFD') // Decompõe acentos
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais exceto espaços e hífens
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Colapsa múltiplos hífens
    .replace(/^-|-$/g, ''); // Remove hífens no início e fim
}
