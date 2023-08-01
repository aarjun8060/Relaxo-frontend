import { Provider} from 'react-redux';
import store from '../src/redux/store/store'
import Nav from '../src/layout/Nav'
import Nav2 from '../src/layout/Nav2'
import '../styles/globals.css' 
 
function MyApp({ Component, pageProps }) {
      
  return (
 <Provider store={store}>
        <Nav />
        <Nav2 />
        <Component {...pageProps} />
      
 
 </Provider>
 
)}

export default MyApp
