import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { studentsApi } from '../features/students/studentsApi'
import loggerMiddleware from './middleware/logger'

// ── LAB STEP 3: รวม middleware chain ───────────────────────────────────────────
// ลำดับ middleware ทำงานจากซ้ายไปขวาเมื่อ dispatch:
//   getDefaultMiddleware → studentsApi.middleware → loggerMiddleware
export const store = configureStore({
  reducer: {
    [studentsApi.reducerPath]: studentsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(studentsApi.middleware)  // caching, invalidation, polling
      .concat(loggerMiddleware),       // dev console logging
})

// จำเป็นสำหรับ refetchOnFocus + refetchOnReconnect
setupListeners(store.dispatch)

export default store
