import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { studentsApi } from '../features/students/studentsApi'

export function renderWithProviders(ui, { preloadedState = {} } = {}) {
  const store = configureStore({
    reducer: {
      [studentsApi.reducerPath]: studentsApi.reducer,
    },
    middleware: gDM => gDM().concat(studentsApi.middleware),
    preloadedState,
  })

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper }) }
}
