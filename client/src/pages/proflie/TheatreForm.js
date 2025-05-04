import React from 'react'
import { Form, message, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../components/button'
import { HideLoading, ShowLoading } from '../../redux/loadersSlice'
import { addTheatre, updateTheatre } from '../../apicalls/theatres'

function TheatreForm({
    showTheatreFormModal,
    setShowTheatreFormModal,
    formType,
    setFormType,
    selectedTheatre,
    setSelectedTheatre,
    getData
}) {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        values.owner = user._id;
        try {
            dispatch(ShowLoading());
            let response = null;
            if (formType === "add") {
                response = await addTheatre(values);
            }
            else { 
                values.theatreId = selectedTheatre._id;
                response = await updateTheatre(values);
            }

            if (response.success) {
                message.success(response.message);
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
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
    return (
        <Modal
            title={formType === "add" ? "ADD THEATRE" : "EDIT THEATRE"}
            open={showTheatreFormModal}
            onCancel={() => {
                setShowTheatreFormModal(false);
                setSelectedTheatre(null);
            }}
            footer={null}
        >
            <Form
                layout='vertical'
                onFinish={onFinish}
                initialValues={selectedTheatre}
                
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter name" }]}
                >
                    <input type='text' />
                </Form.Item>

                <Form.Item
                    label="Adress"
                    name="address"
                    rules={[{ required: true, message: "Please enter Adress" }]}
                >
                    <textarea type='text' />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: "Please enter phone" }]}
                >
                    <input type='text' />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "Please enter email" }]}
                >
                    <input type='text' />
                </Form.Item>

                <div className="flex justify-end gap-1">
                    <Button title="Cancel" variant="outlined" type="button"
                        onClick={() => {
                            setShowTheatreFormModal(false);
                            selectedTheatre(null);
                        }}
                    />
                    <Button title="Save" type="submit" />
                </div>
            </Form>

        </Modal>
    )
}

export default TheatreForm