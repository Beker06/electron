import './Styles/table.css'
import './Styles/sidebar.css'
import './Styles/navbar.css'
import './index.css'
import store from "./Redux/store/store";
import Router from './Router';
import { Provider } from 'react-redux';
import { persistStore } from "redux-persist";
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';


let persistor = persistStore(store);

function App() {
  // const { isDarkMode } = UseThemeContext()
  // const [selectElement, setSelectElement] = useState(null);


  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
