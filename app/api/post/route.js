import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import {connectDb} from "@/app/helper/db";
import { parse } from 'url';

const addPostToUser = async (email, title, description, dueDate) => {
    try {
        const user = await User.findOne({ email:email  });
        if (!user) {
            throw new Error('User not found');
        }

        const newPost = {
            title,
            description,
            dueDate
        };

        user.posts.push(newPost);
        await user.save();
        console.log('Post added successfully:', user);
        return user;
    } catch (error) {
        console.error('Error adding post to user:', error);
        throw error;
    }
};

export const POST = async (req) => {
    try {
        const { email, title, description, dueDate } = await req.json();
        console.log(email, title, dueDate);
        const response = await addPostToUser(email, title, description, dueDate);
        return NextResponse.json({ message: "Data Updated Successfully",success:true }, { status: 200 });
    } catch (error) {
        console.error("Error in POST /api/comments:", error);
        return NextResponse.json({ message: "Failed to add comment" }, { status: 500 });
    }
};

export const GET = async (req) => {
    await connectDb();

    const { query } = parse(req.url, true);
    const { email } = query;

    try {
        console.log('GET', email);
        const user = await User.find({ email });
        console.log(user);
        return NextResponse.json(user);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
