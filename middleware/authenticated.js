export default function ({ app, redirect }) {
  const token = app.$cookies.get('token')
  const AxiosTooken = app.$axios.create({
    headers: { 'Authorization': token },
    baseURL: process.env.NODE_ENV === 'production' ? 'https://api.bibcongress.ru/' : 'http://localhost:3101/api/',
  });

  return AxiosTooken.get('/user/').catch(()=>{
    return redirect('/login')
  })
  
}
