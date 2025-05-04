import React, { useEffect } from 'react'
import { Col, Form, Modal, Row, Table, message } from 'antd'
import Button from '../../../components/button'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loadersSlice'
import { GetAllMovies } from '../../../apicalls/movies'
import { addShow, deleteShow, GetAllShowsByTheatre } from '../../../apicalls/theatres'
import moment from 'moment'


function Shows({ openShowsModal, setOpenShowsModal, theatre }) {
    const [view, setView] = React.useState("table");
    const [shows = [], setShows] = React.useState([]);
    const [movies = [], setMovies] = React.useState([]);
    const dispath = useDispatch();

    const getData = async () => {
        try {
            dispath(ShowLoading())
            const moviesResponse = await GetAllMovies();
            dispath(HideLoading())
            if (moviesResponse.success) {
                setMovies(moviesResponse.data);
            }
            else {
                message.error(moviesResponse.message);
            }
            const showsResponse = await GetAllShowsByTheatre({ theatreId: theatre._id });
            if (showsResponse.success) {
                setShows(showsResponse.data);
            } else {
                message.error(showsResponse.message);
            }
        } catch (error) {

            message.error(error.message);
            dispath(HideLoading());
        }
    }

    const handleAddShow = async (values) => {
        try {
            dispath(ShowLoading())
            const response = await addShow({
                ...values,
                theatre: theatre._id,
            });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispath(HideLoading())
        } catch (error) {
            message.error(error.message);
            dispath(HideLoading());
        }
    }

    const handleDelete = async (id) => {
        try {
            dispath(ShowLoading())
            const response = await deleteShow({ showId: id });
            if (response.success) {
                message.success(response.message);
                getData();
            } else {
                message.error(response.message);
            }
            dispath(HideLoading())
        } catch (error) {
            message.error(error.message);
            dispath(HideLoading());
        }
    };

    const columns = [
        {
            title: "Show Name",
            dataIndex: "name",
        },
        {
            title: "Time",
            dataIndex: "time",
        },
        {
            title: "Date",
            dataIndex: "date",
            render : (text, record) => {
                return moment(record.date).format("MMMM Do YYYY")

            }
        },
        {
            title: "Movie",
            dataIndex: "movie",
            render : (text, record) => {
                return record.movie.title;
            }
        },
        {
            title: "Ticket Price",
            dataIndex: "ticketPrice",
        },
        {
            title: "Total Seats",
            dataIndex: "totalSeats",
        },
        {
            title: "Available Seats",
            dataIndex: "availableSeats",
            render : (text, record) => {
                return record.totalSeats - record.bookedSeats.length;
            }

        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => {
                return (
                    <div className="flex gap-1 items-center">
                        {record.bookedSeats.length === 0 && (
                            <i
                            className="ri-delete-bin-line"
                            onClick={() => {
                                handleDelete(record._id);
                            }}
                        ></i>
                        )}

                    </div>
                )
            },
        },
    ];

    useEffect(() => {
        getData();

    }, []);
    return (
        <Modal
            title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1300}
            footer={null}
        >
            <h1 className="text-primary text-md  uppercase mb-1">
                Theatre : {theatre.name}
            </h1>

            <hr />

            <div className="flex justify-between mt-1 mb-1 items-center">
                <h1 className="text-md uppercase">
                    {view === "table" ? "Shows" : "Add Show"}
                </h1>
                {view === "table" && (
                    <Button
                        variant="outlined"
                        title="Add Show"
                        onClick={() => {
                            setView("form")
                        }}
                    />
                )}


            </div>

            {view === "table" && (
                <Table columns={columns} dataSource={shows} />
            )}

            {view === "form" && (
                <Form layout="vertical"
                    onFinish={handleAddShow}
                >
                    <Row
                        gutter={[16, 16]}
                    >
                        <Col span={8}>
                            <Form.Item label="Show Name" name="name"
                                rules={[{ required: true, message: 'Please input the show name!' }]}
                            >
                                <input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Date" name="date"
                                rules={[{ required: true, message: 'Please input the date!' }]}
                            >
                                <input type="date" 
                                    min={new Date().toISOString().split("T")[0]}
                                />
                                
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Time" name="time"
                                rules={[{ required: true, message: 'Please input the time!' }]}
                            >
                                <input type="time" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Movie" name="movie"
                                rules={[{ required: true, message: 'Please select a movie!' }]}
                            >
                                <select>
                                    <option value="">Select Movie</option>
                                    {movies.map((movie) => (
                                        <option value={movie._id}>{movie.title}</option>
                                    ))}
                                </select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Ticket Price" name="ticketPrice"
                                rules={[{ required: true, message: 'Please input the ticket price!' }]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Total Seats" name="totalSeats"
                                rules={[{ required: true, message: 'Please input the total seats!' }]}
                            >
                                <input type="number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <div className="flex justify-end gap-1">
                        <Button
                            variant="outlined"
                            title="Cancel"
                            onClick={() => {
                                setView("table")
                            }}
                        />
                        <Button
                            variant="contained"
                            title="SAVE"
                            type="submit"

                        />
                    </div>
                </Form>
            )}
        </Modal>
    )
}

export default Shows