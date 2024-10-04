import axios from "axios";
import React, { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";

export default function ListUsers({ req, page }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [headings, setHeadings] = useState([]);
  const { data: users, loading } = useApi("/users");

  useEffect(() => {
    let attributeNames = [];
    if (users) {
      for (const key in users[0]) {
        if (users[0].hasOwnProperty(key) && key != "password") {
          attributeNames.push(key);
        }
      }
    }

    setHeadings(attributeNames);
  }, [loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="grid" className="page-container-profile grid gap-10">
      <h3>{page}</h3>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headings.map((heading, index) => (
              <th key={index} className="px-4 py-3">
                {heading}
              </th>
            ))}
            {/* <th className="border border-gray-300 p-2 bg-gray-200">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100 duration-150">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.lastName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  {user.phoneNumber}
                </td>
                <td className="px-4 py-3">{user.address}</td>
                <td className="px-4 py-3">
                  {user.addressComplement}
                </td>
                <td className="px-4 py-3">{user.city.name}</td>
                <td className="px-4 py-3">{user.zipCode}</td>
                <td className="px-4 py-3">{user.createdAt}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">{user.birthDate}</td>
                {/* <td className="flex gap-4 border border-gray-300 p-2">
                <button className="p-1 rounded bg-yellow-400">Modifier</button>
                <button className="p-1 rounded bg-red-400">Supprimer</button>
              </td> */}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
