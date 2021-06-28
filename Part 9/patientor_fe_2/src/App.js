import React, { useEffect, useState } from 'react'
import axios from "axios"
import Select from 'react-select'

const App = () => {
  const [hospitalNamePOST, setHospitalNamePOST] = useState('');
  const [locationPOST, setLocationPOST] = useState('');

  const [hospitalNamePUT, setHospitalNamePUT] = useState('');
  const [locationPUT, setLocationPUT] = useState('');

  const [allHospitals, setAllHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3001/api/hospitals');
      setAllHospitals(response.data);
    };

    fetchData();
  }, []);


  const postHandler = async (event) => {
    event.preventDefault();
    const newHosp = await axios.post('http://localhost:3001/api/hospitals', {
      name: hospitalNamePOST,
      location: locationPOST
    })
    setAllHospitals(allHospitals.concat(newHosp.data));
  }

  const putHandler = async (event) => {
    event.preventDefault();
    const newHosp = await axios.put(`http://localhost:3001/api/hospitals/${selectedHospital}`, {
      name: hospitalNamePUT,
      location: locationPUT
    })
    setAllHospitals(allHospitals.map(h => {
      return h._id === selectedHospital
        ? newHosp.data
        : h
    }));
  }

  const deleteHandler = async (event) => {
    event.preventDefault();
    await axios.delete(`http://localhost:3001/api/hospitals/${selectedHospital}`);
    setAllHospitals(allHospitals.filter (h => {
      return h._id !== selectedHospital
    }))
  }

  const options = allHospitals
    ? allHospitals.map(hosp => {
      return {
        value: hosp._id,
        label: hosp.name
      }
    })
    : null

  console.log(allHospitals)
  return (
    <div>

      <iframe width="420" height="315"
        title = "Music video for this lab!"
        src="https://www.youtube.com/embed/AadMMIrqdso">
      </iframe>

      <h1> <b>PATIENTOR BY GLEB</b> </h1>
      <p> <i> Add Hospital </i> </p>
      <form onSubmit={postHandler}>
        <div>
          <input type="text" value={hospitalNamePOST} onChange={(e) => setHospitalNamePOST(e.target.value)} placeholder='Hospital Name' style={{ display: "block" }} />
          <input type="text" value={locationPOST} onChange={(e) => setLocationPOST(e.target.value)} placeholder="Hospital location" style={{ display: "block" }} />
        </div>
        <button type="submit"> Add hospital</button>
      </form>

      <h3> Select hospital to work with....</h3>
      <Select options={options} defaultValue={allHospitals[0] || null} onChange={(e) => setSelectedHospital(e.value)} />

      <p><i> Edit Hospital</i></p>
      <form onSubmit={putHandler}>
        <div>
          <input type="text" value={hospitalNamePUT} onChange={(e) => setHospitalNamePUT(e.target.value)} placeholder='Hospital Name' style={{ display: "block" }} />
          <input type="text" value={locationPUT} onChange={(e) => setLocationPUT(e.target.value)} placeholder="Hospital location" style={{ display: "block" }} />
        </div>
        <button type="submit"> Edit hospital</button>
      </form>


      <p><i> Delete Hospital</i></p>
      <form onSubmit={deleteHandler}>
        <button type="submit"> Remove hospital</button>
      </form>

      <table>
        <tbody>
          <tr>
            <td>
              Name
            </td>
            <td>
              Location
            </td>
          </tr>
          {
            allHospitals.length > 0
              ? allHospitals.map(hosp => {
                return (
                  <tr key={hosp._id}>
                    <td>
                      {hosp.name}
                    </td>
                    <td>
                      {hosp.location}
                    </td>
                  </tr>
                )
              })
              : null
          }
        </tbody>
      </table>


    </div >
  );
}

export default App;
