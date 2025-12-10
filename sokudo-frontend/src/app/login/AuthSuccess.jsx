import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserAfterGoogle } from "../features/user/UserSlice";

const AuthSuccess = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      const token = new URLSearchParams(window.location.search).get("token");

      if (!token) {
         navigate("/login");
         return;
      }

      const fetchUser = async () => {
         try {
            const backend = import.meta.env.VITE_API_URL;

            const res = await axios.get(`${backend}/customers/me`, {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            });

            dispatch(
               setUserAfterGoogle({
                  user: res.data,
                  token: token,
               })
            );

            navigate("/");
         } catch (err) {
            console.log(err);
            navigate("/login");
         }
      };

      fetchUser();
   }, []);

   return <p className="text-center mt-8">Logging you in…</p>;
};

export default AuthSuccess;
