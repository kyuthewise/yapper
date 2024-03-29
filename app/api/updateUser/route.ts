import { connectMongoDB } from "@/app/lib/server";
import { NextResponse } from "next/server";
import User from "@/app/models/user";

const updateUsersWithDefaultPicture = async () => {
  try {
    // Find users without a profile picture
    await connectMongoDB();

    const usersWithoutPicture = await User.find({ image: { $exists: false } });

    // Set a default profile picture URL
    const defaultProfilePictureUrl = '/uploads/defaultimg.svg';

    // Update users with the default profile picture
    const updatePromises = usersWithoutPicture.map(user =>
      User.updateOne({ _id: user._id }, { $set: { image: defaultProfilePictureUrl} })
    );

    await Promise.all(updatePromises);

    console.log('Profile pictures updated successfully');
  } catch (error) {
    console.error('Error updating profile pictures:', error);
  }
  return new NextResponse("Post list retrieved", { status: 200 });
};

// Call the function to update users
updateUsersWithDefaultPicture();