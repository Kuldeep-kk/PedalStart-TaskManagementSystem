'use client'
;import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {FloatLabel} from "primereact/floatlabel";
import {InputTextarea} from "primereact/inputtextarea";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {FiEdit3} from "react-icons/fi";
import {updateTask} from "@/app/services/taskService";


const EditTask = ({eTitle,eDescription,eDueDate,cEmail,cPostId,mutate,onClose}) => {

    const [dueDate, setDueDate] =useState(dayjs(eDueDate));
    const [title, setTitle]=useState(eTitle);
    const [description, setDescription]=useState(eDescription);
const handleEdit=async ()=> {
    const updatedData = {
        title: title,
        description: description,
        dueDate: dueDate// Convert dayjs object to JavaScript Date object
    };
    const result = await updateTask({cEmail, cPostId, updatedData}); // Assuming cEmail and cPostId are available in the component
    if (result.success) {
        mutate(`/api/post?email=${cEmail}`);
        onClose();
    } else {
        console.error("Failed to delete task");
    }
}
    return (
        <div className={`w-[400px] h-auto bg-slate-700 opacity-50 flex flex-col gap-10 items-center justify-center rounded-xl py-5`}>
            <div className={`flex flex-col justify-center items-center gap-1 font-semibold`}>
                <FiEdit3 size={50} />
                Edit Task
            </div>
            <FloatLabel >
                <InputText id="Title" value={title} onChange={(e) => setTitle(e.target.value)} className={`w-72 h-10 text-white bg-slate-900 px-2`} />
                <label htmlFor="Title" className={`text-white`}>Title</label>
            </FloatLabel>
            <FloatLabel>
                <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} className={`w-72 text-white bg-slate-900 px-2 py-2`}  />
                <label htmlFor="Description" className={`text-white`}>Description</label>
            </FloatLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer
                    components={[
                        'DatePicker',
                        'MobileDatePicker',
                        'DesktopDatePicker',
                        'StaticDatePicker',
                    ]}

                >
                    <DemoItem>

                        <MobileDatePicker
                            className={``}
                            label="Due Date"
                            value={dueDate}
                            onChange={(newValue) => setDueDate(newValue)}


                        />

                    </DemoItem>
                </DemoContainer>
            </LocalizationProvider>

            <button style={{backgroundColor:"#eb6c2d"}} className={`px-10 py-2 rounded-2xl`} onClick={handleEdit}>
                Save
            </button>

        </div>
    );
};

export default EditTask;