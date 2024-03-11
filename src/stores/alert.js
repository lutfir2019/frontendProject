import { create } from 'zustand'

const useAlert = create(set => ({
  severity: '', // 'warning''success''info''error'
  variant: 'standard', // 'standard''outlined''filled'
  message: '',
  is_Active: false,
  setAlert: ({ type, variant, message, is_Active }) =>
    set({ severity: type, variant: variant, message: message, is_Active: is_Active })
}))

export default useAlert
