
EV Dashboard Documentation
1. Area Chart Component
The first component of the EV Dashboard comprises an area chart displaying various electric vehicle (EV) statistics. These statistics are populated using a JSON object, and the component is implemented using React state management. The code snippet for this component is as follows:


The EVData state is an array containing EV-related data in JSON format. The updateTotal function processes this data and calculates aggregated statistics stored in the total state.


const [EVData, setEVData] = useState(data);
const [total, setTotal] = useState(null);

const updateTotal = () => {
    // ... (Code for calculating total EV statistics)
    setTotal(tempTotal);
}

useEffect(() => {
    updateTotal();
}, [EVData]);


![image](https://github.com/narottamandeep2003/ev-dashboard/assets/109156360/496e1d8a-bc95-4214-bbc2-3917008dd055)

The total state includes the following fields:

total_vehicle_id
total_no_of_trips
total_trip_kms
total_avg_kms_per_day
total_avg_trip_per_day
total_avg_daily_work_hour
total_avg_daily_charging_time
total_co2_emission
vendor_Count
charged (Array representing charging distribution)



2. Table Component
The second component is a table that complements the EV Dashboard, providing a detailed view of EV data. The table supports searching and sorting functionalities. 


The HandleSearch function filters the EV data based on a search input, updating the EVData state with the filtered results. The SortData function sorts the EV data based on the specified field and sorting type (ASC or DESC).
![image](https://github.com/narottamandeep2003/ev-dashboard/assets/109156360/6e8b2083-cf08-4a15-a050-cfe4d194929b)

Both components are designed to work together to provide a comprehensive view of the EV fleet's status and detailed statistics.

Usage:
Integrate the Area Chart and Table components into the main EV Dashboard.
Ensure the EVData state is populated with relevant data in JSON format.
Utilize the updateTotal function to calculate and update aggregated statistics.
Employ the search and sorting functionalities to enhance the user experience and data exploration.
