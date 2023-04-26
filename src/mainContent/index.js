import React from "react";
import { Row, Col, Divider } from 'antd';
import styles from './content.module.scss';
import { PageHeader } from 'antd';
import { Input, Select, Checkbox } from 'antd';
import { Tabs, Modal, Button, Tooltip, Menu, Dropdown, Space, notification, } from 'antd';
import Icon,{ SearchOutlined,UpCircleOutlined,DownCircleOutlined, DeleteOutlined, InfoCircleOutlined, SaveOutlined, FormOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { NPISearch, NPISearchLevel, getGroupHospitalAffiliations,fetchViews, saveViews, openViews, updatedefaultView, deleteView, updateView, fetchoriginalview } from "../requests";
import SearchFilters from "./filters";
import TableResult from "./results";

import NetworkTableResult from "./results/networkResult";
import { Download } from "./results/download";
import { Empty } from 'antd';
import { Switch } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

function Maincontent(props){
    const [userID,setuserID] = React.useState(props.userid);
    const [clientID,setclientID] = React.useState(props.ClientId);
    const [clientName,setclientName] = React.useState(props.userName);
    const [moreFilters,setmoreFilters] = React.useState(false);
    const [moreFiltersAnimate,setmoreFiltersAnimate] = React.useState(false);
    const [activeTabKey,setactiveTabKey] = React.useState("1");
    const [tableData,settableData] = React.useState([]);
    const [TotalCount,setTotalCount] = React.useState(0);
    const [NetworkData,setNetworkData] = React.useState([]);

    const [hospitalNetworkData,sethospitalNetworkData] = React.useState([]);
    const [tabpanes,settabpanes] = React.useState([]);
    const [mainresultCols,setmainresultCols] = React.useState([]);
    const [downloadNetworkCols,setdownloadNetworkCols] = React.useState([]);
    const [filtervalues, setfiltervalues] = React.useState({
      'state':"",
      'county':"",
      'zipcode':"",
      'npitype': "",
      
    }); 
    const [error, setfiltererrors] = React.useState({}); 
    const [downloadAllObj, setdownloadAllObj] = React.useState({});
    const [DataType, setDataType] = React.useState('all');
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [defaultModalView, setdefaultModalView] = React.useState('view');
    const [userViews,setUserViews] = React.useState([]);
    const [DefaultUserView,setDefaultUserView] = React.useState();
    const [SelectedUserView,setSelectedUserView] = React.useState();
    const [viewName,setviewName] = React.useState(null);
    const [inputViewName,setinputViewName] = React.useState();
    const [inputViewDefault,setinputViewDefault] = React.useState(0);
    const [searchbyNPIOption,setsearchbyNPIOption] = React.useState(false);
    const [loader,setLoader] = React.useState(true);
    const [iLoading,setiLoader] = React.useState(false);
    const [clearAll,setclearAll] = React.useState(false);
    const [saveDisable,setsaveDisable] = React.useState(false);
    const [saveDisable1,setsaveDisable1] = React.useState(false);
    const [networkFileName,setnetworkFileName] = React.useState('');
    const [radioSelection,setradioSelection] = React.useState('zipcode');
    const [originalViewActive,setoriginalViewActive] = React.useState(false);
    const [lastNPI,setlastNPI] = React.useState('');
    const [oldData,setoldData] = React.useState([]);
    const [oldnpiData,setoldnpiData] = React.useState([]);
    const [filterNetworkObj,setfilterNetworkObj] = React.useState({});
    const [tableMessage,settableMessage] = React.useState('Loading...');
    const [sortingInfo,setsortingInfo] = React.useState(null);

    const [HospitalAffiliation,setHospitalAffiliation] = React.useState(null);
    const [GroupAffiliation,setGroupAffiliation] = React.useState(null);

    const [clearSortingBoolean,setclearSortingBoolean] = React.useState(false);

    const [handleSerachBoolean,sethandleSerachBoolean] = React.useState(false);

   // const [AffiliatedToHospital,setAffiliatedToHospital] = React.useState(false);
    const [NPISearchData,setNPISearchData] = React.useState(false);

    const [searchButton,setsearchButton] = React.useState();
    
    const [selectedSwitch,setselectedSwitch] = React.useState();


    React.useEffect(()=>{
      handleViews();  
     // console.log("this is useEffect",tabpanes)  
    },[]);

    const openNotification = (title,msg,type,time) => {
      notification[type]({
        message: msg,
        duration: time || 2,
        //title,
        // description: msg,
      });
    };

    const searchByOption = (checked) => {
      console.log("searchByOption",filtervalues)
      setsearchbyNPIOption(checked);
      setfiltererrors({});
      setoriginalViewActive(false);
      if(checked){
        setfiltererrors({});
        setfiltervalues({'npi':lastNPI});
        settableData(oldnpiData)
      }
      else{
        setfiltererrors({});
        setfiltervalues({...filtervalues,'npi':''});
        settableData(oldData);
      }
    }

    const handleViews = async (value) => {
     // console.log("handleViews function")
      try{
        let views = await fetchViews(userID);
        setUserViews(views);
        let anyDefaultPresent = views.filter(function(el){ if(el.isdefault === 1){return el}})?.length;
        views.map((item)=>{
          if(item?.isdefault === 1){
            handleViewChange(item?.value);
            setSelectedUserView(item?.value);
            setDefaultUserView(item?.value);
            setoriginalViewActive(false);
          }
        });
        if(anyDefaultPresent === 0 && value !== 'latest'){
          throw error;
        }
      }
      catch{
        setLoader(true);
        setSelectedUserView(null);
        let result = await fetchoriginalview(clientID);

        if(result[0].NPIType === "PCP"){
          sethandleSerachBoolean(true)
          setsearchButton("PCP")
        }
        if(result[0].NPIType === "Specialist"){
          sethandleSerachBoolean(true)
          setsearchButton("Specialist")
        }
        if(result[0].NPIType === "Hospital"){
          sethandleSerachBoolean(true)
          setsearchButton("Hospital")
        }


        setoriginalViewActive(true);
        let payload = handleFilterObj(result);
        doSearch(payload,true,true);
        //setdownloadAllObj(payload);
        setfiltervalues(payload);
        //setviewName(result[0]?.ViewName);
        setLoader(false);
      }
    }

    async function loadOriginalView(){
      console.log("loadOriginalView function")
      window.location.reload()
      setfiltererrors({})
      setsearchbyNPIOption(false);
      setLoader(true);
      setSelectedUserView(null);
      let result = await fetchoriginalview(clientID);
      if(result[0].NPIType === "PCP"){
        sethandleSerachBoolean(true)
      }else{
        sethandleSerachBoolean(false)
      }
      if(result[0].NPIType === "Specialist"){
        sethandleSerachBoolean(true)
      }else{
        sethandleSerachBoolean(false)
      }
      setoriginalViewActive(true);
      let payload = handleFilterObj(result);
      doSearch(payload,true,true);
      //setdownloadAllObj(payload);
      setfiltervalues(payload);
      //setviewName(result[0]?.ViewName);
      setLoader(false);
    }

    const handleFilterObj = (param) =>{
      let result = param;
      let obj = {
        "npi":result[0]?.NPI||"",
        "specialtygroup":result[0]?.SpecialtyGroup||"",
        "firstname":result[0]?.FirstName||"",
        "lastname":result[0]?.LastName||"",
        "orgname":result[0]?.OrganizationName||"",
        "geography":result[0]?.Geography||"",
        'npitype':result[0]?.NPIType || "",
        'state':result[0]?.State,
        'county':result[0]?.County,
        'zipcode':result[0]?.Zipcode,
        "pagenumber":1,
        "rows":10,
        "orderby":"",
        "AffiliatedToHospital":result[0]?.AffiliatedToHospital||"",
        
      }
      return obj;
    }

    const handledefaultView = async (event,viewName,viewid,value) => {
      console.log("viewName,viewid,value",viewName,viewid,value)
      event.stopPropagation();
      let userid = userID;
      value ? setDefaultUserView(viewid):setDefaultUserView();
      if(value === true){
        handleViewChange(viewid)
      }
     
      let isDefault = value ? 1:0;   
      isDefault === 1 ? openNotification('Default View',`Default View ${viewName} Updated`,'success'):openNotification('Default View',`Default View ${viewName} Cleared`,'success')
      let result = await updatedefaultView(viewid,userid,isDefault);  
      setIsModalVisible(true);
    }

    const handleViewChange = async (value) => {
    //   console.log("handleViewChange function")
      
      setLoader(true);
      setiLoader(true);
      setoriginalViewActive(false);
      setSelectedUserView(value);
      let result = await openViews(value);
      settabpanes([]);
      //console.log("View Result",result)
      if(result[0].NPIType === "PCP"){
        sethandleSerachBoolean(true)
      }
      if(result[0].NPIType === "Specialist"){
        sethandleSerachBoolean(true)
      }
      let payload = handleFilterObj(result);
      if(result[0]?.NPI?.length>0){
        setsearchbyNPIOption(true);
        setfiltervalues({'npi':result[0]?.NPI});
      }
      else{
        setsearchbyNPIOption(false);
        setfiltervalues(payload);
      }
      doSearch(payload,false,true);
      setviewName(result[0]?.ViewName);
      if(result[0]?.IsDefault === 1){
        setDefaultUserView(result[0]?.ViewID)
      }
      setTimeout(()=>{
        setLoader(false);
        setiLoader(false);
        //setIsModalVisible(false);
        setfiltererrors({});
        // DefaultUserView === value && 
        // openNotification('View Changed','Data updated with default view','success')
         
      },300)
    }

    const doSearch =  async(obj,isOriginalView,showNotification) => {
      
      console.log(selectedSwitch)

      if(obj.npitype === "PCP" || obj.npitype === "Specialist"){
        if(obj.zipcode.length >0){
          console.log("doSearch function",obj)
          setLoader(true);
         obj = {...obj,clientid:clientID}
         if(obj?.['npi']?.length>0){
           obj = {...obj,'npitype':''}
         }
         if(!(obj?.['npi']?.length>0)){
           obj = {...obj}
         }
         try{
           let data = await NPISearch(obj);
           console.log("NPISearch",data)
           if(data.npis[0].hasOwnProperty('Provider_Type')){
           if(data.npis[0].Provider_Type === "Specialist" || data.npis[0].Provider_Type === "PCP"){
             sethandleSerachBoolean(true)
           }}else{
             sethandleSerachBoolean(false)
           }
           setfilterNetworkObj(obj);
           console.log("data?.npis",data?.npis)
           setNetworkData(data?.npis);
           setNPISearchData(data?.npis)
           setdownloadAllObj(obj);
           settableData(data?.npis);
           if(obj?.['npi']?.length>0){
             setfiltervalues({'npi':obj?.['npi']});
             setoldnpiData(data?.npis);
             setoldData([]);
             setlastNPI(obj?.['npi']);
           }
           if(!(obj?.['npi']?.length>0)){
             setfiltervalues({...obj});
             setoldData(data?.npis);
             setoldnpiData([]);
             setlastNPI('');
           }
           setTotalCount(data?.total[0]?.Total);
           // Handle Tabs Functionality Start    
             setactiveTabKey("1"); 
             // settabpanes([]);
           // Handle Tabs Functionality End 
           if(data?.npis?.length>0){
             settableMessage('Please Search Something...');
           }
           if(data?.npis?.length === 0){
             settableMessage('Not found in HWAI NPI dataset! Search Something else!')
             throw {'name': 'No Data','error':'No Data'}
           }
           if(showNotification){
             isOriginalView?handleNotification(true,false):handleNotification(false,true)
           }
         }
         catch(e){
           openNotification("No data Available! Search Something else!","No data Available! Search Something else!",'error',3)
         }
         finally{
           setDataType('all');
           setLoader(false);
           setIsModalVisible(false);
           setmoreFilters(true); 
           setmoreFiltersAnimate(true);
         }
        }else{
          if(selectedSwitch !== "geography"){
           // openNotification("Select Zipcode","Select Zipcode!",'error',3)
          }
          
          if(selectedSwitch === undefined){
            console.log("doSearch function",obj)
          setLoader(true);
         obj = {...obj,clientid:clientID}
         if(obj?.['npi']?.length>0){
           obj = {...obj,'npitype':''}
         }
         if(!(obj?.['npi']?.length>0)){
           obj = {...obj}
         }
         try{
           let data = await NPISearch(obj);
           console.log("NPISearch",data)
           if(data.npis[0].hasOwnProperty('Provider_Type')){
           if(data.npis[0].Provider_Type === "Specialist" || data.npis[0].Provider_Type === "PCP"){
             sethandleSerachBoolean(true)
           }}else{
             sethandleSerachBoolean(false)
           }
           setfilterNetworkObj(obj);
           console.log("data?.npis",data?.npis)
           setNetworkData(data?.npis);
           setNPISearchData(data?.npis)
           setdownloadAllObj(obj);
           settableData(data?.npis);
           if(obj?.['npi']?.length>0){
             setfiltervalues({'npi':obj?.['npi']});
             setoldnpiData(data?.npis);
             setoldData([]);
             setlastNPI(obj?.['npi']);
           }
           if(!(obj?.['npi']?.length>0)){
             setfiltervalues({...obj});
             setoldData(data?.npis);
             setoldnpiData([]);
             setlastNPI('');
           }
           setTotalCount(data?.total[0]?.Total);
           // Handle Tabs Functionality Start    
             setactiveTabKey("1"); 
             // settabpanes([]);
           // Handle Tabs Functionality End 
           if(data?.npis?.length>0){
             settableMessage('Please Search Something...');
           }
           if(data?.npis?.length === 0){
             settableMessage('Not found in HWAI NPI dataset! Search Something else!')
             throw {'name': 'No Data','error':'No Data'}
           }
           if(showNotification){
             isOriginalView?handleNotification(true,false):handleNotification(false,true)
           }
         }
         catch(e){
           openNotification("No data Available! Search Something else!","No data Available! Search Something else!",'error',3)
         }
         finally{
           setDataType('all');
           setLoader(false);
           setIsModalVisible(false);
           setmoreFilters(true); 
           setmoreFiltersAnimate(true);
         }
          }
          
        }
      }

      if(obj.npitype === "Hospital" || selectedSwitch === "geography"){
        
          console.log("doSearch function",obj)
          setLoader(true);
         obj = {...obj,clientid:clientID}
         if(obj?.['npi']?.length>0){
           obj = {...obj,'npitype':''}
         }
         if(!(obj?.['npi']?.length>0)){
           obj = {...obj}
         }
         try{
           let data = await NPISearch(obj);
           console.log("NPISearch",data)
           if(data.npis[0].hasOwnProperty('Provider_Type')){
           if(data.npis[0].Provider_Type === "Specialist" || data.npis[0].Provider_Type === "PCP"){
             sethandleSerachBoolean(true)
           }}else{
             sethandleSerachBoolean(false)
           }
           setfilterNetworkObj(obj);
           console.log("data?.npis",data?.npis)
           setNetworkData(data?.npis);
           setNPISearchData(data?.npis)
           setdownloadAllObj(obj);
           settableData(data?.npis);
           if(obj?.['npi']?.length>0){
             setfiltervalues({'npi':obj?.['npi']});
             setoldnpiData(data?.npis);
             setoldData([]);
             setlastNPI(obj?.['npi']);
           }
           if(!(obj?.['npi']?.length>0)){
             setfiltervalues({...obj});
             setoldData(data?.npis);
             setoldnpiData([]);
             setlastNPI('');
           }
           setTotalCount(data?.total[0]?.Total);
           // Handle Tabs Functionality Start    
             setactiveTabKey("1"); 
             // settabpanes([]);
           // Handle Tabs Functionality End 
           if(data?.npis?.length>0){
             settableMessage('Please Search Something...');
           }
           if(data?.npis?.length === 0){
             settableMessage('Not found in HWAI NPI dataset! Search Something else!')
             throw {'name': 'No Data','error':'No Data'}
           }
           if(showNotification){
             isOriginalView?handleNotification(true,false):handleNotification(false,true)
           }
         }
         catch(e){
           openNotification("No data Available! Search Something else!","No data Available! Search Something else!",'error',3)
         }
         finally{
           setDataType('all');
           setLoader(false);
           setIsModalVisible(false);
           setmoreFilters(true); 
           setmoreFiltersAnimate(true);
         }
        
      }

      if(obj.npitype === "" && obj.npi.length>0 ){
        
        console.log("doSearch function",obj)
        setLoader(true);
       obj = {...obj,clientid:clientID}
       if(obj?.['npi']?.length>0){
         obj = {...obj,'npitype':''}
       }
       if(!(obj?.['npi']?.length>0)){
         obj = {...obj}
       }
       try{
         let data = await NPISearch(obj);
         console.log("NPISearch",data)
         if(data.npis[0].hasOwnProperty('Provider_Type')){
         if(data.npis[0].Provider_Type === "Specialist" || data.npis[0].Provider_Type === "PCP"){
           sethandleSerachBoolean(true)
         }}else{
           sethandleSerachBoolean(false)
         }
         setfilterNetworkObj(obj);
         console.log("data?.npis",data?.npis)
         setNetworkData(data?.npis);
         setNPISearchData(data?.npis)
         setdownloadAllObj(obj);
         settableData(data?.npis);
         if(obj?.['npi']?.length>0){
           setfiltervalues({'npi':obj?.['npi']});
           setoldnpiData(data?.npis);
           setoldData([]);
           setlastNPI(obj?.['npi']);
         }
         if(!(obj?.['npi']?.length>0)){
           setfiltervalues({...obj});
           setoldData(data?.npis);
           setoldnpiData([]);
           setlastNPI('');
         }
         setTotalCount(data?.total[0]?.Total);
         // Handle Tabs Functionality Start    
           setactiveTabKey("1"); 
           // settabpanes([]);
         // Handle Tabs Functionality End 
         if(data?.npis?.length>0){
           settableMessage('Please Search Something...');
         }
         if(data?.npis?.length === 0){
           settableMessage('Not found in HWAI NPI dataset! Search Something else!')
           throw {'name': 'No Data','error':'No Data'}
         }
         if(showNotification){
           isOriginalView?handleNotification(true,false):handleNotification(false,true)
         }
       }
       catch(e){
         openNotification("No data Available! Search Something else!","No data Available! Search Something else!",'error',3)
       }
       finally{
         setDataType('all');
         setLoader(false);
         setIsModalVisible(false);
         setmoreFilters(true); 
         setmoreFiltersAnimate(true);
       }
      
    }

    }
    

    function handleNotification(isOriginalView,isDefaultView){
      if(isOriginalView){
        openNotification('Loading Original View','Loading Original View','success',3);
      }
      // if(isDefaultView && !isNaN(DefaultUserView)){
      //   openNotification('View Changed','Data updated with selected view','success');
      // }
      if(isDefaultView && !isOriginalView && isNaN(DefaultUserView) && isNaN(SelectedUserView)){
        openNotification('View Changed','Default view Loading','success');
      }
      if(!isNaN(SelectedUserView)){
        openNotification('View Changed','Data updated with selected view','success')
      }
    }
    
    async function handleDeleteView(event,name,value){
      event.stopPropagation();
      let res = deleteView(value);
      if(value === SelectedUserView){
        setSelectedUserView();
      }
      openNotification(`View named ${name} Deleted`,`View named ${name} Deleted`,'success')
      setTimeout(()=>{          
        handleViews('latest')
      },400)
    }

     // Using useMemo
    const showModal = () => {
      setIsModalVisible(true);
      setdefaultModalView('view')
    };

    const saveModal = () => {
      setIsModalVisible(true);
      setdefaultModalView('save');
    }

    const saveAsModal = () => {

     // console.log("affiliatedHospitalid save",AffiliatedToHospital)
      let value = checkValidation(); //Check For Validation
      if(!value){
        return value;
      }
      setIsModalVisible(true);
      setdefaultModalView('saveAs');
    }

    async function handleOk(){
      setsaveDisable(false);
      setIsModalVisible(false);
      let viewNewname = inputViewName;
      viewNewname = viewNewname?.trim();
      try{
        let checkName = viewNewname?.toLocaleLowerCase();
        let result = userViews.filter(function (el){ return el.label.toLocaleLowerCase() === checkName });
        if(result?.length > 0){
          openNotification('Please enter different view name','Please enter different view name','error',3)
          return false
        }
      }
      catch{
        openNotification('Please enter different view name','Please enter different view name','error',5)
      }

      

      if(defaultModalView === 'saveAs'){

        let value = checkValidation(); //Check For Validation
        if(!value){
          return value;
        }
       // console.log("filtervalues save View",filtervalues)
        if(viewNewname?.length>0 && viewNewname){          
            let obj = {
              "npi":filtervalues?.npi||"",
              "npitype":filtervalues?.npitype||"",
              "specialtygroup":filtervalues?.specialtygroup||"",
              "firstname":filtervalues?.firstname||"",
              "lastname":filtervalues?.lastname||"",
              "orgname":filtervalues?.orgname||"",
              "state":filtervalues?.state||"",
              "county":filtervalues?.county||"",
              "zipcode":filtervalues?.zipcode||"",
              "geography":filtervalues?.geography||"",
              "userid":userID,
              "isdefault":inputViewDefault||0,"viewname":viewNewname    ,
              "AffiliatedToHospital":filtervalues.AffiliatedToHospital ||"",
              
            }
            let result = await saveViews(obj);            
            setIsModalVisible(false);
            setinputViewName('');            
            if(result[0]?.ViewID){
              openNotification(`New View named ${viewNewname} created`,`New View named ${viewNewname} created`,'success',5);
              handleViews('latest');
            }
            else{
              openNotification('Some error occured','Some error occured','error');
            }
        }
        else{
          openNotification('Please enter valid name','Please enter valid name','error');
          setinputViewName('');
        }
        setsaveDisable(false);
      }
    };

    function checkValidation(){
      let returnvalue = true;
      let validObj = {
        county: filtervalues?.county||"",
        npitype: filtervalues?.npitype||"",
        state: filtervalues?.state||""
      }
      if(filtervalues['npitype']?.toLowerCase() !== 'hospital' ){
        validObj = {
          ...validObj,
          zipcode: filtervalues?.zipcode||""
        }
      }
      if(filtervalues?.npi?.length === 10 && searchbyNPIOption){
        validObj = {};
        validObj.npi = filtervalues?.npi||"";
      }

      if( filtervalues['npitype']?.toLowerCase() !== 'hospital'){
        // delete validObj?.zipcode;
        // validObj.geography = filtervalues?.geography||"";
      }

      if(filtervalues.hasOwnProperty("geography") && filtervalues['npitype']?.toLowerCase() !== 'hospital'){
         delete validObj?.zipcode;
        // validObj.geography = filtervalues?.geography||"";
      }

      let value = handleValidations(validObj);
      if(!value){
        //openNotification('Validation Error','Please select/enter all the mandatory fields','error');
        returnvalue = false;
      }
      return returnvalue
    }

    async function handleSave(){

      let value = checkValidation(); //Check For Validation
      if(!value){
        return value;
      }
      let isDefaultViewSave = 0;
      if(DefaultUserView === SelectedUserView){
        isDefaultViewSave = 1;
      }
      let obj = {
        "npi":filtervalues?.npi||"",
        "npitype":filtervalues?.npitype||"",
        "specialtygroup":filtervalues?.specialtygroup||"",
        "firstname":filtervalues?.firstname||"",
        "lastname":filtervalues?.lastname||"",
        "orgname":filtervalues?.orgname||"",
        "state":filtervalues?.state||"",
        "county":filtervalues?.county||"",
        "zipcode":filtervalues?.zipcode||"",
        "geography":filtervalues?.geography||"",
        "userid":userID,
        "isdefault":isDefaultViewSave,
        "viewid":SelectedUserView,
        "AffiliatedToHospital":filtervalues.AffiliatedToHospital ||"",
       
      }
      let res = await updateView(obj);
      openNotification('View Saved','View Updated','success',3)
      handleViewChange(SelectedUserView);
    }
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const handleMoreFilter = () => {  
        if(!moreFilters){        
            setmoreFilters(!moreFilters);   
            setTimeout(()=>{
                setmoreFiltersAnimate(!moreFiltersAnimate)
            },100);
        }
        else{
            setmoreFiltersAnimate(!moreFiltersAnimate);
            setTimeout(()=>{
                setmoreFilters(!moreFilters);   
            },200);
        }
    }

    function onPageChange(pagination, filters, sorter, extra) {
    //console.log("onPageChange",pagination, filters, sorter, extra)
    setclearSortingBoolean(true)
      //setsortingInfo(sorter);
      // let orderBy = "";
      // let columns = "";
      // let columnKey = "";
      // Array.isArray(sorter) ? columns = sorter : columns = [sorter];
      //   columns?.forEach((item, index) => {
      //     if(item?.order){
      //       orderBy += item.field + ":"+`${item.order}` + ", "; 
      //       setsortingInfo({...sortingInfo,[item.field]:item.order});
      //       columnKey += item.field + ",";
      //     }
      //   })
      //   columnKey = columnKey.trim().slice(0,-1);
      //   orderBy = orderBy.trim().slice(0,-1);
      //  console.log('Sorting',sortingInfo,columnKey.split(","));
      sortSearch(pagination,sorter)
    }

    function sortSearch(params,sortOrder){
        var orderBy = "";
        var columns = "";
        Array.isArray(sortOrder) ? columns = sortOrder : columns = [sortOrder];
        columns?.forEach((item, index) => {
          if(item?.order){
            orderBy += item.field + " "+item.order.slice(0,item.order.length-3) + ", "; 
          }
          return orderBy; 
        })
        orderBy = orderBy.trim().slice(0,-1);
        let obj = {
          "npi":filtervalues?.npi||"",
          "npitype":filtervalues?.npitype||"",
          "specialtygroup":filtervalues?.specialtygroup||"",
          "firstname":filtervalues?.firstname||"",
          "lastname":filtervalues?.lastname||"",
          "orgname":filtervalues?.orgname||"",
          "state":filtervalues?.state||"",
          "county":filtervalues?.county||"",
          "zipcode":filtervalues?.zipcode||"",
          "geography":filtervalues?.geography||"",
          "pagenumber":params?.current || 1,
          "rows":params?.pageSize || 10,
          "orderby":orderBy,
          "AffiliatedToHospital":filtervalues?.AffiliatedToHospital||"",
          
        }
        //setSelectedUserView();
        setoriginalViewActive(false);
        doSearch(obj);
    }

    function onTabPageChange(){
      //console.log('Tab Page Change');
    }      

    function resetAll(){
     // console.log("resetAll")
      setclearAll(true);
      setsaveDisable(true);
      setsaveDisable1(true);
      settableData([]);
      if(searchbyNPIOption){
        setoldnpiData([]);
        setlastNPI('');
        setfiltervalues({...filtervalues,'npi':''})
      }
      if(!searchbyNPIOption){
        setoldData([]);
        setfiltervalues({
          'state':"",
          'county':"",
          'zipcode':"",
          'npitype':"",
          "npi":''
        });
      }
      setfiltererrors({});

      //
      // 'specialtygroup':"",
      // 'firstname':"",
      // 'lastname':"",
      // 'orgname':""
    }

    function handleValidations(params){
      let obj = {};
      if(searchbyNPIOption){
        if(!isNaN(filtervalues?.npi) && filtervalues?.npi.length===10){
          setfiltererrors({});
        }
        else{
          obj = {'npi':true};
        }
      }
      else{
        for (let key in params) {
          if(!params[key]?.length>0){
            obj = {...obj,[key]:true,firstname:'',lastname:'',orgname:''}
          }
        }
      }
      setfiltererrors({...obj});
      if(Object.keys(obj).length === 0){
        return true
      }
      else{
        return false
      }
    }
    
    const handleSearch = async (params,sortOrder,check) => {
      setsearchButton(filtervalues.npitype)
      if(filtervalues.npitype ==="PCP" || filtervalues.npitype ==="Specialist"){
        if(filtervalues.hasOwnProperty('zipcode')){
          if(filtervalues.zipcode !== undefined){
          if(filtervalues.zipcode.length ===0){
            if(filtervalues.geography !== undefined){
            if(selectedSwitch !== "geography"){
              if(filtervalues.geography.length === 0 ){
              openNotification("Select Zipcode","Select Zipcode!",'error',3)
          }
        }
        }else{
          openNotification("Select Zipcode","Select Zipcode!",'error',3)
        }
        
          }
        }}
        
      }
      console.log("handleSearch",filtervalues)
      settabpanes([]);
      sethandleSerachBoolean(true)
      //console.log("handleSearch function",filtervalues)
      if(filtervalues.npitype === "Hospital"){
        sethandleSerachBoolean(false)
      }
      setsaveDisable(false);
      let value = checkValidation(); //Check For Validation
      if(!check){
        settableData([]);
      }
      if(!value){
        return value;
      }
        var orderBy = "";
        var columns = "";
        Array.isArray(sortOrder) ? columns = sortOrder : columns = [sortOrder];
        columns?.forEach((item, index) => {
          if(item?.order){
            orderBy += item.field + " "+item.order.slice(0,item.order.length-3) + ", "; 
          }
          return orderBy; 
        })
        orderBy = orderBy.trim().slice(0,-1);

        let obj = {
          "npi":filtervalues?.npi||"",
          "npitype":filtervalues?.npitype||"",
          "specialtygroup":filtervalues?.specialtygroup||"",
          "firstname":filtervalues?.firstname||"",
          "lastname":filtervalues?.lastname||"",
          "orgname":filtervalues?.orgname||"",
          "state":filtervalues?.state||"",
          "county":filtervalues?.county||"",
          "zipcode":filtervalues?.zipcode||"",
          "geography":filtervalues?.geography||"",
          "pagenumber":params?.current || 1,
          "rows":params?.pageSize || 10,
          "orderby":orderBy,
          "AffiliatedToHospital":filtervalues?.AffiliatedToHospital||"",
          
        }
        //setSelectedUserView();
        setoriginalViewActive(false);
        doSearch(obj);
        setsaveDisable1(false);
        setsaveDisable(true);
        setclearSortingBoolean(false)
    }

    const onTabChange = async(activeTabKey) => {
      console.log('onTabChange', tabpanes,NetworkData)
     
        setactiveTabKey(activeTabKey);
        //console.log("testFunction",activeTabKey)
        tabpanes.map((item)=>{
          if(item?.key === parseInt(activeTabKey)){
            console.log("onTabChange inside if",filtervalues)
            setNetworkData(item.content)
            let payload = item.payload
           newNpiNetworkData(payload)
           
          }
          //  else{
          //   console.log("testFunction inside else",NPISearchData)
          //    setNetworkData(NPISearchData);
          //  }
        });
    };

    const newNpiNetworkData = async(payload) => {


      let NetworkID = await NPISearchLevel(payload);
      sethospitalNetworkData(NetworkID);

      let NetworkIDaff = await getGroupHospitalAffiliations(payload.npi);
      setNetworkData(NetworkIDaff)
  }

    const onTabClick = (key) => {
      let payloadObj = tabpanes[key-2]?.payload;
      setdownloadAllObj(payloadObj);
      setnetworkFileName(tabpanes[key-2]?.title?.replaceAll(" ",""))
      
    }

    const onTabEdit = (targetKey, action) => {
        let newPanes = tabpanes.filter(function (el){ return el.key != targetKey });
        settabpanes(newPanes);
        console.log("activeTabKey 1st",activeTabKey)
        if(activeTabKey <= 1){
          setactiveTabKey(activeTabKey);
        }
        if(activeTabKey === "2"){
          setactiveTabKey(`${activeTabKey-1}`);
        }  else{ 
          if(activeTabKey > 2){
        setactiveTabKey('1');}
      }
        console.log("activeTabKey 2nd",activeTabKey)
        
          
        
    };

    const handleTabAddopenNew = (id,name,data,payload,resultdata) => {

     console.log("handleTabAddopenNew first",data,)
      console.log("handleTabAddopenNew first",resultdata,)
        let panes = [...tabpanes];
        let key = panes[panes.length-1]?.key+1 || 2;
        let obj = {title: `${name +" - "+ "Affiliations"}`, content: resultdata, key: key, payload: payload,type:"Affiliation"};
        panes.push(obj);
        // console.log("panes",panes)
        settabpanes(panes);
        setactiveTabKey(`${key}`);
        setDataType('Affiliation');
        
    }

    

    const handleTabAdd = (id,name,data,payload,resultdata) => {
     console.log("handleTabAddopenNew second",filtervalues)
      console.log("handleTabAddopenNew second",data)
        let panes = [...tabpanes];
        let key = panes[panes.length-1]?.key+1 || 2;
        let obj = {title: `${name +" - "+ "Networks"}`, content: data, key: key, payload: payload,type:"Networks"};
        panes.push(obj);
        settabpanes(panes);
        setactiveTabKey(`${key}`);
        setDataType('network');
        
    }
    

    const hospitalPresntationName = async(event) => {

      console.log("openNew 1st",event?.target?.attribute)
      let id = event?.target?.attributes["data-id"]?.value;
      let speciality_name = event?.target?.attributes["speciality-name"]?.value;
      let npi_type_code = event?.target?.attributes["npitype-code"]?.value;
      let specialty_group_code = event?.target?.attributes["specialtygroup-code"]?.value; 
      let first_name_code = event?.target?.attributes["firstname-code"]?.value;
      let last_name_code = event?.target?.attributes["lastname-code"]?.value;
      let org_name_code = event?.target?.attributes["orgname-code"]?.value;
      let state_code = event?.target?.attributes["state-code"]?.value;
      let county_code = event?.target?.attributes["county-code"]?.value;
      let zip_code = event?.target?.attributes["zip-code"]?.value;
      let geography_code = event?.target?.attributes["geography-code"]?.value;

      let name = event?.target?.attributes["name"]?.value;

      let payload = {
        "npi":id,
        "npitype":npi_type_code||"",
        "specialtyname":speciality_name||"",
        "specialtygroup":specialty_group_code||"",
        "firstname":first_name_code||"",
        "lastname":last_name_code||"",
        "orgname":org_name_code||"",
        "state":state_code||"",
        "county":county_code||"",
        "zipcode":zip_code||"",
        "geography":geography_code||"",
        "pagenumber":"",
        "rows":"",
        "orderby":"",
        "AffiliatedToHospital":filtervalues?.AffiliatedToHospital||"",
        "clientid":clientID||"",
        "isochronestate":filtervalues.state ||"",
        "isochronecounty":filtervalues.county||""
      };

      let NetworkID = await NPISearchLevel(payload);
      sethospitalNetworkData(NetworkID);
      setdownloadAllObj(payload);
      setnetworkFileName(name);
      handleTabAdd(id,name,NetworkID,payload);
  }

    const openNew = async(event,item,) => {

      console.log("openNew 2nd",filtervalues)
        let id = event?.target?.attributes["data-id"]?.value;
        let speciality_name = event?.target?.attributes["speciality-name"]?.value;
        let npi_type_code = event?.target?.attributes["npitype-code"]?.value;
        let specialty_group_code = event?.target?.attributes["specialtygroup-code"]?.value; 
        let first_name_code = event?.target?.attributes["firstname-code"]?.value;
        let last_name_code = event?.target?.attributes["lastname-code"]?.value;
        let org_name_code = event?.target?.attributes["orgname-code"]?.value;
        let state_code = event?.target?.attributes["state-code"]?.value;
        let county_code = event?.target?.attributes["county-code"]?.value;
        let zip_code = event?.target?.attributes["zip-code"]?.value;
        let geography_code = event?.target?.attributes["geography-code"]?.value;

        let name = event?.target?.attributes["name"]?.value;
        let payload = {
          "npi":id,
          "npitype":npi_type_code||"",
          "specialtyname":speciality_name||"",
          "specialtygroup":specialty_group_code||"",
          "firstname":first_name_code||"",
          "lastname":last_name_code||"",
          "orgname":org_name_code||"",
          "state":state_code||"",
          "county":county_code||"",
          "zipcode":zip_code||"",
          "geography":geography_code||"",
          "pagenumber":"",
          "rows":"",
          "orderby":"",
          "AffiliatedToHospital":filtervalues?.AffiliatedToHospital||"",
          "clientid":clientID||"",
          "isochronestate":filtervalues.state ||"",
        "isochronecounty":filtervalues.county||""
        };

        let NetworkIDsearch = await NPISearchLevel(payload);
        sethospitalNetworkData(NetworkIDsearch)



        let NetworkID = await getGroupHospitalAffiliations(id);

        if(NetworkID.data.groupAffiliations ==="No Data Available" ){
          setGroupAffiliation([])
        }else{
          setGroupAffiliation(NetworkID.data.groupAffiliations)
        }
        if(NetworkID.data.hospitalAffiliations ==="No Data Available" ){
          setHospitalAffiliation([])
        }else{
          setHospitalAffiliation(NetworkID.data.hospitalAffiliations)
        }
        if(NetworkID.data.hospitalAffiliations === 'No Data Available'){
          setdownloadAllObj(payload);
          setnetworkFileName(name);
          let data =undefined
          let resultdata = NetworkID.data
          openNotification('No Data Available','No Data Available for Affiliations','error',3)
          handleTabAddopenNew(id,name,data,payload,resultdata);
          setNetworkData(NetworkID);
          

        }else{

          
          let NetworkIDtest = NetworkID.data.hospitalAffiliations.concat(NetworkID.data.groupAffiliations)
         // console.log("NetworkIDtest",NetworkIDtest)
          // NetworkID = await NPISearchLevel(payload);
          setNetworkData(NetworkID);
          
          setdownloadAllObj(payload);
          setnetworkFileName(name);
          let data 
          let resultdata = NetworkID
          handleTabAddopenNew(id,name,data,payload,resultdata);
        }
        
    }


    const presentationName = async(event,item) => {

      console.log("presentationName",event,item)

      let id = event?.target?.attributes["data-id"]?.value;
      let speciality_name = event?.target?.attributes["speciality-name"]?.value;
      let npi_type_code = event?.target?.attributes["npitype-code"]?.value;
      let specialty_group_code = event?.target?.attributes["specialtygroup-code"]?.value; 
      let first_name_code = event?.target?.attributes["firstname-code"]?.value;
      let last_name_code = event?.target?.attributes["lastname-code"]?.value;
      let org_name_code = event?.target?.attributes["orgname-code"]?.value;
      let state_code = event?.target?.attributes["state-code"]?.value;
      let county_code = event?.target?.attributes["county-code"]?.value;
      let zip_code = event?.target?.attributes["zip-code"]?.value;
      let geography_code = event?.target?.attributes["geography-code"]?.value;

      let name = event?.target?.attributes["name"]?.value;
      let payload = {
        "npi":id,
        "npitype":npi_type_code||"",
        "specialtyname":speciality_name||"",
        "specialtygroup":specialty_group_code||"",
        "firstname":first_name_code||"",
        "lastname":last_name_code||"",
        "orgname":org_name_code||"",
        "state":state_code||"",
        "county":county_code||"",
        "zipcode":zip_code||"",
        "geography":geography_code||"",
        "pagenumber":"",
        "rows":"",
        "orderby":"",
        "AffiliatedToHospital":filtervalues?.AffiliatedToHospital||"",
        "clientid":clientID||"",
        "isochronestate":filtervalues.state ||"",
        "isochronecounty":filtervalues.county||""
      };

      let NetworkIDaff = await getGroupHospitalAffiliations(id);
     // console.log("new API",NetworkIDaff.data)
      console.log("new API",NetworkIDaff)
      setNetworkData(NetworkIDaff);
      
      
      let NetworkID = await NPISearchLevel(payload);
      sethospitalNetworkData(NetworkID)
      console.log("new API",NetworkID)
      // 
      setdownloadAllObj(payload);
      setnetworkFileName(name);
      handleTabAdd(id,name,NetworkID,payload);
    }

    return(
        <div className={styles['content']}>
            <Row gutter={0} className={styles['search-filter-wrapper']}>                  
                    <Col span={24} className={styles['npi-search-wrapper']}>
                        <PageHeader
                            className={styles['site-page-header']}                
                            title="NPI Search"
                        />
                        <div className={styles['view-page-wrapper']}>
                          {originalViewActive ?
                          <span style={{color: "#9776a2"}}>{'Original View'}</span>
                          :
                          (SelectedUserView ? <>{viewName?.length>0 ? 'Current View:':''} <span style={{color: "#9776a2"}}>{viewName}</span></> :'')
                          }
                        </div>
                        <div className={styles['npi-search-option']}>
                          
                          <label>Search by NPI Number</label>
                          <Switch defaultChecked={searchbyNPIOption} checked={searchbyNPIOption} onChange={searchByOption} />
                        </div>
                    </Col>

                    <div className={`${moreFilters ? styles['show'] : styles['hide']}`}>
                        <Col span={24} className={`${styles['filter-container']} ${styles['filter-animate']} ${moreFiltersAnimate ? styles['show'] : styles['hide']}`}>
                            <SearchFilters setselectedSwitch={setselectedSwitch} searchButton={searchButton} setsearchButton={setsearchButton} sethandleSerachBoolean={sethandleSerachBoolean} iLoading={iLoading} clientId={clientID} setlastNPI={setlastNPI} searchNPIOption={searchbyNPIOption} radioSelection={radioSelection} 
                            setradioSelection={setradioSelection} clearAll={clearAll} setclearAll={setclearAll} setiLoader={setiLoader} filterError={error} 
                            filterSetError={setfiltererrors} filterState={setfiltervalues} filterValues={filtervalues} 
                            //setAffiliatedToHospital={setAffiliatedToHospital}
                            />
                        </Col>
                    </div>
                    <Divider />
                    
            </Row>
            <Row justify="space-between" className={styles['search-filter-wrapper']}>
                  <Col span={24} className={styles['filter-action-wrapper']}>
                        <Col flex="80px" className={styles['filter-action-col']}>
                            <Tooltip title="Clear">
                                <Button type="default" onClick={resetAll}> Clear</Button>
                            </Tooltip>
                        </Col> 
                        <Col flex="80px" className={styles['filter-action-col']}>
                            <Tooltip title="Search">
                                <Button type="primary" style={{background:"#9776a2 !important"}} onClick={handleSearch} icon={<SearchOutlined />}> Search</Button>
                            </Tooltip>
                        </Col>
                        <Col flex="auto" className={styles['more-filter-option']}>
                            <div style={{paddingRight: "15px", marginTop: "-2px", display: 'flex',alignItems: 'center'}}>
                              <Icon type="message" title="Open View" disabled={saveDisable} onClick={showModal} className={'antdIcon-npi'} component={FolderOpenOutlined} />
                              {SelectedUserView && <Icon type="message" title="Save View" onClick={handleSave} className={'antdIcon-npi'} component={SaveOutlined} />}
                              {
                              saveDisable1 == true ? 
                              <Icon type="message" title="Save As View"  className={'antdIcon-npi-disable'} component={FormOutlined} />
                              : 
                              <Icon type="message" title="Save As View" onClick={saveAsModal} className={'antdIcon-npi'} component={FormOutlined} />
                              }
                              {tableData?.length>0 && 
                              <>
                             {console.log("download tabpanes",tabpanes)}
                               {
                                tabpanes.length >0 ?
                                
                                <Download radioSelection={radioSelection}  hospitalNetworkData={hospitalNetworkData} networkData={NetworkData} networkFileName={networkFileName} downloadAllObj={downloadAllObj} style={{marginLeft: '5px'}} type={DataType} />
                                : 
                                
                                <Download radioSelection={radioSelection}  networkData={NetworkData} networkFileName={networkFileName} downloadAllObj={downloadAllObj} style={{marginLeft: '5px'}} type={'all'} />
                               }
                              </>}
                            </div>

                            <div onClick={handleMoreFilter} style={{color: "#9776a2"}}>
                                Filters {!moreFilters ? <DownCircleOutlined style={{color: "#9776a2"}} /> : <UpCircleOutlined style={{color: "#9776a2"}} />}
                            </div>
                        </Col>
                  </Col>
            </Row>
            {
              tableData?.length>0 ?
                <Row gutter={0} className={styles['table-result-wrapper']}>
                  <Col span={24} style={{display:'flex',justifyContent:'flex-end'}}>
                    {
                      clearSortingBoolean === true ?
                    <Button type="link" onClick={()=>handleSearch()} style={{color:'#9776a2'}}>{'Clear Sorting'}</Button>
                    :""}
                    </Col>
                    <Col span={24}>
                      {
                      console.log("activeTabKey",activeTabKey)}
                        <Tabs
                                hideAdd
                                onChange={onTabChange}
                                activeKey={activeTabKey}
                                onEdit={onTabEdit}
                                type="editable-card"
                                onTabClick={(key)=>{
                                  if(key == 1){
                                   // console.log("testFunction key",key)
                                   // console.log("testFunction searchbyNPIOption",searchbyNPIOption)
                                    setDataType('all');
                                    if(searchbyNPIOption){
                                      setdownloadAllObj({...downloadAllObj,'specialtyname':'','npi':lastNPI});
                                    }
                                    else{
                                      setNetworkData(NPISearchData)
                                      setdownloadAllObj({...downloadAllObj,'specialtyname':'','npi':''});
                                    }
                                    
                                  }
                                  else{
                                    setDataType('network');
                                    onTabClick(key)
                                  }
                                }}
                            >
                              
                                <TabPane tab={'Results'} key={1} closable={false}>
                                  <TableResult searchNPIOption={searchbyNPIOption} filtervalues={filtervalues} isLoading={loader} sortingInfo={sortingInfo} data={tableData} filterNetworkObj={filterNetworkObj} columns={mainresultCols} 
                                  totalCount={TotalCount} pageChange={onPageChange} handleNetworkID={openNew} handlepresentationName={presentationName}
                                  hospitalPresntationName={hospitalPresntationName} handleSerachBoolean={handleSerachBoolean}
                                  //type={'network'}
                                  />
                                </TabPane>
                                { 
                                  tabpanes.map(pane => (
                                    console.log("tabpanes pane.type",tabpanes),
                                     console.log("tabpanes pane",pane),
                                    tabpanes.length === 0 
                                    ?  
                                      setDataType('all')
                                    :
                                  
                                    pane.type === "Networks" 
                                    ? 
                                      <TabPane tab={pane.title} key={pane.key} >
                                        <NetworkTableResult isLoading={loader} sortingInfo={sortingInfo} data={pane.content.map(({key,...rest}) => ({...rest}))} 
                                          filterNetworkObj={filterNetworkObj} columns={mainresultCols} totalCount={TotalCount} pageChange={onPageChange} 
                                          handleNetworkID={openNew} hospitalPresntationName={hospitalPresntationName} type={'network'} />
                                      </TabPane>
                                    :
                                    // console.log("tabpanes pane",pane),
                                      <TabPane tab={pane.title} key={pane.key}>
                                         {console.log("tabpanes allDataSource",tabpanes)}
                                         {console.log("tabpanes allDataSource pane",pane.content.hospitalAffiliations )}
                                         {console.log("HospitalAffiliation",HospitalAffiliation)}
                                        {console.log("GroupAffiliation",GroupAffiliation)}
                                        <br/>
                                        <p style={{fontWeight:900 ,margin:"3px 3px 3px 12px"}}>Hospital Affiliations</p>
                                          <TableResult filtervalues={filtervalues} type={'network'}  sortingInfo={sortingInfo} pageChange={onTabPageChange} data={pane.content.hasOwnProperty('data')?pane.content.data.hospitalAffiliations === "No Data Available" ?[]: pane.content.data.hospitalAffiliations                :pane.content.hospitalAffiliations === "No Data Available" ?[]: pane.content.hospitalAffiliations} checkOthers={true}/>
                                        <p style={{fontWeight:900 ,margin:"3px 3px 3px 12px"}}>Group Affiliations</p>
                                          <TableResult filtervalues={filtervalues} type={'network'} sortingInfo={sortingInfo} pageChange={onTabPageChange} data={pane.content.hasOwnProperty('data')?pane.content.data.groupAffiliations === "No Data Available" ?[]: pane.content.data.groupAffiliations       :pane.content.groupAffiliations === "No Data Available" ?[]: pane.content.groupAffiliations} />
                                       
                                        </TabPane>
                                )
                                )
                                }
                            </Tabs>
                    </Col>
                </Row>
              : <Empty style={{padding:'6em'}} 
              description={
                <span>
                  {loader ? 'Loading...' : `${tableMessage}`}
                </span>
              } />
            }            
          <Modal title={defaultModalView === 'view' ? 'Select View' : defaultModalView === 'saveAs'? 'Save As View':'Save The View'} visible={isModalVisible} 
            footer={defaultModalView === 'view' ? '' : 
            <Button type="primary" disabled={saveDisable} onClick={handleOk}>Save</Button>} 
            onCancel={handleCancel}>
            {defaultModalView === 'view' ?
            <>
              <div style={{display:'flex',padding:'15px',justifyContent:'center',marginTop:"-25px"}}>
                <Button style={{border: 'rgb(151,118,162) solid 1px',color: 'rgb(151,118,162)',borderRadius:'10px'}} onClick={loadOriginalView}>Load Original View</Button>
              </div>
              <Select
                showSearch
                defaultValue={"Select the view"}
                placeholder="Select the view"
                optionFilterProp="children"
                style={{width: '100%'}}
                value={SelectedUserView}
                onChange={handleViewChange}
                filterOption={(input, option) =>
                  option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {userViews.map((item)=>{
                  return (
                    <option value={item.value} key={item?.value} label={item.label}>
                      <div style={{display: 'flex', justifyContent: 'space-between',padding: '0 2px 0 0'}}>
                        <div>{item.label}</div>
                        <div>{DefaultUserView === item.value ? 
                          <Button type="link" style={{background: '#9776a2',color: '#fff',border: '1px solid #fff',borderRadius:'8px'}} onClick={(event)=>handledefaultView(event,item.label,item.value,false)}>Default</Button>
                          : <Button type="link" style={{background: '#fff',color: '#9776a2',border: '1px solid #9776a2',borderRadius:'8px'}} onClick={(event)=>handledefaultView(event,item.label,item.value,true)}>Set Default</Button>
                        }
                          <Button type="link" onClick={(e)=>handleDeleteView(e,item.label,item.value)} style={{padding: '0px 4px 0 10px'}}>
                            <DeleteOutlined style={{color: 'color: rgb(205 184 211);'}} />
                          </Button>
                        </div>                        
                      </div>
                    </option>
                  )
                })}
              </Select>
            </> :
            defaultModalView === 'saveAs' ? 
              <>
                <Input placeholder="Enter the view name"
                  value={inputViewName}
                  onChange={(event) => {
                   // console.log("Enter the view name",event)
                    setinputViewName(event.target.value);
                    setsaveDisable(false);
                  }} 
                />
                <div style={{marginTop: '10px'}}>
                  <Checkbox onChange={(event)=>{
                    let value = event.target.checked ? 1 : 0
                    setinputViewDefault(value);
                    }}
                  >
                      Make it Default
                  </Checkbox>
                </div>
              </> : 'Save View'
          }
          </Modal>
        </div>
        
    )
}

export default Maincontent;