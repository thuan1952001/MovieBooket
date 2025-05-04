import React, { useEffect, useState } from 'react'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice'
import { message, Table } from 'antd';
import { getBookingsOfUser } from "../../apicalls/bookings";


function Bookings() {
  const [bookings = [], setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
          try {
              dispatch(ShowLoading());
              const response = await getBookingsOfUser();
              if (response.success) {
                  setBookings(response.data);
              } else {
                  message.error(response.message);
              }
              dispatch(HideLoading());
          } catch (error) {
              dispatch(HideLoading());
              message.error(error.message);
          }
      };

      useEffect(() => {
      
              getData();
          }, []);

  return (
    <div>bookings</div>
  )
}

export default Bookings