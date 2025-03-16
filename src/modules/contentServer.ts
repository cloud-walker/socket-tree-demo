import {faker} from '@faker-js/faker'
import {raise} from './raise'

type ContentLeaf = {
  id: string
  label: string
  createdAt: string
  updatedAt?: string
}

type ContentNode = {
  id: string
  channel: string
}

const channels = faker.helpers.uniqueArray(() => faker.animal.type(), 20)

const contentMap = new Map<string, ContentLeaf[]>()

for (const channel of channels) {
  const contents = faker.helpers.multiple(
    (_, i): ContentLeaf => {
      return {
        id: `${channel}-${i}`,
        label: faker.lorem.word(),
        createdAt: faker.date.recent().toISOString(),
      }
    },
    {count: 50},
  )
  contentMap.set(channel, contents)
}

export async function getContents() {
  await new Promise((res) => setTimeout(res, 1000))
  return channels.map(
    (channel, i): ContentNode => ({id: `${channel}_${i}`, channel}),
  )
}

export function makeContentSocket() {
  const joinedChannels: string[] = []

  const ref = setInterval(() => {
    for (const channel of joinedChannels) {
      const contents = contentMap.get(channel) ?? raise('Channel not found')
      const contentToUpdate = faker.helpers.arrayElement(contents)
      contentToUpdate.updatedAt = new Date().toISOString()
    }
  }, 1000)

  return {
    [Symbol.dispose]: () => {
      clearInterval(ref)
    },
    joinChannel(channel: string) {
      joinedChannels.push(channel)
    },
    leaveChannel(channel: string) {
      joinedChannels.splice(joinedChannels.indexOf(channel), 1)
    },
  }
}
