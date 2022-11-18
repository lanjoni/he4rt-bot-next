import { EmbedBuilder, GuildMember, HexColorString, User } from 'discord.js'
import { COLORS, HE4RT_ICON_1_URL } from '@/defines/values.json'
import {
  DONATOR_ROLE,
  NITRO_BOOSTER_ROLE,
  VALID_PRESENTATION_DEV_ROLES,
  VALID_PRESENTATION_ENG_ROLES,
} from '@/defines/ids.json'
import { EmbedTemplateOptions } from '@/types'

export const validDisplayDevRoles = (member: GuildMember) => {
  return (
    member?.roles?.cache
      ?.filter((role) => VALID_PRESENTATION_DEV_ROLES.some((v) => v.id === role.id))
      .map((role) => `<@&${role.id}>`)
      .join(', ') || '`Nenhuma`'
  )
}

export const validDisplayEngRoles = (member: GuildMember) => {
  return (
    member?.roles?.cache
      ?.filter((role) => VALID_PRESENTATION_ENG_ROLES.some((v) => v.id === role.id))
      .map((role) => `<@&${role.id}>`)
      .join(', ') || '`Nenhuma`'
  )
}

export const getUserAvatar = (author: User) => {
  return `https://cdn.discordapp.com/avatars/${author.id}/${author.avatar}.png?size=256`
}

export const isPrivileged = (member: GuildMember) => {
  return member.roles.cache.some((v) => v.id === DONATOR_ROLE.id || v.id === NITRO_BOOSTER_ROLE.id)
}

export const embedTemplate = (options: EmbedTemplateOptions) => {
  const embed = new EmbedBuilder().setColor(options.color || (COLORS.HE4RT as HexColorString)).setTitle(options.title)

  if (options.description) embed.setDescription(options.description)
  if (options.target?.icon) embed.setThumbnail(getUserAvatar(options.target.user))
  if (options.url) embed.setURL(options.url)
  if (options.author?.avatar) embed.setAuthor({ name: options.author.username, iconURL: getUserAvatar(options.author) })

  options.fields?.forEach((f) => {
    embed.addFields(...f)
  })

  if (options.footer === undefined || options.footer) {
    embed
      .setFooter({
        text: `${new Date().getFullYear()} © He4rt Developers`,
        iconURL: HE4RT_ICON_1_URL,
      })
      .setTimestamp()
  }

  return embed
}
