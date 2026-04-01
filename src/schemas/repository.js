//utilizando API do github para pegar os dados do usuário, utilizando o zod para validar os dados recebidos da API
import { z } from "zod";

export const repoSchema = z.object({
  id: z.number(), //id do repo
  name: z.string(), //nome do repo
  description: z.string().nullable(), //descrição do repo, pode ser nula
  stargazers_count: z.number(), //número de estrelas do repos
  forks_count: z.number(), //número de forks do repo
  language: z.string().nullable(), //linguagem de programação do repo, pode ser nula
  html_url: z.string().url(), //url do repo
  updated_at: z.string(), //data de atualização do repo
});
