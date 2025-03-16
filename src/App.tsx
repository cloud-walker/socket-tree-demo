import {useSuspenseQuery} from '@tanstack/react-query'
import {styled} from '../styled-system/jsx'

import './modules/contentServer'
import {getContents} from './modules/contentServer'
import {hstack} from '../styled-system/patterns'
import {useState} from 'react'

export function App() {
  const query = useSuspenseQuery({
    queryKey: ['contents'],
    queryFn: getContents,
  })
  const [channel, setChannel] = useState(() => {
    return query.data[0].channel
  })

  return (
    <>
      <styled.ul css={hstack.raw()}>
        {query.data.map((contentNode) => {
          return (
            <li key={contentNode.id}>
              <styled.button
                css={{
                  cursor: 'pointer',
                  textDecoration:
                    channel === contentNode.channel ? 'underline' : 'none',
                }}
                onClick={() => {
                  setChannel(contentNode.channel)
                }}
              >
                {contentNode.channel}
              </styled.button>
            </li>
          )
        })}
      </styled.ul>
    </>
  )
}
