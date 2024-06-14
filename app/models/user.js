import mongoose, { Schema } from 'mongoose';

// Define the PostSchema for individual posts
const PostSchema = new Schema({
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

// Define the UserSchema with an array of posts
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    secure_url: String,
    posts: [PostSchema] // Embedding PostSchema as an array
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

// Create and export the User model
export const User = mongoose.models.users || mongoose.model('users', UserSchema);
