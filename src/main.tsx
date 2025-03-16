import {StrictMode, Suspense} from 'react'
import {createRoot} from 'react-dom/client'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

import './index.css'
import {App} from './App'

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={new QueryClient()}>
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </StrictMode>
  </QueryClientProvider>,
)
