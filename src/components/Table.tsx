import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

function Table() {
    const navigate = useNavigate();
    const [users, setallUsers] = useState([])


    useEffect(() => {
        getAllTeachers()

    }, [])
    const getAllTeachers = async () => {
        await axios.get(`http://localhost:3010/users/getall`)
            .then((response: any) => {
                let data = response.data
                setallUsers(data)
            })
    }
    const navigateToUser = async () => {
        navigate('/user/add')
    }

    const deleteUser = async (id: any) => {
        await axios.delete(`http://localhost:3010/user/${id}/delete`)
            .then((response: any) => {
                console.log(response)
                getAllTeachers()
            })
    }
    const editUser = async (id: any) => {
        navigate(`/user/${id}/edit`)
    }
    return (
        <div className=" bg-white p-8">
            {users.length > 0 &&
                <div className="flex justify-between">
                    <h1>Users</h1>
                    <button onClick={navigateToUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add User
                    </button>
                </div>

            }
            {users.length > 0 &&
                <table className="mt-4 table-fixed w-full border border-solid border-secondary">
                    <thead className="rounded-[4px_4px_0px_0px] border-b-2 border-b-[#e9e9e9] border-solid">
                        <tr>
                            <th className="bg-white cursor-default table-cell text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0">FirstName</th>
                            <th className="bg-white cursor-default table-cell text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0">LastName</th>
                            <th className="bg-white cursor-default table-cell text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0">Email</th>
                            <th className="bg-white cursor-default table-cell text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0">PhoneNumber</th>
                            <th className="bg-white cursor-default table-cell text-[13px] font-bold h-[43px] leading-[19.5px] text-left text-[black] px-[22px] py-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index: number) =>
                            <tr key={index}>
                                <td className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left indent-[0px] box-border text-[black] whitespace-nowrap text-ellipsis m-auto px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid">{user.firstName}</td>
                                <td className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left indent-[0px] box-border text-[black] whitespace-nowrap text-ellipsis m-auto px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid">{user.lastName}</td>
                                <td className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left indent-[0px] box-border text-[black] whitespace-nowrap text-ellipsis m-auto px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid">{user.email}</td>
                                <td className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left indent-[0px] box-border text-[black] whitespace-nowrap text-ellipsis m-auto px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid">{user.phoneNumber}</td>

                                <td className="text-[13px] font-normal h-[18px] leading-[19.5px] text-left indent-[0px] box-border text-[black] whitespace-nowrap text-ellipsis m-auto px-[25px] py-2.5 border-t-[#e9e9e9] border-t border-solid">
                                    <div className="flex">
                                        <img src="Edit.svg" alt="" className="h-6 w-6 mr-2" onClick={() => { editUser(user._id) }} />
                                        <img src="delete.svg" alt="" className="h-6 w-6" onClick={() => { deleteUser(user._id) }} />
                                    </div>
                                </td>

                            </tr>
                        )}
                    </tbody>
                </table>

            }
        </div>
    )

}

export default Table