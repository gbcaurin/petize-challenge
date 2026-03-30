//utilizando API do github para pegar os dados do usuário, utilizando o zod para validar os dados recebidos da API
import { z } from "zod";

export const userSchema = z.object({
  login: z.string(), //username do usuário
  avatar_url: z.string().url(), //foto de perfil do usuário
  name: z.string().nullable(), //nome do usuário, pode ser nulo
  bio: z.string().nullable(), //biografia do usuário, pode ser nula
  public_repos: z.number(), //número de repositórios públicos do usuário
  followers: z.number(), //número de seguidores do usuário
  following: z.number(), //número de usuários que o usuário está seguindo
  blog: z.string().url().or(z.literal("")).nullable(), //url do site pessoal do usuário, pode ser nula ou uma string vazia
  twitter_username: z.string().nullable(), //username do twitter do usuário, pode ser nulo
});
