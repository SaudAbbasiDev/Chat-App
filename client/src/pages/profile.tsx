import { useAuthStore } from "../components/authstore.js";

const ProfilePage = () => {
  const { isUpdatingprofile, Updateprofile, authUser } = useAuthStore();
  // const [Image, setImage] = useState<any>(null);

  const handleImage = async (e: any) => {
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      let base64Image = reader.result;
      // setImage(base64Image);
      await Updateprofile({ profilePic: base64Image });
    };
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 space-y-8">
        <h2 className="text-3xl font-bold text-gray-800">Edit Profile</h2>

        {/* Profile Image Upload */}
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <img
              className="h-16 w-16 object-cover rounded-full border-2 border-gray-300"
              src={authUser?.profilePic || "/avatar.png"}
              alt="Profile"
            />
          </div>
          <label className="block">
            {/* <span className="sr-only">Choose profile photo</span> */}
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0 file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleImage}
              disabled={isUpdatingprofile}
            />
            {isUpdatingprofile? "Updating": "Click to update"}
          </label>
        </div>

        {/* Name Update Form */}
        <div className="flex justify-between">
          <p className="font-bold">
            Full Name
          </p>
         <p>{authUser?.fullname} </p>
        </div>

        {/* Password Update Form */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-bold">
              User Name
            </p>
          <p>{authUser?.fullname} </p>
          </div>
        
        </div>
        <div className="flex justify-between max-md:flex-col">
<p className="font-bold">Member Since </p>
<p>{authUser.createdAt?.split("T")[0]} </p>

        </div>

        {/* Submit Button */}
      </div>
    </div>
  );
};

export default ProfilePage;
