import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Outlet } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faB } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

function App() {
  const queryClient = new QueryClient()
  library.add(faB, faTrashCan)
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet/>
    </QueryClientProvider>
  )
}

export default App
