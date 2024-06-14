import {User} from "@/app/models/user";
import {NextResponse} from "next/server";

export const DELETE = async (req) => {
    const { cPostId, cEmail } = await req.json();

    console.log(cPostId,cEmail)

    try {
        await User.updateOne(
            { email: cEmail },
            { $pull: { posts: { _id: cPostId } } }
        );
        return NextResponse.json(
            { message: "Data Deleted Successfully", success: true },
            { status: 200 }
        );
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "failed Deleted ",success:false }, { status: 404 });
    }
};
export const PUT = async (req) => {
    const { cPostId, cEmail, updatedData } = await req.json();

    console.log(updatedData)

    try {
        await User.updateOne(
            { email: cEmail },
            { $set: { 'posts.$[postToUpdate].title': updatedData.title, 'posts.$[postToUpdate].description': updatedData.description, 'posts.$[postToUpdate].dueDate': updatedData.dueDate } },
            { arrayFilters: [{ 'postToUpdate._id': cPostId }] }
        );

        return NextResponse.json({ message: "Data Updated Successfully",success:true }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ message: "Failed to Update Data",success:false }, { status: 404 });
    }
};

