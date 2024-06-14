import mongoose, { Schema } from 'mongoose';

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required'],
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

export const Task = mongoose.models.tasks || mongoose.model('tasks', TaskSchema);
