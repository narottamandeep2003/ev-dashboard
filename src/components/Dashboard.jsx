import React, { useEffect, useState } from 'react'
import data from './data'
export default function Dashboard() {
    const [EVData, setEVData] = useState(data)
    const [total, setTotal] = useState(null)
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
            vendor_Count: new Set(),
            charged: [0, 0, 0, 0]

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
                vendor_Count: UniqueName,
                charged: tempTotal.charged
            }
            if (ele.charged <= 100 && ele.charged >= 80) {
                tempTotal["charged"][0] += 1
            }
            if (ele.charged < 80 && ele.charged >= 60) {
                tempTotal["charged"][1] += 1
            }
            if (ele.charged < 60 && ele.charged >= 20) {
                tempTotal["charged"][2] += 1
            }
            if (ele.charged < 20 && ele.charged >= 0) {
                tempTotal["charged"][3] += 1
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
            charged: tempTotal.charged
        }
        setTotal(tempTotal)
    }
    useEffect(() => {
        updateTotal();
    }, [EVData])
    return (
        <div className='dashboard'>
            <div className="innerdashboard">
                <div className='left'>
                    <div className='EVS'>
                        <span className='FirstEVS'>
                            <i className="bi bi-lightning-charge-fill"></i>
                        </span>
                        <div className='box'>
                            <h1>EVs</h1>
                            <h1>{total?.total_vehicle_id}</h1>
                        </div>
                    </div>
                    <div className='AVG'>
                        <div className='item'>
                            <span className='iconbox'>
                                <i className="bi bi-bar-chart-fill"></i>
                            </span>
                            <span className='head'>Utilization</span>
                        </div>

                        <div className='item'>
                            <span className='iconbox'>
                                <i className="bi bi-lightning-charge-fill"></i>
                            </span>
                            <div className='boxx'>
                                <span className='head '> <small>Trips/day</small></span>
                                <span className='head'>{total?.total_avg_trip_per_day?.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <span className='iconbox'>
                                <i className="bi bi-lightning-charge-fill"></i>
                            </span>
                            <div className='boxx'>
                                <span className='head'> <small>KM/Trip</small></span>
                                <span className='head'>{total?.total_avg_kms_per_day?.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className='item'>
                            <span className='iconbox'>
                                <i className="bi bi-lightning-charge-fill"></i>
                            </span>
                            <div className='boxx'>
                                <span className='head'><small>Daily Utilisation</small></span>
                                <span className='head'>{total?.total_avg_daily_work_hour?.toFixed(2)} hours</span>
                            </div>
                        </div>
                    </div>
                    <div className='models'>
                        <img src="./CAR.png" alt="..." className='ImgCar' />
                    </div>
                </div>
                <div className='right'>
                    <div className='top'>
                        <div className='KM'>
                            <span className='FirstEVS'>
                                <i className="bi bi-speedometer"></i>
                            </span>
                            <div className='box'>
                                <h1><small>Green KM</small></h1>
                                <h1>{total?.total_trip_kms}</h1>
                            </div>
                        </div>
                        <div className='Trips'>
                            <span className='FirstEVS'>
                                <i className="bi bi-ev-front-fill"></i>
                            </span>
                            <div className='box'>
                                <h1> <small>Trips</small></h1>
                                <h1>{total?.total_no_of_trips}</h1>
                            </div>
                        </div>
                        <div className='carbon'>
                            <span className='FirstEVS co2'>
                                Co2
                            </span>
                            <div className='box'>
                                <h1><small>Carbon Emission</small> </h1>
                                <h1>{total?.total_co2_emission} Kg</h1>
                            </div>
                        </div>
                    </div>
                    <div className='status'>
                        <div className="LeftSide">
                            <div className="ChargeStatus">
                                <h1 >Fleets Charged Status</h1>
                                <div className="FleetsStatus background-color">
                                    <span>{total?.charged[0]} EV'S</span>
                                    <span > <small className='Chargedpercentage'>Long</small></span>

                                </div>
                                <div className="FleetsStatus medium-charge">
                                    <span>{total?.charged[1]} EV'S</span>
                                    <span > <small className='Chargedpercentage'>Medium</small></span>

                                </div>
                                <div className="FleetsStatus short-charge">
                                    <span>{total?.charged[2]} EV'S</span>
                                    <span > <small className='Chargedpercentage'>Short</small></span>

                                </div>
                                <div className="FleetsStatus discharged">
                                    <span>{total?.charged[3]} EV'S</span>
                                    <span > <small className='Chargedpercentage'>Discharged</small></span>

                                </div>
                            </div>
                            <div className="Heading">
                                <p>Our innovative solutions drive success for top companies around the globe</p>
                            </div>
                        </div>
                        <div className='RightSide'>
                            <img src="./Carbg.jpg" alt="..." className='CarImg' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
