import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const handleEditAddress = () => {};

  const removeAddress = (e, ind) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses?.splice(ind, 1);
    dispatch(updateUserAsync(newUser));
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
        <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Name: {user?.name ? user?.name : "Guest"}
          </h1>
          <h3 className="text-xl font-bold tracking-tight text-red-900">
            Email address: {user?.email ? user?.email : "user.guest@email.com"}
          </h3>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="mt-0.5 text-sm text-gray-500">Address:</p>
            {user.addresses?.map((address, ind) => (
              <div
                key={ind}
                className="flex justify-between gap-x-6 p-5 border border-solid-2 border-gray-300"
              >
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.name}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {address.street}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone{address.phone}
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    {address.pinCode}
                  </p>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e) => handleEditAddress(e, ind)}
                    >
                      Edit Address
                    </button>
                  </p>
                  <p className="text-sm leading-6 text-gray-900">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={(e) => removeAddress(e, ind)}
                    >
                      Remove Address
                    </button>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
