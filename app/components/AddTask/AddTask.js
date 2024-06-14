'use client';
import React, {useContext, useState} from 'react';
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MdAddLink } from "react-icons/md";
import {newPost} from "@/app/services/taskService";
import {useSession} from "next-auth/react";
import UserContext from "@/app/context/userContext";

const AddTask = ({mutate,cEmail}) => {
    const {status,data}=useSession();
    const context=useContext(UserContext);
    const [dueDate, setDueDate] = useState(dayjs());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '', dueDate: '' });

    const validate = () => {

        let tempErrors = { title: '', description: '', dueDate: '' };
        let isValid = true;

        if (!title.trim()) {
            tempErrors.title = 'Title is required';
            isValid = false;
        }
        if (!description.trim()) {
            tempErrors.description = 'Description is required';
            isValid = false;
        }
        if (!dueDate || !dayjs(dueDate).isValid()) {
            tempErrors.dueDate = 'Valid due date is required';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validate()) {

            const result =await newPost({title,description,dueDate},data.user.email);
            if (result.success) {
                mutate(`/api/post?email=${cEmail}`);

                context.setOpenNewTask(false);

            } else {
                console.error("Failed to delete task");
            }

        }
    };



    return (
        <div className={`w-[400px] h-auto bg-slate-700 opacity-50 flex flex-col gap-5 items-center justify-center rounded-xl py-5`}>
            <div className={`flex flex-col justify-center items-center gap-1 font-semibold`}>
                <MdAddLink size={50} />
                Add New Task
            </div>
            <FloatLabel>
                <InputText
                    id="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`w-72 h-10 text-white bg-slate-900`}
                />
                <label htmlFor="Title" className={`text-white`}>Title</label>
            </FloatLabel>
            {errors.title && <span className="text-red-500">{errors.title}</span>}
            <FloatLabel>
                <InputTextarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    cols={30}
                    className={`w-72 text-white bg-slate-900`}
                />
                <label htmlFor="Description" className={`text-white`}>Description</label>

            </FloatLabel>
            {errors.description && <span className="text-red-500">{errors.description}</span>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileDatePicker']}>
                    <DemoItem>
                        <MobileDatePicker
                            label="Due Date"
                            value={dueDate}
                            onChange={(newValue) => setDueDate(newValue)}
                        />
                        {errors.dueDate && <span className="text-red-500">{errors.dueDate}</span>}
                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>
            <button
                style={{ backgroundColor: "#eb6c2d" }}
                className={`px-10 py-2 rounded-2xl`}
                onClick={handleSubmit}
            >
                Add
            </button>
        </div>
    );
};

export default AddTask;
