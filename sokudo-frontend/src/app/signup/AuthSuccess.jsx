import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/user/UserSlice.js';

export default function AuthSuccess() {
   const [searchParams] = useSearchParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      const token = searchParams.get('token');
      const name = searchParams.get('name');
      const email = searchParams.get('email');
      const avatar = searchParams.get('avatar');

      if (!token) {
         console.error('No token found in URL');
         return;
      }

      localStorage.setItem('token', token);
      if (name) localStorage.setItem('name', name);
      if (email) localStorage.setItem('email', email);
      if (avatar) localStorage.setItem('avatar', avatar);

      dispatch(
         setCredentials({
            token,
            user: { name, email, avatar },
         })
      );

      navigate('/account');
   }, []);

   return <div>Logging you in...</div>;
}
