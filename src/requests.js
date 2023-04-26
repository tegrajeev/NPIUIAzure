import axios from 'axios';



const BASE_URL = "https://networkintelapidemo.analytics-hub.com/api/";

export function fetchStateData(clientid) {
    let data = axios.get(`${BASE_URL}/getState/${clientid}`)
    .then((response) =>
      response?.data?.map((item) => ({
        label: `${item.State}`,
        value: item.StateCode,
        type: 'state'
      })),
    );
    return data;
}

export function fetchCountyData(value) {
    let data = axios.post(`${BASE_URL}/getCounty`,value)
    .then((response) =>
        response?.data?.map((item) => ({
            label: `${item.County}`,
            value: item.County,
            type: 'county'
      })),
    );
    return data;


    
}

export function fetchZipcodeData(value) {
    let data = axios.post(`${BASE_URL}/getZipcode`,value)
    .then((response) =>
        response?.data?.map((item) => ({
            label: `${item.Zipcode}`,
            value: item.Zipcode,
            type: 'zipcode'
      }))
    );
    return data;
}

export function fetchSpecialtyGroup(npitype) {
    let data = axios.get(`${BASE_URL}/getSpecialtyGroup/${npitype}`)
    .then((response)=>
        response?.data?.map((item) => ({
            label: `${item.SpecialtyGroup}`,
            value: item.SpecialtyGroup,
            type: 'specialtyGroup'
        }))
    )
    return data
}

export async function NPISearch(value) {
    let result = await axios.post(`${BASE_URL}/NPISearch`,value).then((res) => res.data);
    if(!Array.isArray(result?.npis)){
        result = [];
    }
    return result;
}

export function NPISearchLevel(payload) {
    let obj = payload;
    let result = axios.post(`${BASE_URL}/NPISearchLevel`,obj).then(res=>
        res?.data?.map((item,index) => ({
            key: index,
            ...item
        })));
    return result;
}

export function NPISearchDownload(value){
    value={...value,'pagenumber':'','rows':''}
    let result = axios.post(`${BASE_URL}/NPISearchDownload`,value).then((res) => res.data);
    return result;
}

export function fetchViews(value){
    let userid = value;
    let result = axios.get(`${BASE_URL}/getNPISearchViews/${userid}`).then((response)=>
    response?.data?.map((item) => ({
        label: `${item.ViewName}`,
        value: item.ViewID,
        isdefault: item.IsDefault,
        type: 'views'
    }))
);
    return result
}

export function saveViews(obj){
    let result = axios.post(`${BASE_URL}/saveNPISearchView`,obj).then((res) => res.data);
    return result;
}

export function openViews(viewid){
    let result = axios.get(`${BASE_URL}/openNPISearchView/${viewid}`).then((res)=> res.data);
    return result;
}

export function updatedefaultView(viewid,userID,isDefault){
    let result = axios.patch(`${BASE_URL}/defaultNPISearchView/${viewid}/${userID}/${isDefault}`).then((res)=> res.data);
    return result;
}

export function deleteView(viewid){
    let result = axios.delete(`${BASE_URL}/deleteNPISearchView/${viewid}`).then((res)=> res.data);
    return result;
}

export function updateView(obj){
    let result = axios.post(`${BASE_URL}/updateNPISearchView`,obj).then((res) => res.data);
    return result;
}

export function fetchoriginalview(clientid){
    let result = axios.get(`${BASE_URL}/getNPISearchOriginalView/${clientid}`).then((res) => res.data);
    return result;
}

export function validateUserID(userid){
    let result = axios.get(`https://networkintelapidemo.analytics-hub.com/api/getuser/${userid}`).then((res) => res.data);
    return result;
}

export function fetchNPIType(){
    let data = axios.get(`${BASE_URL}/getNPIType`).then((response) =>
    response?.data?.map((item) => ({
      label: `${item.NPIType}`,
      value: item.NPIType,
      type: 'npiType'
    })),
  );;
    return data;
}


export function getGroupHospitalAffiliations(payload) {
    let obj = payload;
   // console.log("request",obj)
    let result = axios.get(`${BASE_URL}/getGroupHospitalAffiliations/${obj}`)
    return result;
}






export function getAffiliatedHospitals(payload){
    let obj = payload;
    let data =  axios.post(`${BASE_URL}/getAffiliatedHospitals`,obj).then((response) =>
     response?.data)
   // .map((item) => ({
    //   label: `${item.HospitalNames}`,
    //   value: item.HospitalNPI,
    //   type: 'affiliatedHospitalid'
    // })),
  //);;
    return data;
}