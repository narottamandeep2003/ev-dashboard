import React, { useEffect, useState } from 'react'
import data from './data'

export default function EV() {
    const [EVData, setEVData] = useState(data)
    const [total, setTotal] = useState(null)
    const [input, setInput] = useState("")
    const updateTotal = () => {
        let tempTotal = {
            total_vehicle_id: 0,
            total_no_of_trips: 0,
            total_trip_kms: 0,
            total_avg_kms_per_day: 0,
            total_avg_trip_per_day: 0,
            total_avg_daily_work_hour: 0,
            total_avg_daily_charging_time: 0,
            total_co2_emission: 0,
            vendor_Count: new Set()

        }
        EVData.forEach((ele) => {
            let UniqueName = tempTotal.vendor_Count;
            UniqueName.add(ele.vendor_name);
            tempTotal = {
                total_vehicle_id: tempTotal.total_vehicle_id + 1,
                total_no_of_trips: tempTotal.total_no_of_trips + ele.no_of_trips,
                total_trip_kms: tempTotal.total_trip_kms + ele.trip_kms,
                total_avg_kms_per_day: tempTotal.total_avg_kms_per_day + ele.avg_kms_per_day,
                total_avg_trip_per_day: tempTotal.total_avg_trip_per_day + ele.avg_trip_per_day,
                total_avg_daily_work_hour: tempTotal.total_avg_daily_work_hour + ele.avg_daily_work_hour,
                total_avg_daily_charging_time: tempTotal.total_avg_daily_charging_time + ele.avg_daily_charging_time,
                total_co2_emission: tempTotal.total_co2_emission + ele.co2_emission,
                vendor_Count: UniqueName
            }

        })
        let totalCount = tempTotal.total_vehicle_id;
        tempTotal = {
            total_vehicle_id: tempTotal.total_vehicle_id,
            total_no_of_trips: tempTotal.total_no_of_trips,
            total_trip_kms: tempTotal.total_trip_kms,
            total_avg_kms_per_day: tempTotal.total_avg_kms_per_day / totalCount,
            total_avg_trip_per_day: tempTotal.total_avg_trip_per_day / totalCount,
            total_avg_daily_work_hour: tempTotal.total_avg_daily_work_hour / totalCount,
            total_avg_daily_charging_time: tempTotal.total_avg_daily_charging_time / totalCount,
            total_co2_emission: tempTotal.total_co2_emission,
            vendor_Count: tempTotal.vendor_Count,
        }
        setTotal(tempTotal)
    }
    useEffect(() => {
        updateTotal();
    }, [EVData])
    let HandleSearch = () => {
        let NewSearch = EVData.filter((ele) => {
            let pattern = input.toLowerCase();
            if (ele.vendor_name.toLowerCase().indexOf(pattern) !== -1) return true
            if (ele.vehicle_id.toLowerCase().indexOf(pattern) !== -1) return true
            return false
        })
        setEVData(NewSearch);
    }
    let SortData = (field, type) => {
        // console.log(field, type)
        const NewSearch = [...EVData].sort((a, b) => {
            if (typeof a[field] === "string") {
                if (type === "ASC") return a[field] > b[field] ? 1 : -1;
                else return a[field] > b[field] ? -1 : 1;
            }
            else {
                if (type === "ASC") return a[field] - b[field];
                else return b[field] - a[field];
            }
        }
        );
        setEVData(NewSearch);
    };


    return (
        <div className='EVdataWndow'>
            <div className='search'>
                <span> <b>Vehicle level Utilization</b></span>
                <form className='InputBox' onSubmit={(e) => { e.preventDefault(); HandleSearch() }}>
                    <span className='searchBtn'><i className="bi bi-search"></i></span>
                    <input type="text" className='searchBox' placeholder='search by Vehicle ID/Vendor Name' value={input} onChange={(e) => { setInput(e.target.value) }} />
                </form>
            </div>
            <table className="table table-striped" border={1}>
                <thead className="table-light">
                    <tr >
                        <th >
                            <div className='Row'>
                                <span>Vehicle id</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("vehicle_id", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("vehicle_id", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>No of Trips</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("no_of_trips", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("no_of_trips", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>Trip Kms</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("trip_kms", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("trip_kms", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>Avg trip/day</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_kms_per_day", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_kms_per_day", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>Avg kms/trip</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_trip_per_day", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_trip_per_day", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>Avg  daily work hours</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_daily_work_hour", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_daily_work_hour", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>Avg daily charging time</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_daily_charging_time", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("avg_daily_charging_time", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='Row'>
                                <span>CO2 Emission saved</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("co2_emission", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("co2_emission", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                        <th >
                            <div className='Row'>
                                <span>vender name</span>
                                <span className='SortBTN'>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("vendor_name", "ASC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                        </svg>
                                    </span>
                                    <span style={{ zIndex: 100 }}
                                        onClick={() => { SortData("vendor_name", "DSC") }} >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                        </svg>
                                    </span>

                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className='EVRows'>
                    {
                        EVData.map((ele) => {
                            return <tr key={ele.vehicle_id}>
                                <td>{ele.vehicle_id}</td>
                                <td>{ele.no_of_trips}</td>
                                <td>{ele.trip_kms}</td>
                                <td>{ele.avg_kms_per_day}</td>
                                <td>{ele.avg_trip_per_day}</td>
                                <td>{ele.avg_daily_work_hour}</td>
                                <td>{ele.avg_daily_charging_time}</td>
                                <td>{ele.co2_emission}</td>
                                <td>{ele.vendor_name}</td>
                            </tr>
                        })
                    }
                </tbody>
                <tfoot className='EVRows'>
                    <tr >
                        <td>{total?.total_vehicle_id} EVs</td>
                        <td>{total?.total_no_of_trips}</td>
                        <td>{total?.total_trip_kms}</td>
                        <td>{total?.total_avg_kms_per_day.toFixed(2)}</td>
                        <td>{total?.total_avg_trip_per_day.toFixed(2)}</td>
                        <td>{total?.total_avg_daily_work_hour.toFixed(2)}</td>
                        <td>{total?.total_avg_daily_charging_time.toFixed(2)} hrs</td>
                        <td>{total?.total_co2_emission} kgs</td>
                        <td>{total?.vendor_Count.size} Vendors</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
