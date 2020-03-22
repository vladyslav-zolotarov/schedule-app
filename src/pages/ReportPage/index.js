import React, { useContext } from "react";
import TopBar from "components/TopBar";
import Card from "../../components/Card";
import "./style.scss";
import { FaTrashAlt } from 'react-icons/all'
import { userContext } from "utils/context";

export default function ReportPage() {
    return(
        <div className="report-page">
            <TopBar text={"Report page"} />
            <div className="report-main-content">
                <Card />
            </div>
        </div>
    )




  // const { tasks, RemoveTask } = useContext(userContext);
  //
  // const contentTable = tasks.map((tasks, index) => {
  //   return (
  //     <tr key={index}>
  //       <td>{tasks.task.time}</td>
  //       <td>{tasks.task.action}</td>
  //       <td>
  //           <button className="report-page-butt" onClick={() => RemoveTask(tasks.id)}>
  //               <FaTrashAlt />
  //           </button>
  //       </td>
  //     </tr>
  //   );
  // });
  //
  // return (
  //   <div className="report-page">
  //     <TopBar text={"ReportPage"} />
  //     <div className="report-main-content">
  //       <table className="report-table">
  //         <thead>
  //         <tr>
  //             <th colSpan="3">
  //                 <h3>20 March 2020</h3>
  //             </th>
  //         </tr>
  //           <tr>
  //             <th>Time</th>
  //             <th>What to do</th>
  //             <th>Action</th>
  //           </tr>
  //         </thead>
  //         <tbody>{contentTable}</tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
}
