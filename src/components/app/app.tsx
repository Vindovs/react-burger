
import Header from '../header/header'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { dataFetch } from '../../services/actions/index';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import { Home, ForgotPassword, Ingredients, Login, Profile, Register, ResetPassword, ProfileInputs } from '../../pages'
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import { getUserInfo } from '../../services/actions/auth';
import { History } from '../../pages/history';
import Modal from '../modal/modal';
import Ingredient from '../burger-ingredients/ingredient';
import styles from './app.module.css';
function App() {

  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const location = useLocation();
  const state = location.state;

  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(dataFetch());
  }, [] )

  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.container} >
        <div>
        <Routes location={state?.curLocation || location}>
          <Route path='/' element={ <Home /> } />          
          <Route path='/*' element={<div>Error</div>} />
          <Route path='/login' element={<ProtectedRouteElement noAuth={true} component={<Login />} />} />
          <Route path='/forgot-password' element={<ProtectedRouteElement noAuth={true} component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<ProtectedRouteElement noAuth={true} component={<ResetPassword />} />} />
          <Route path='/register' element={ <ProtectedRouteElement noAuth={true} component={<Register />} />} />
          <Route path='/profile' element={<ProtectedRouteElement component={<Profile profileElement={<ProfileInputs />} />} />} />
          <Route path='/profile/orders' element={<ProtectedRouteElement component={<Profile profileElement={<History />} />} />} />
           <Route path='/ingredients/:id' element={<Ingredients />} />
        </Routes>
        {
            state?.curLocation && (<Routes>
              <Route path='/ingredients/:id' element={<Modal onClose={() => { navigate(-1); }} >
              <Ingredient />
              </Modal>} />
            </Routes>)
        }
        </div>
      </main>
    </div>
  );
}

export default App;
