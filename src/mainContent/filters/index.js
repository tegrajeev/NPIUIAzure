import React from 'react';
import Filters from './filterconfig';
import { fetchStateData, fetchCountyData, fetchZipcodeData, fetchSpecialtyGroup, fetchNPIType,getAffiliatedHospitals,fetchoriginalview } from "../../requests";
import { Input, Select, Radio, Row, Col, Divider,TreeSelect } from 'antd';
import styles from './filters.module.scss';
import { GoInfo } from "react-icons/go";
import Icon, { InfoCircleTwoTone } from "@ant-design/icons";
const { Option } = Select;

function SearchFilters(props) {
    const [Options, setOptions] = React.useState([]);
    const [StateOptions, setStateOptions] = React.useState([]);
    const [CountyOptions, setCountyOptions] = React.useState([]);
    const [ZipcodeOptions, setZipcodeOptions] = React.useState([]);
    const [npitypeGroup, setnpitypeGroup] = React.useState([]);
    const [specialtygroupOptions, setspecialtygroupOptions] = React.useState([]);
    const [getAffiliatedHospitalsoptions, setgetAffiliatedHospitalsoptions] = React.useState([]);
    const [selectedvalues, setselectedvalues] = React.useState(props?.filterValues);    
    //const [radioSelection,setradioSelection] = React.useState('zipcode');
    const [requiredFields,setrequiredFields] = React.useState(true);
    const [HospitalrequiredFields,setHospitalrequiredFields] = React.useState();

    async function onTextChange(event){
        if(event?.target?.type === 'text' && event?.target?.name){           
            props.filterState({...props.filterValues,[event?.target?.name]:event?.target?.value});
            if(event?.target?.name === 'npi'){
                if(!isNaN(event?.target?.value) && event?.target?.value.length === 10) {
                    props?.setlastNPI(event?.target?.value);
                    props.filterSetError({});
                }
                else{
                    //props.filterSetError({'npi':'error'});
                }
                         
            }
        }
    }

    async function onChange(value,option,name1,name2) {
    console.log("function onChange",value,props)
    //props.setsearchButton(true)
    switch (value) {
        case "PCP":
            setHospitalrequiredFields(true);
            break;
        case "Specialist":
            setHospitalrequiredFields(true);
            break;
        case "Hospital":
            setHospitalrequiredFields(false);
    }   
        // if(props.filterValues.npitype ===  "PCP"){
        //     setHospitalrequiredFields(true);
        //     props.sethandleSerachBoolean(true);
        // }
        // if(props.filterValues.npitype ===  "Hospital"){
        //     setHospitalrequiredFields(false);
        //         props.sethandleSerachBoolean(false);
        // }
        // if(props.filterValues.npitype ===  "Specialist"){
        //     setHospitalrequiredFields(true);
        //     props.sethandleSerachBoolean(true);
            
        // }

      if(props.searchButton ==="Hospital"){
       
        props.sethandleSerachBoolean(false);
      }
      if(props.searchButton ==="PCP"){
    
        props.sethandleSerachBoolean(true);
      }
    
      if(props.searchButton ==="Specialist"){
     
        props.sethandleSerachBoolean(true);
      }
    
    


        if(name2 === 'clearIT'){
            props.filterState({...props.filterValues,[name1]:''});
        }
        if(option?.type === 'state'){
            props.filterSetError({...props.filterError,'state':''})
            props.filterState({...props.filterValues,'state':value,'county':'','zipcode':'','geography':'','AffiliatedToHospital':'',"AffiliatedToHospital":''});

            let obj = {"state":value,
            "clientid":props['clientId']}
            let countydata = await fetchCountyData(obj);
            setCountyOptions(countydata)
        }
        if(option?.type === 'county'){
            props.filterSetError({...props.filterError,'county':''})
            props.filterState({...props.filterValues,'county':value,'AffiliatedToHospital':''});

            let zipObj = {
              "state":props.filterValues.state,
              "county":value
            }

            let zipcodedata = await fetchZipcodeData(zipObj);
            setZipcodeOptions(zipcodedata);
        }
        if(option?.type === 'zipcode' && props?.radioSelection === 'zipcode' || props?.radioSelection === 'geography' && option?.type === 'geography'){
            props?.setradioSelection(option?.type);
            let oldType = option?.type === 'zipcode' ? 'geography' : 'zipcode';
            props.filterSetError({...props.filterError,[option?.type]:'',});
            let oldFilterValues = props.filterValues;
            delete oldFilterValues[oldType];
            props.filterState({...oldFilterValues,[option?.type]:value,'AffiliatedToHospital':''});
            
        }
        if(option?.type === 'npiType'){
            props.filterSetError({...props.filterError,'npitype':''})
            props.filterState({...props.filterValues,'npitype':value,'specialtygroup':'','orgname':'','firstname':'','lastname':'','AffiliatedToHospital':''}); 
            let specialtygroup = await fetchSpecialtyGroup(value);
            setspecialtygroupOptions(specialtygroup);
            
        }
        if(option?.type === 'specialtyGroup'){
            props.filterState({...props.filterValues,'specialtygroup':value,"AffiliatedToHospital":''});
        }

        if(option?.type === 'AffiliatedToHospital'){
            props.filterState({...props.filterValues,'AffiliatedToHospital':value,});
           
           let payload = {
            "npitype" : props.filterValues['npitype'],
            "state" : props.filterValues['state'],
            "county" : props.filterValues['county'],
            "zipcode" : props.filterValues['zipcode']|| "",
            "geography" : props.filterValues['geography']|| "",
            
        }
           // let specialtygroup = await getAffiliatedHospitals(payload);
           
          //  setgetAffiliatedHospitalsoptions(specialtygroup);
        }
    }
    
    function onSearch(val) {
        console.log('search:', val);
    }

    async function checkHospitalAffiliation(value,option,name1,name2) {
        let result = await fetchoriginalview(props.clientId);
        

        if(props.filterValues.npitype === "Hospital"){
            setHospitalrequiredFields(false)
        }
        else{
            setHospitalrequiredFields(true)
        }
     }

    React.useEffect(() => {
        checkHospitalAffiliation()
        let values = props?.filterValues;
        if(props?.filterValues['geography']?.length>0){
            props?.setradioSelection('geography');
            props.filterSetError({...props.filterError,['geography']:''});
            try{
                //delete values['zipcode'];
                props.filterState(values);
            }
            catch(e){
               // console.log('Filter Error',e)
            }
        }
        if(props?.filterValues['zipcode']?.length>0){
            props?.setradioSelection('zipcode');
            props.filterSetError({...props.filterError,['zipcode']:''});
            try{
                //delete values['geography'];
                props.filterState(values);
            }
            catch(e){
               // console.log('Filter Error',e)
            }
        }
        if(props?.clearAll){
            props?.setradioSelection('zipcode');
            props?.setclearAll(false);
        }
        handleDropdown();
       // console.log("props?.filterValues",props?.filterValues)
        setselectedvalues(props?.filterValues)
    },[props.error,props.filterValues,props?.clearAll])

    const handleDropdown = async () => {   

        console.log("function handleDropdown",props)
        //console.log("function handleDropdown",selectedvalues)
        if(!props.filterValues['npitype']?.length && !props?.searchNPIOption){
            let npitypedata = await fetchNPIType();
            setnpitypeGroup(npitypedata);
        }
        if(!props.filterValues['state']?.length && !props?.searchNPIOption){
            let statedata = await fetchStateData(props?.clientId);
            setStateOptions(statedata);
            console.log("ranjan rawat",statedata)
            setCountyOptions([]);
            setZipcodeOptions([]);
            setspecialtygroupOptions([]);
        }
        if(props.filterValues['state']?.length>0 && !props?.searchNPIOption && selectedvalues['state'] !== props.filterValues['state']){
          let obj = {"state":props.filterValues['state'],
                    "clientid":props['clientId']
        }
            let countydata = await fetchCountyData(obj);
            
            setCountyOptions(countydata);

            let zipObj = {
              "state":props.filterValues['state'],
              "county":props.filterValues['county']
            }

            let zipcodedata = await fetchZipcodeData(zipObj);
            setZipcodeOptions(zipcodedata);
        }
        if(props.filterValues['npitype']?.length>0 && !props?.searchNPIOption && selectedvalues['npitype'] !== props.filterValues['npitype']){
            let specialtygroup = await fetchSpecialtyGroup(props.filterValues['npitype']);
            setspecialtygroupOptions(specialtygroup);
            
        }

        //console.log("props.filterValues",props)
        if((props.filterValues['AffiliatedToHospital']?.length>0 && !props?.searchNPIOption )|| props.filterValues['npitype'] === "PCP" || props.filterValues['npitype'] === "Specialist" ){
            console.log("this is called",props)
            let payload = {
                "npitype" : props.filterValues['npitype'],
                "state" : props.filterValues['state'],
                "county" : props.filterValues['county'],
                "zipcode" : props.filterValues['zipcode']|| "",
                "geography" : props.filterValues['geography'] || "",
                "firstname": props.filterValues['firstname'] || "",
                "lastname": props.filterValues['lastname'] || "",
                "specialtygroup": props.filterValues['specialtygroup'] || "",
                "clientid":props['clientId'] || ""
            }
            let specialtygroup = await getAffiliatedHospitals(payload);
            if(specialtygroup === "No Data Available"){
              
                setgetAffiliatedHospitalsoptions('');
            }else{
                let groupAffiliations = specialtygroup.map((item) => ({
                        label: `${item.HospitalNames}`,
                       value: `${item.HospitalNames}`,
                       type: 'AffiliatedToHospital'
                     }))

                     setgetAffiliatedHospitalsoptions(groupAffiliations);
            }

            
        }
    }
    
    function handleDropdownOption (value){
    //    console.log("handleDropdownOption",value)

        if(value === 2){
            return npitypeGroup;
        }
        if(value === 3){
            return specialtygroupOptions;
        }
        if(value === 7){
            return StateOptions;
        }
        if(value === 8){
            return CountyOptions;
        }
        if(value === 9){
            
            return ZipcodeOptions;
        }

        if(value === 12){
            
            return getAffiliatedHospitalsoptions;
        }
        else{
            return [{label: 'dd',value: 'sss'}]
        }
    }

    function handleRadioSelection (event){

        console.log('handleRadioSelection',event)
        props.setselectedSwitch(event.target.value)
        let oldType = event.target.value === 'zipcode' ? 'geography' : 'zipcode';
        props.filterSetError({...props.filterError,[event.target.value]:''});
        let oldFilterValues = props.filterValues;
        delete oldFilterValues[oldType];
        props.filterState({...oldFilterValues,[event.target.value]:props.filterValues[event.target.value]});
        props?.setradioSelection(event.target.value)

    }

  return (
    <React.Fragment>
          {Filters.search.filters.sort(function(a, b) { 
              return a.id - b.id;
            }).map((item)=>
            {
              switch(item.type){
                case 'text': return(
                    props?.searchNPIOption && item.name === 'npi' ?
                    <Col className={styles['col-filter']} xs={24} sm={24} md={24}>
                        <div className={styles['col-label']}>{item.label}{item?.required && requiredFields && '*'}</div>
                        <Input placeholder={item.placeholder} maxLength="10" value={props?.filterValues[item.name]||""} 
                        name={item.name} onChange={onTextChange} style={{ width: '100%' }} />
                        <p className='error-text'>{props?.filterError[item.name] && `Please enter valid ${item.label}!`}</p>
                    </Col>
                    : 
                    !props?.searchNPIOption && item.name !== 'npi'  &&
                    <Col className={styles['col-filter']} xs={12} sm={12} md={5}>
                        <div className={styles['col-label']}>{item.label}</div>
                        <Input placeholder={item.placeholder} disabled={(                           
                                props?.filterValues['npitype']?.toLowerCase() === 'hospital' && 
                                (item.id === 4 || item.id === 5)) || 
                                props?.filterValues['npitype']?.toLowerCase() === 'specialist' && 
                                (item.id === 6) || 
                                props?.filterValues['npitype']?.toLowerCase() === 'pcp' && 
                                (item.id === 6)
                                ? true : false} value={props?.filterValues[item.name]||""}
                        name={item.name}  onChange={onTextChange} style={{ width: '100%' }} />
                        <p className='error-text'>{props?.filterError[item.name] && `Please enter valid ${item.label}!`}</p>
                    </Col>       
                );                
                break;
                case 'radio': return(
                    !props?.searchNPIOption &&
                        <Col className={styles['col-filter']} xs={12} sm={12} md={6}>
                        <div className={styles['col-label']}>{item.label}</div>
                        <Radio.Group
                            options={[
                            { label: 'Zipcode', value: 'zipcode' },
                            { label: 'Geography', value: 'geography' }
                            ]}
                            onChange={(event)=>{handleRadioSelection(event)}}
                            value={props?.radioSelection}
                            optionType="button"
                            buttonStyle="solid"
                        />
                    </Col>               
                );                
                break;
                case 'select': return (
                  !props?.searchNPIOption && (
                    <>
                      {/* {console.log("props?.radioSelection",item)} */}
                      {(item.id === 9 && props?.radioSelection === "zipcode") ||
                      (item.id === 10 &&
                        props?.radioSelection === "geography") ? (
                        <Col
                          className={styles["col-filter"]}
                          xs={12}
                          sm={12}
                          md={5}
                        >
                          <div className={styles["col-label"]}>
                            {item.label}
                            {console.log("rajeev test 1",item.label)}
                            {props?.filterValues["npitype"]?.toLowerCase() !==
                              "hospital" &&
                              item?.required &&
                              requiredFields &&
                              "*"}
                          </div>
                          <Select
                            loading={props?.iLoading}
                            showSearch
                            autoComplete="none"
                            style={{ width: "100%" }}
                            className={
                              props?.filterError[item.name] ? "error" : ""
                            }
                            placeholder={item.placeholder}
                            optionFilterProp="children"
                            value={props.filterValues[item.name] || null}
                            onChange={(value, option) =>
                              onChange(value, option, item.name, "clearIT")
                            }
                            filterOption={(input, option) =>
                              option.props.value
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            options={
                              item?.data
                                ? item.data
                                : handleDropdownOption(item.id)
                            }
                          ></Select>

                         
                        </Col>
                      ) : (
                        item.id !== 9 &&
                        item.id !== 10 &&
                        item.id !== 12 && (
                          <Col
                            className={styles["col-filter"]}
                            xs={12}
                            sm={12}
                            md={4}
                          >
                            <div className={styles["col-label"]}>
                              {item.label}
                              {console.log("rajeev test 2",item.label)}
                              {item?.required && requiredFields && "*"}
                            </div>
                            <Select
                              loading={props?.iLoading}
                              showSearch
                              
                              autoComplete="none"
                              style={{ width: "100%" }}
                              className={
                                props?.filterError[item.name] ? "error" : ""
                              }
                              placeholder={item.placeholder}
                              optionFilterProp="children"
                              value={props.filterValues[item.name] || null}
                              onChange={(value, option) =>
                                onChange(value, option, item.name, "clearIT")
                              }
                              filterOption={(input, option) =>
                                option.props.value
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              options={
                                item?.data
                                  ? item.data
                                  : handleDropdownOption(item.id)
                              }
                            ></Select>
                            <p className="error-text">
                              {props?.filterError[item.name] &&
                                `Please Select the ${item.label}!`}
                            </p>
                          </Col>
                        )
                      )}
                      {HospitalrequiredFields === true ? (
                        item.name === "AffiliatedToHospital" ? (
                          <Col
                            className={styles["col-filter"]}
                            xs={12}
                            sm={12}
                            md={6}
                          >
                            {/* {console.log("Itemsto be decided",item)} */}
                            <div className={styles["col-label"]}>
                              {item.label} <Icon
                    style={{
                      // position: "absolute",
                      fontSize: "14px",
                      cursor: "inherit",
                      top: "3px",
                      right: "20px",
                      backgroundColor: "#1783dc !important",
                      borderRadius:"10px"
                    }}
                    type="message"
                    title="Dropdown values are based on hospitals and provider affiliations in selected geography."
                    component={GoInfo}
                    className={styles["icon-style"]}
                  />
                              {console.log("rajeev test 3",item.label)}
                              {item?.required && requiredFields && "*"}
                            </div>
                            <Select
                              allowClear
                              loading={props?.iLoading}
                              showSearch
                              autoComplete="none"
                              style={{ width: "100%" }}
                              className={
                                props?.filterError[item.name] ? "error" : ""
                              }
                              placeholder={item.placeholder}
                              
                              optionFilterProp="children"
                              value={props.filterValues[item.name] || null}
                              onChange={(value, option) =>
                                onChange(value, option, item.name, "clearIT")
                              }
                              onSearch={onSearch}
                              filterOption={(input, option) =>
                                option.props.value
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              options={
                                item?.data
                                  ? item.data
                                  : handleDropdownOption(item.id)
                              }
                            ></Select>
                            <p className="error-text">
                              {props?.filterError[item.name] &&
                                `Please Select the ${item.label}!`}
                            </p>
                          </Col>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </>
                  )
                );                
                break;
                default: return(<div></div>);         
                break;
              }
            }
          )
          }
    </React.Fragment>  
  );
}

export default SearchFilters;
