import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loadersSlice'
import { message, Table } from 'antd';
import { getAllTheatres, updateTheatre } from '../../apicalls/theatres';

function TheatresList() {
  const [theatres = [], setTheatres] = useState([]);

  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleStatusChange = async (theatre) => {
    try {
      dispatch(ShowLoading());
      const response = await updateTheatre({
        theatreId: theatre._id,
        ...theatre, 
        isActive: !theatre.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending / Blocked";
        }
      }
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isActive && <span
              className='undefline'
              onClick={() => handleStatusChange(record)}
            >
              Blcok
            </span>}
            {!record.isActive && <span
                
                className='undefline'
                onClick={() => handleStatusChange(record)}
            >
              Approved
              </span>}
          </div>
        );
      }
    }



  ]

  useEffect(() => {

    getData();
  }, []);

  return (
    <div>


      <Table columns={columns} dataSource={theatres} />


    </div>
  )
}

export default TheatresList