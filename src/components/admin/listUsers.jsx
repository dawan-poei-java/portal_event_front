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
      <table>
        <thead>
          <tr>
            {headings.map((heading, index) => (
              <th
                key={index}
                className="border border-gray-300 p-2 bg-gray-200"
              >
                {heading}
              </th>
            ))}
            {/* <th className="border border-gray-300 p-2 bg-gray-200">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {users && users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 sticky border bg-white left-0">
                {user.id}
              </td>
              <td className="border border-gray-300 p-2">{user.firstName}</td>
              <td className="border border-gray-300 p-2">{user.lastName}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.phoneNumber}</td>
              <td className="border border-gray-300 p-2">{user.address}</td>
              <td className="border border-gray-300 p-2">
                {user.addressComplement}
              </td>
              <td className="border border-gray-300 p-2">{user.city.name}</td>
              <td className="border border-gray-300 p-2">{user.zipCode}</td>
              <td className="border border-gray-300 p-2">{user.createdAt}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">{user.birthDate}</td>
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
