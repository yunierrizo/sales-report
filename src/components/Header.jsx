import { useEffect, useState } from "react";
import MenuDrawer from "./MenuDrawer";

function Header() {
    const [opened, setOpened] = useState(false);
    const [userOpened, setUserOpened] = useState(false);
    const [userData, seUsertData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://random-data-api.com/api/v2/users"
                ); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error("Request failed");
                }
                const jsonData = await response.json();
                seUsertData(jsonData);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <header className="flex justify-between items-center sm:fixed sm:top-0 sm:right-0 p-4 text-right min-w-full backdrop-blur-md shadow-md sticky top-0 text-white">
                <button
                    data-collapse-toggle="drawer-mobile"
                    type="button"
                    className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    onClick={() => setOpened(true)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>

                <p className="font-semibold sm:text-5xl text-3xl">
                    Sales Report
                </p>
                <img
                    className="border h-12 bg-[#3C434F] rounded-full cursor-pointer"
                    src={userData?.avatar}
                    alt={userData?.username}
                    onClick={() => setUserOpened(!userOpened)}
                />
            </header>

            {userOpened && (
                <>
                    <div
                        onClick={() => setUserOpened(false)}
                        className="absolute w-screen h-screen"
                    />
                    <div className="bg-[#3C434F] p-5 gap-3 flex flex-col absolute right-5 top-20 shadow-lg ease-in duration-300">
                        <div className="w-5 overflow-hidden inline-block absolute right-2 -top-3">
                            <div className=" h-3 w-3 bg-[#3C434F] rotate-45 transform origin-bottom-left"></div>
                        </div>
                        <p className="text-sm font-semibold text-white">
                            {userData?.first_name + " " + userData?.last_name}
                        </p>
                        <p className="text-sm text-white">{userData?.email}</p>
                        <p className="text-sm text-white cursor-pointer hover:text-gray-300">
                            Log Out @{userData?.username}
                        </p>
                    </div>
                </>
            )}

            <div>
                {opened && (
                    <div
                        onClick={() => setOpened(false)}
                        className="absolute w-screen h-screen backdrop-blur-sm backdrop-contrast-90 bg-[#282c34]/70"
                    />
                )}
                <MenuDrawer setOpened={setOpened} opened={opened} />
            </div>
        </>
    );
}

export default Header;
