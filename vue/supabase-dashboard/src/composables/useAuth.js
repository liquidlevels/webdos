import {ref, onMounted} from 'vue'
import {supabase} from '../lib/supabase'

export function useAuth() {
  const user = ref(null)
  const loading = ref(true)

  onMounted(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
      user.value = session?.user ?? null
      loading.value = false
    })

    const { data: {subscription}} = supabase.auth.onAuthStateChange(
      (_event, session) => {
        user.value = session?.user ?? null
      }
    )

    return () => subscription.unsubscribe()
  })

  const signOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) throw error
  }

  return {user,loading,signOut}
}