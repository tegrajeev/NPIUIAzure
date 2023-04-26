import React from "react";
import { Table } from "antd";
import Icon, { InfoCircleTwoTone } from "@ant-design/icons";
import { GoInfo } from "react-icons/go";
import styles from "./table.module.scss";
export default function TableResult(props) {
  const usercolumns = [
    {
      title: "NPI",
      dataIndex: "NPI",
      key: "NPI",
      sorter: {
        compare: (a, b) => a.NPI - b.NPI,
        multiple: 1,
      },
    },
    {
      title: "Presentation Name",
      dataIndex: "Presentation_Name",
      key: "Presentation_Name",
      render: (text, record, index) => (
        <a
          data-id={record?.NPI}
          name={text}
          style={{ color: "#9776a2" }}
          onClick={props.handleNetworkID}
        >
          {text}
        </a>
      ),
      sorter: {
        compare: (a, b) => a.Presentation_Name - b.Presentation_Name,
        multiple: 1,
      },
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: {
        compare: (a, b) => a.Address - b.Address,
        multiple: 1,
      },
    },
    {
      title: "Provider Type",
      dataIndex: "Provider_Type",
      key: "Provider_Type",
      sorter: {
        compare: (a, b) => a.Provider_Type - b.Provider_Type,
        multiple: 1,
      },
    },
    {
      title: "Specialty Name",
      dataIndex: "Specialty_Name",
      key: "Specialty_Name",
      sorter: {
        compare: (a, b) => a.Specialty_Name - b.Specialty_Name,
        multiple: 1,
      },
    },
    {
      title: "Networks",
      dataIndex: "Networks",
      key: "Networks",
      sorter: {
        compare: (a, b) => a.Networks - b.Networks,
        multiple: 1,
      },
    },
    {
      title: "Hospital Affiliations",
      dataIndex: "Hospital_Affiliations",
      key: "Hospital_Affiliations",
      sorter: {
        compare: (a, b) => a.Hospital_Affiliations - b.Hospital_Affiliations,
        multiple: 1,
      },
    },
    {
      title: "Utilization Score",
      dataIndex: "Utilization_Score",
      key: "Utilization_Score",
      sorter: {
        compare: (a, b) => a.Hospital_Affiliations - b.Hospital_Affiliations,
        multiple: 1,
      },
    },
    {
      title: "Active In Preventive Care",
      dataIndex: "Active_In_Preventive_Care",
      key: "Active_In_Preventive_Care",
      sorter: {
        compare: (a, b) =>
          a.Active_In_Preventive_Care - b.Active_In_Preventive_Care,
        multiple: 1,
      },
    },
  ];

  const networkcolumns = [
    {
      title: "Network ID",
      dataIndex: "Network_Id",
      key: "Network_Id",
      sorter: {
        compare: (a, b) => a.Network_Id - b.Network_Id,
        multiple: 1,
      },
    },
    {
      title: "Hospital Affiliations",
      dataIndex: "Hospital_Affiliations",
      key: "Hospital_Affiliations",
      sorter: {
        compare: (a, b) => {
          if (a.Hospital_Affiliations < b.Hospital_Affiliations) {
            return -1;
          }
          if (a.Hospital_Affiliations > b.Hospital_Affiliations) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: {
        compare: (a, b) => {
          if (a.Address < b.Address) {
            return -1;
          }
          if (a.Address > b.Address) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: "Network Name",
      dataIndex: "Network_Name",
      key: "Network_Name",
      sorter: {
        compare: (a, b) => {
          if (a.Network_Name < b.Network_Name) {
            return -1;
          }
          if (a.Network_Name > b.Network_Name) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
    {
      title: "Parent Organization",
      dataIndex: "Parent_Organization",
      key: "Parent_Organization",
      sorter: {
        compare: (a, b) => {
          if (a.Parent_Organization < b.Parent_Organization) {
            return -1;
          }
          if (a.Parent_Organization > b.Parent_Organization) {
            return 1;
          }
          return 0;
        },
        multiple: 1,
      },
    },
  ];

  const [itemsperpage, setitemsperpage] = React.useState(10);
  const [data, setData] = React.useState([]);
  const [allCols, setallCols] = React.useState([]);
  const [tabCols, settabCols] = React.useState([]);
  const [acolmns, setacolmns] = React.useState([]);

  React.useEffect(() => {
    if (props.data === undefined) {
      setacolmns(["Organization ID", "Presentation Name", "Address "]);
      setData([
        {
          "Organization ID": "No Data",
          "Presentation Name": "No Data",
          "Address ": "No Data",
        },
      ]);
    } else {
      console.log("Result data first if", props);
      setData(props.data);
      if (props?.type === "network") {
        console.log("Result data second if line 212", props, data);
        let val = props?.data[0];
        if (props.data.length > 0) {
          let colmns = Object?.keys(val);
          setacolmns(colmns);
          let colmsdata = [];
          // console.log("colmns", colmns);
          if (val["Primary NPI"] === "Others") {
            console.log("this is rajeev if");
            colmns?.map((item) => {
              colmsdata.push({
                title: item === "Primary NPI" ? " " : item.replaceAll("_", " "),
                dataIndex: item,
                filterDropdown:
                  item === "NPI_Quality_Score"
                    ? true
                    : false || item === "NPI_Value_Score"
                    ? true
                    : false || item === "Utilization_Score"
                    ? true
                    : false || item === "NPI_Score"
                    ? true
                    : false || item === "Active_In_Preventive_Care"
                    ? true
                    : false,
                filterIcon: (
                  <Icon
                    style={{
                      fontSize: "18px",
                      cursor: "inherit",
                      position: "absolute",
                      borderRadius:"10px"
                    }}
                    type="message"
                    title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                    component={GoInfo}
                    className={styles["icon-style"]}
                  />
                ),
                hidden:
                  item === "key"
                    ? true
                    : false || item === "Others"
                    ? true
                    : false,
                sorter: {
                  compare: (a, b) => {
                    if (a[item] < b[item]) {
                      return -1;
                    }
                    if (a[item] > b[item]) {
                      return 1;
                    }
                    return 0;
                  },
                  multiple: 1,
                },
              });
            });
            colmsdata = colmsdata.filter((item) => !item.hidden);
            //console.log("colmsdata",colmsdata)
            settabCols(colmsdata);
          } else {
            console.log("this is rajeev else");
            colmns?.map((item) => {
              colmsdata.push({
                title: item.replaceAll("_", " "),
                dataIndex: item,
                key: item,
                filterDropdown:
                  item === "NPI_Quality_Score"
                    ? true
                    : false || item === "NPI_Value_Score"
                    ? true
                    : false || item === "Utilization_Score"
                    ? true
                    : false || item === "NPI_Score"
                    ? true
                    : false || item === "Active_In_Preventive_Care"
                    ? true
                    : false,
                filterIcon: (
                  <div style={{ position: "absolute", right: "32px" }}>
                   
                    <Icon
                      style={{
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "30px",
                        position: "absolute",
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ),
                hidden:
                  item === "key"
                    ? true
                    : false || item === ""
                    ? true
                    : false || item === "Others"
                    ? true
                    : false,
                sorter: {
                  compare: (a, b) => {
                    if (a[item] < b[item]) {
                      return -1;
                    }
                    if (a[item] > b[item]) {
                      return 1;
                    }
                    return 0;
                  },
                  multiple: 1,
                },
              });
            });

            colmsdata = colmsdata.filter((item) => !item.hidden);
            //console.log("colmsdata",colmsdata)
            settabCols(colmsdata);
          }
          //props?.setdownloadNetworkCols(colmns)
        }
      } else {
        console.log("Result data second else line 310", props);
        if (Object.keys(props.filtervalues).length === 1) {
          let val = props?.data[0];
          let colmns = Object?.keys(val);
          setacolmns(colmns);
          let colmsdata = [];
          // console.log("colmns vibhore",colmns)
          colmns?.map((item) => {
            // console.log("items in loop,",item)
            colmsdata.push({
              title: item.replaceAll("_", " "),
              width: item === 'NPI' ?  90 :200 
                && item === "Networks" ?  90 :200  
                && item === "Provider_Type" ?  110 :200 
                && item === "Health System" ?  130 :200 
                && item === "Specialty_Name" ?  140 :200
                && item === "state" ?  80 :200
                && item === "county_name" ?  100 :200
                && item === "Presentation_Name" ?  160 :200
                && item === "NPI_Quality_Score" ?  170 :200
                && item === "NPI_Score"?  80 :200
                ,
              filterIcon:
                props.filtervalues.npitype === "PCP" ? (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "30px",
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ) : (
                  <div style={{ position: "absolute", right: "32px" }}>

                    <Icon
                      style={{
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "30px",
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Score for a specialist is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county for that particular specialty. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, etc"
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ),

              dataIndex: item,
              key: item,
              hidden:
                Object.keys(props.filtervalues.npi).length > 0
                  ? item === "New_Name"
                    ? true
                    : false || item === "statecode"
                    ? true
                    : false
                  : item === "state"
                  ? true
                  : false || item === "New_Name"
                  ? true
                  : false,

              filterDropdown:
                item === "NPI_Quality_Score"
                  ? true
                  : false || item === "NPI_Value_Score"
                  ? true
                  : false || item === "Utilization_Score"
                  ? true
                  : false || item === "NPI_Score"
                  ? true
                  : false || item === "Active_In_Preventive_Care"
                  ? true
                  : false,

              render: (text, record, index) => (
                //  console.log("Rajeev ranjan",record),
                <p>
                  {(item === "Presentation_Name" ||
                    item === "Networks" ||
                    props.filtervalues["npi"] === "Hospital") &&
                  props.handleSerachBoolean === true ? (
                    <a
                      data-id={record?.NPI}
                      speciality-name={
                        record.hasOwnProperty("New_Name")
                          ? record?.New_Name
                          : record?.Specialty_Name
                      }
                      name={record?.Presentation_Name}
                      npitype-code={props?.filterNetworkObj?.npitype}
                      specialtygroup-code={
                        props?.filterNetworkObj?.specialtygroup
                      }
                      zip-code={props?.filterNetworkObj?.zipcode}
                      geography-code={props?.filterNetworkObj?.geography}
                      county-code={
                        record.hasOwnProperty("county_name")
                          ? record.county_name ===
                            props?.filterNetworkObj?.county
                            ? props?.filterNetworkObj?.county
                            : record.county_name
                          : props?.filterNetworkObj?.county
                      }
                      state-code={
                        record.hasOwnProperty("statecode")
                          ? record.statecode === props?.filterNetworkObj?.state
                            ? props?.filterNetworkObj?.state
                            : record.statecode
                          : props?.filterNetworkObj?.state
                      }
                      orgname-code={props?.filterNetworkObj?.orgname}
                      firstname-code={props?.filterNetworkObj?.firstname}
                      lastname-code={props?.filterNetworkObj?.lastname}
                      style={{ color: "#9776a2", textDecoration: "underline" }}
                      onClick={
                        item === "Presentation_Name"
                          ? props?.handleNetworkID
                          : item === "Networks"
                          ? props.handlepresentationName
                          : "test"
                      }
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </p>
              ),
              //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
              sorter: {
                compare: (a, b) => a.item - b.item,
                multiple: 1,
              },
            });
            console.log("Result data line 310 data", colmsdata);
          });
          colmsdata = colmsdata.filter((item) => !item.hidden);
          setallCols(colmsdata);
        } else {

          if(props.filterNetworkObj.zipcode.length>0){
            let val = props?.data[0];
            let colmns = Object?.keys(val);
            setacolmns(colmns);
            let colmsdata = [];
            console.log("colmns vibhore else line 403", colmns);
            colmns?.map((item) => {
              // console.log("items in loop,",item)
              colmsdata.push({
                title:
                  item === "state_fullname" ? "state" : item.replaceAll("_", " "),
                  width: item === 'NPI' ?  100 :200 
                  && item === "Networks" ?  100 :200  
                  && item === "Provider_Type" ?  120 :200 
                  && item === "Health System" ?  130 :200 
                  && item === "Specialty_Name" ?  140 :200
                  && item === "state_fullname" ?  90 :200
                  && item === "county_name" ?  110 :200
                  && item === "Presentation_Name" ?  160 :200
                  && item === "NPI_Quality_Score" ?  170 :200
                  && item === "NPI_Score"?  63 :200
                  ,
                filterIcon:
                  props.filtervalues.npitype === "PCP" ? (
                    <div style={{ position: "absolute", right: "32px" }}>
                      
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                    </div>
                  ) : (
                    <div style={{ position: "absolute", right: "32px" }}>
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a specialist is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county for that particular specialty. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, etc"
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                      
                    </div>
                  ),
  
                dataIndex: item,
                key: item,
                hidden:
                  Object.keys(props.filtervalues.npi).length > 0 || props.filtervalues.npi === undefined
                    ? item === "New_Name"
                      ? true
                      : false || item === "statecode"
                      ? true
                      : false
                    : item === "state"
                    ? true
                    : false || item === "New_Name"
                    ? true
                    : false,
  
                filterDropdown:
                  item === "NPI_Quality_Score"
                    ? true
                    : false || item === "NPI_Value_Score"
                    ? true
                    : false || item === "Utilization_Score"
                    ? true
                    : false || item === "NPI_Score"
                    ? true
                    : false || item === "Active_In_Preventive_Care"
                    ? true
                    : false,
  
                render: (text, record, index) => (
                  //console.log("Rajeev ranjan",record),
                  <p>
                    {(item === "Presentation_Name" ||
                      item === "Networks" ||
                      props.filtervalues["npi"] === "Hospital") &&
                    props.handleSerachBoolean === true ? (
                      <a
                        data-id={record?.NPI}
                        speciality-name={
                          record.hasOwnProperty("New_Name")
                            ? record?.New_Name
                            : record?.Specialty_Name
                        }
                        name={record?.Presentation_Name}
                        npitype-code={props?.filterNetworkObj?.npitype}
                        specialtygroup-code={
                          props?.filterNetworkObj?.specialtygroup
                        }
                        zip-code={props?.filterNetworkObj?.zipcode}
                        geography-code={props?.filterNetworkObj?.geography}
                        county-code={
                          record.hasOwnProperty("county_name")
                            ? record.county_name ===
                              props?.filterNetworkObj?.county
                              ? props?.filterNetworkObj?.county
                              : record.county_name
                            : props?.filterNetworkObj?.county
                        }
                        state-code={
                          record.hasOwnProperty("state")
                            ? record.state === props?.filterNetworkObj?.state
                              ? props?.filterNetworkObj?.state
                              : record.state
                            : props?.filterNetworkObj?.state
                        }
                        orgname-code={props?.filterNetworkObj?.orgname}
                        firstname-code={props?.filterNetworkObj?.firstname}
                        lastname-code={props?.filterNetworkObj?.lastname}
                        style={{ color: "#9776a2", textDecoration: "underline" }}
                        onClick={
                          item === "Presentation_Name"
                            ? props?.handleNetworkID
                            : item === "Networks"
                            ? props.handlepresentationName
                            : "test"
                        }
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </p>
                ),
                //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
                sorter: {
                  compare: (a, b) => a.item - b.item,
                  multiple: 1,
                },
              });
              console.log("Result data line 40 data", colmsdata);
            });
            colmsdata = colmsdata.filter((item) => !item.hidden);
            setallCols(colmsdata);
          }

          if(props.filterNetworkObj.geography.length>0){
            let val = props?.data[0];
            let colmns = Object?.keys(val);
            setacolmns(colmns);
            let colmsdata = [];
            console.log("colmns vibhore else line 403", colmns);
            colmns?.map((item) => {
              // console.log("items in loop,",item)
              colmsdata.push({
                title:
                  item === "state_fullname" ? "state" : item.replaceAll("_", " "),
                  width: item === 'NPI' ?  100 :200 
                  && item === "Networks" ?  100 :200  
                  && item === "Provider_Type" ?  120 :200 
                  && item === "Health System" ?  130 :200 
                  && item === "Specialty_Name" ?  140 :200
                  && item === "state_fullname" ?  80 :200
                  && item === "county_name" ?  110 :200
                  && item === "Presentation_Name" ?  160 :200
                  && item === "NPI_Quality_Score" ?  170 :200
                  && item === "NPI_Score"?  83 :200
                  ,
                filterIcon:
                  props.filtervalues.npitype === "PCP" ? (
                    <div style={{ position: "absolute", right: "32px" }}>
                      
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                    </div>
                  ) : (
                    <div style={{ position: "absolute", right: "32px" }}>
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a specialist is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county for that particular specialty. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, etc"
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                      
                    </div>
                  ),
  
                dataIndex: item,
                key: item,
                hidden:
                  Object.keys(props.filtervalues.npi).length > 0 || props.filtervalues.npi === undefined
                    ? item === "New_Name"
                      ? true
                      : false || item === "statecode"
                      ? true
                      : false
                    : item === "state"
                    ? true
                    : false || item === "New_Name"
                    ? true
                    : false,
  
                filterDropdown:
                  item === "NPI_Quality_Score"
                    ? true
                    : false || item === "NPI_Value_Score"
                    ? true
                    : false || item === "Utilization_Score"
                    ? true
                    : false || item === "NPI_Score"
                    ? true
                    : false || item === "Active_In_Preventive_Care"
                    ? true
                    : false,
  
                render: (text, record, index) => (
                  //console.log("Rajeev ranjan",record),
                  <p>
                    {(item === "Presentation_Name" ||
                      item === "Networks" ||
                      props.filtervalues["npi"] === "Hospital") &&
                    props.handleSerachBoolean === true ? (
                      <a
                        data-id={record?.NPI}
                        speciality-name={
                          record.hasOwnProperty("New_Name")
                            ? record?.New_Name
                            : record?.Specialty_Name
                        }
                        name={record?.Presentation_Name}
                        npitype-code={props?.filterNetworkObj?.npitype}
                        specialtygroup-code={
                          props?.filterNetworkObj?.specialtygroup
                        }
                        zip-code={props?.filterNetworkObj?.zipcode}
                        geography-code={props?.filterNetworkObj?.geography}
                        county-code={
                          record.hasOwnProperty("county_name")
                            ? record.county_name ===
                              props?.filterNetworkObj?.county
                              ? props?.filterNetworkObj?.county
                              : record.county_name
                            : props?.filterNetworkObj?.county
                        }
                        state-code={
                          record.hasOwnProperty("state")
                            ? record.state === props?.filterNetworkObj?.state
                              ? props?.filterNetworkObj?.state
                              : record.state
                            : props?.filterNetworkObj?.state
                        }
                        orgname-code={props?.filterNetworkObj?.orgname}
                        firstname-code={props?.filterNetworkObj?.firstname}
                        lastname-code={props?.filterNetworkObj?.lastname}
                        style={{ color: "#9776a2", textDecoration: "underline" }}
                        onClick={
                          item === "Presentation_Name"
                            ? props?.handleNetworkID
                            : item === "Networks"
                            ? props.handlepresentationName
                            : "test"
                        }
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </p>
                ),
                //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
                sorter: {
                  compare: (a, b) => a.item - b.item,
                  multiple: 1,
                },
              });
              console.log("Result data line 40 data", colmsdata);
            });
            colmsdata = colmsdata.filter((item) => !item.hidden);
            setallCols(colmsdata);
          }
          if(props.filterNetworkObj.geography.length === 0 && props.filterNetworkObj.zipcode.length===0){
           
            if(props.filterNetworkObj.npitype === "Hospital" && props.filterNetworkObj.geography.length === 0 && props.filterNetworkObj.zipcode.length===0){
              console.log("INSIDE Rajeev IF")
              let val = props?.data[0];
              let colmns = Object?.keys(val);
              setacolmns(colmns);
              let colmsdata = [];
              console.log("colmns vibhore else line 403", colmns);
              colmns?.map((item) => {
                // console.log("items in loop,",item)
                colmsdata.push({
                  title:
                    item === "state_fullname" ? "state" : item.replaceAll("_", " "),
                    width: item === 'NPI' ?  100 :200 
                    && item === "Networks" ?  100 :200  
                    && item === "Provider_Type" ?  120 :200 
                    && item === "Health System" ?  130 :200 
                    && item === "Specialty_Name" ?  140 :200
                    && item === "state_fullname" ?  80 :200
                    && item === "county_name" ?  110 :200
                    && item === "Presentation_Name" ?  160 :200
                    && item === "NPI_Quality_Score" ?  143 :200
                    && item === "NPI_Value_Score"?  135 :200
                    ,
                  filterIcon:
                    props.filtervalues.npitype === "PCP" ? (
                      <div style={{ position: "absolute", right: "32px" }}>
                        
                        <Icon
                          style={{
                            fontSize: "18px",
                            cursor: "inherit",
                            top: "3px",
                            right: "30px",
                            borderRadius:"10px"
                          }}
                          type="message"
                          title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                          component={GoInfo}
                          className={styles["icon-style"]}
                        />
                      </div>
                    ) : (
                      <div style={{ position: "absolute", right: "32px" }}>
                        <Icon
                          style={{
                            fontSize: "18px",
                            cursor: "inherit",
                            top: "3px",
                            right: "30px",
                            borderRadius:"10px"
                          }}
                          type="message"
                          title="NPI Score for a specialist is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county for that particular specialty. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, etc"
                          component={GoInfo}
                          className={styles["icon-style"]}
                        />
                        
                      </div>
                    ),
    
                  dataIndex: item,
                  key: item,
                  hidden:
                    Object.keys(props.filtervalues.npi).length > 0 || props.filtervalues.npi === undefined
                      ? item === "New_Name"
                        ? true
                        : false || item === "statecode"
                        ? true
                        : false
                      : item === "state"
                      ? true
                      : false || item === "New_Name"
                      ? true
                      : false,
    
                  filterDropdown:
                    item === "NPI_Quality_Score"
                      ? true
                      : false || item === "NPI_Value_Score"
                      ? true
                      : false || item === "Utilization_Score"
                      ? true
                      : false || item === "NPI_Score"
                      ? true
                      : false || item === "Active_In_Preventive_Care"
                      ? true
                      : false,
    
                  render: (text, record, index) => (
                    //console.log("Rajeev ranjan",record),
                    <p>
                      {(item === "Presentation_Name" || item === "Networks" || props.filtervalues["npi"] === "Hospital") &&
props.handleSerachBoolean === true ? (
                        <a
                          data-id={record?.NPI}
                          speciality-name={
                            record.hasOwnProperty("New_Name")
                              ? record?.New_Name
                              : record?.Specialty_Name
                          }
                          name={record?.Presentation_Name}
                          npitype-code={props?.filterNetworkObj?.npitype}
                          specialtygroup-code={
                            props?.filterNetworkObj?.specialtygroup
                          }
                          zip-code={props?.filterNetworkObj?.zipcode}
                          geography-code={props?.filterNetworkObj?.geography}
                          county-code={
                            record.hasOwnProperty("county_name")
                              ? record.county_name ===
                                props?.filterNetworkObj?.county
                                ? props?.filterNetworkObj?.county
                                : record.county_name
                              : props?.filterNetworkObj?.county
                          }
                          state-code={
                            record.hasOwnProperty("state")
                              ? record.state === props?.filterNetworkObj?.state
                                ? props?.filterNetworkObj?.state
                                : record.state
                              : props?.filterNetworkObj?.state
                          }
                          orgname-code={props?.filterNetworkObj?.orgname}
                          firstname-code={props?.filterNetworkObj?.firstname}
                          lastname-code={props?.filterNetworkObj?.lastname}
                          style={{ color: "#9776a2", textDecoration: "underline" }}
                          onClick={
                            item === "Presentation_Name"
                              ? props?.handleNetworkID
                              : item === "Networks"
                              ? props.handlepresentationName
                              : "test"
                          }
                        >
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </p>
                  ),
                  //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
                  sorter: {
                    compare: (a, b) => a.item - b.item,
                    multiple: 1,
                  },
                });
                console.log("Result data line 40 data", colmsdata);
              });
              colmsdata = colmsdata.filter((item) => !item.hidden);
              setallCols(colmsdata);
            }else{
              console.log("INSIDE Rajeev ELSE")
              let val = props?.data[0];
              let colmns = Object?.keys(val);
              setacolmns(colmns);
              let colmsdata = [];
              console.log("colmns vibhore else line 403", colmns);
              colmns?.map((item) => {
              // console.log("items in loop,",item)
              colmsdata.push({
                title:
                  item === "state_fullname" ? "state" : item.replaceAll("_", " "),
                  width: item === 'NPI' ?  100 :200 
                  && item === "Networks" ?  100 :200  
                  && item === "Provider_Type" ?  120 :200 
                  && item === "Health System" ?  130 :200 
                  && item === "Specialty_Name" ?  140 :200
                  && item === "state_fullname" ?  80 :200
                  && item === "county_name" ?  110 :200
                  && item === "Presentation_Name" ?  160 :200
                  && item === "NPI_Quality_Score" ?  170 :200
                  && item === "NPI_Score"?  63 :200
                  ,
                filterIcon:
                  props.filtervalues.npitype === "PCP" ? (
                    <div style={{ position: "absolute", right: "32px" }}>
                      
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a PCP is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, how active the provider is in preventive care, etc. "
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                    </div>
                  ) : (
                    <div style={{ position: "absolute", right: "32px" }}>
                      <Icon
                        style={{
                          fontSize: "18px",
                          cursor: "inherit",
                          top: "3px",
                          right: "30px",
                          borderRadius:"10px"
                        }}
                        type="message"
                        title="NPI Score for a specialist is a HWAI proprietary metric (1 to 10, with 10 being the best) that indicates the influence of the provider in the county for that particular specialty. It takes various factors into account like how active the provider is in the 65+ age group, number of beneficiaries the provider has access to, number of payers that trust the provider, the kind of hospitals the provider is affiliated with, etc"
                        component={GoInfo}
                        className={styles["icon-style"]}
                      />
                      
                    </div>
                  ),
  
                dataIndex: item,
                key: item,
                hidden:
                  Object.keys(props.filtervalues.npi).length > 0 || props.filtervalues.npi === undefined
                    ? item === "New_Name"
                      ? true
                      : false || item === "statecode"
                      ? true
                      : false
                    : item === "state"
                    ? true
                    : false || item === "New_Name"
                    ? true
                    : false,
  
                filterDropdown:
                  item === "NPI_Quality_Score"
                    ? true
                    : false || item === "NPI_Value_Score"
                    ? true
                    : false || item === "Utilization_Score"
                    ? true
                    : false || item === "NPI_Score"
                    ? true
                    : false || item === "Active_In_Preventive_Care"
                    ? true
                    : false,
  
                render: (text, record, index) => (
                  //console.log("Rajeev ranjan",record),
                  <p>
                    {(item === "Presentation_Name" ||
                      item === "Networks" ||
                      props.filtervalues["npi"] === "Hospital") &&
                    props.handleSerachBoolean === true ? (
                      <a
                        data-id={record?.NPI}
                        speciality-name={
                          record.hasOwnProperty("New_Name")
                            ? record?.New_Name
                            : record?.Specialty_Name
                        }
                        name={record?.Presentation_Name}
                        npitype-code={props?.filterNetworkObj?.npitype}
                        specialtygroup-code={
                          props?.filterNetworkObj?.specialtygroup
                        }
                        zip-code={props?.filterNetworkObj?.zipcode}
                        geography-code={props?.filterNetworkObj?.geography}
                        county-code={
                          record.hasOwnProperty("county_name")
                            ? record.county_name ===
                              props?.filterNetworkObj?.county
                              ? props?.filterNetworkObj?.county
                              : record.county_name
                            : props?.filterNetworkObj?.county
                        }
                        state-code={
                          record.hasOwnProperty("state")
                            ? record.state === props?.filterNetworkObj?.state
                              ? props?.filterNetworkObj?.state
                              : record.state
                            : props?.filterNetworkObj?.state
                        }
                        orgname-code={props?.filterNetworkObj?.orgname}
                        firstname-code={props?.filterNetworkObj?.firstname}
                        lastname-code={props?.filterNetworkObj?.lastname}
                        style={{ color: "#9776a2", textDecoration: "underline" }}
                        onClick={
                          item === "Presentation_Name"
                            ? props?.handleNetworkID
                            : item === "Networks"
                            ? props.handlepresentationName
                            : "test"
                        }
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </p>
                ),
                //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
                sorter: {
                  compare: (a, b) => a.item - b.item,
                  multiple: 1,
                },
              });
              console.log("Result data line 40 data", colmsdata);
              });
              colmsdata = colmsdata.filter((item) => !item.hidden);
              setallCols(colmsdata);
          }
          }

      }
        

      }
      //  console.log("result Data third if",props)

      if (props.hasOwnProperty("filterNetworkObj")  ? props.filterNetworkObj.npitype === "Hospital" : [] && props.handleSerachBoolean === false) {
        console.log("Result data line 392", props);
        if(props.filterNetworkObj.zipcode.length>0){
          console.log("Result data line 392 IF", props);
          let val = props?.data[0];
          let colmns = Object?.keys(val);
          setacolmns(colmns);
          let colmsdata = [];
  
          colmns?.map((item) => {
             console.log("Rajeev",item)
            colmsdata.push({
              title:
                item === "state_fullname" ? "state" : item.replaceAll("_", " "),
              width: item === 'NPI' ?  100 :200 
              && item === "Networks" ?  100 :200  
              && item === "Address" ?  130 :200 
              && item === "Health System" ?  130 :200 
              && item === "Specialty_Name" ?  140 :200
              && item === "state_fullname" ?  80 :200
              && item === "county_name" ?  130 :200
              && item === "Presentation_Name" ?  160 :200
              && item === "NPI_Quality_Score" ?  128 :200
              && item === "NPI_Value_Score"?  120 :200
              ,
              // fixed: item === "NPI_Value_Score" ?  'right' :''
              // && item === "NPI_Value_Score"?  'right' :''
              
              filterIcon:
                item === "NPI_Value_Score" ? (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "10px",
                        
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Value Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that takes both quality of care and cost of care into account. A high value score indicates that the hospital is providing high quality at a relatively lower cost."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ) : (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        
                        borderRadius:"10px",
                        fontSize: "18px",
                        top: "3px",
                        right: "20px",
                        cursor: "inherit",
                      }}
                      type="message"
                      title="NPI Quality Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that indicates the quality of care provided by the hospital."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ),
              filterDropdown:
                item === "NPI_Quality_Score"
                  ? true
                  : false || item === "NPI_Value_Score"
                  ? true
                  : false || item === "Utilization_Score"
                  ? true
                  : false || item === "NPI_Score"
                  ? true
                  : false || item === "Active_In_Preventive_Care"
                  ? true
                  : false,
  
              dataIndex: item,
              key: item,
              hidden: item === "state" ? true : false ,
              render: (text, record, index) => (
                // console.log("record rajeev test",record),
                <p>
                  {item === "Networks" ? (
                    <a
                      data-id={record?.NPI}
                      speciality-name={
                        record.hasOwnProperty("New_Name")
                          ? record?.New_Name
                          : record?.Specialty_Name
                      }
                      name={record?.Presentation_Name}
                      npitype-code={props?.filterNetworkObj?.npitype}
                      specialtygroup-code={
                        props?.filterNetworkObj?.specialtygroup
                      }
                      zip-code={props?.filterNetworkObj?.zipcode}
                      geography-code={props?.filterNetworkObj?.geography}
                      county-code={
                        record.hasOwnProperty("county_name")
                          ? record.county_name === props?.filterNetworkObj?.county
                            ? props?.filterNetworkObj?.county
                            : record.county_name
                          : props?.filterNetworkObj?.county
                      }
                      state-code={
                        record.hasOwnProperty("state")
                          ? record.state === props?.filterNetworkObj?.state
                            ? props?.filterNetworkObj?.state
                            : record.state
                          : props?.filterNetworkObj?.state
                      }
                      orgname-code={props?.filterNetworkObj?.orgname}
                      firstname-code={props?.filterNetworkObj?.firstname}
                      lastname-code={props?.filterNetworkObj?.lastname}
                      style={{ color: "#9776a2", textDecoration: "underline" }}
                      onClick={props?.hospitalPresntationName}
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </p>
              ),
  
              //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
              sorter: {
                compare: (a, b) => a.item - b.item,
                multiple: 1,
              },
            });
            console.log("Result data line 392 data", colmsdata);
          });
          colmsdata = colmsdata.filter((item) => !item.hidden);
          setallCols(colmsdata);
          //console.log("colmsdata",data)
          console.log("rajeev ranjan rawat", colmsdata);
        }

        if(props.filterNetworkObj.geography.length>0){
          console.log("Result data line 392 IF 2nd", props);
          let val = props?.data[0];
          let colmns = Object?.keys(val);
          setacolmns(colmns);
          let colmsdata = [];
  
          colmns?.map((item) => {
             console.log("Rajeev",item)
            colmsdata.push({
              title:
                item === "state_fullname" ? "state" : item.replaceAll("_", " "),
              width: item === 'NPI' ?  100 :200 
              && item === "Networks" ?  100 :200  
              && item === "Address" ?  170 :200 
              && item === "Health System" ?  130 :200 
              && item === "Specialty_Name" ?  140 :200
              && item === "state_fullname" ?  80 :200
              && item === "county_name" ?  120 :200
              && item === "Presentation_Name" ?  170 :200
              && item === "NPI_Quality_Score" ?  165 :200
              && item === "NPI_Value_Score"?  155 :200
              ,
              // fixed: item === "NPI_Value_Score" ?  'right' :''
              // && item === "NPI_Value_Score"?  'right' :''
              
              filterIcon:
                item === "NPI_Value_Score" ? (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "10px",
                        
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Value Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that takes both quality of care and cost of care into account. A high value score indicates that the hospital is providing high quality at a relatively lower cost."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ) : (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        
                        borderRadius:"10px",
                        fontSize: "18px",
                        top: "3px",
                        right: "20px",
                        cursor: "inherit",
                      }}
                      type="message"
                      title="NPI Quality Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that indicates the quality of care provided by the hospital."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ),
              filterDropdown:
                item === "NPI_Quality_Score"
                  ? true
                  : false || item === "NPI_Value_Score"
                  ? true
                  : false || item === "Utilization_Score"
                  ? true
                  : false || item === "NPI_Score"
                  ? true
                  : false || item === "Active_In_Preventive_Care"
                  ? true
                  : false,
  
              dataIndex: item,
              key: item,
              hidden: item === "state" ? true : false || item === "state_fullname" ? true : false,
              render: (text, record, index) => (
                // console.log("record rajeev test",record),
                <p>
                  {item === "Networks" ? (
                    <a
                      data-id={record?.NPI}
                      speciality-name={
                        record.hasOwnProperty("New_Name")
                          ? record?.New_Name
                          : record?.Specialty_Name
                      }
                      name={record?.Presentation_Name}
                      npitype-code={props?.filterNetworkObj?.npitype}
                      specialtygroup-code={
                        props?.filterNetworkObj?.specialtygroup
                      }
                      zip-code={props?.filterNetworkObj?.zipcode}
                      geography-code={props?.filterNetworkObj?.geography}
                      county-code={
                        record.hasOwnProperty("county_name")
                          ? record.county_name === props?.filterNetworkObj?.county
                            ? props?.filterNetworkObj?.county
                            : record.county_name
                          : props?.filterNetworkObj?.county
                      }
                      state-code={
                        record.hasOwnProperty("state")
                          ? record.state === props?.filterNetworkObj?.state
                            ? props?.filterNetworkObj?.state
                            : record.state
                          : props?.filterNetworkObj?.state
                      }
                      orgname-code={props?.filterNetworkObj?.orgname}
                      firstname-code={props?.filterNetworkObj?.firstname}
                      lastname-code={props?.filterNetworkObj?.lastname}
                      style={{ color: "#9776a2", textDecoration: "underline" }}
                      onClick={props?.hospitalPresntationName}
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </p>
              ),
  
              //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
              sorter: {
                compare: (a, b) => a.item - b.item,
                multiple: 1,
              },
            });
            console.log("Result data line 392 data", colmsdata);
          });
          colmsdata = colmsdata.filter((item) => !item.hidden);
          setallCols(colmsdata);
          //console.log("colmsdata",data)
          console.log("rajeev ranjan rawat", colmsdata);
        }

        if(props.filterNetworkObj.zipcode.length === 0 && props.filterNetworkObj.geography.length === 0 ){
          console.log("Result data line 392 IF", props);
          let val = props?.data[0];
          let colmns = Object?.keys(val);
          setacolmns(colmns);
          let colmsdata = [];
  
          colmns?.map((item) => {
             console.log("Rajeev",item)
            colmsdata.push({
              title:
                item === "state_fullname" ? "state" : item.replaceAll("_", " "),
              width: item === 'NPI' ?  100 :200 
              && item === "Networks" ?  100 :200  
              && item === "Address" ?  130 :200 
              && item === "Health System" ?  130 :200 
              && item === "Specialty_Name" ?  140 :200
              && item === "state_fullname" ?  80 :200
              && item === "county_name" ?  130 :200
              && item === "Presentation_Name" ?  160 :200
              && item === "NPI_Quality_Score" ?  128 :200
              && item === "NPI_Value_Score"?  120 :200
              ,
              // fixed: item === "NPI_Value_Score" ?  'right' :''
              // && item === "NPI_Value_Score"?  'right' :''
              
              filterIcon:
                item === "NPI_Value_Score" ? (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        fontSize: "18px",
                        cursor: "inherit",
                        top: "3px",
                        right: "10px",
                        
                        borderRadius:"10px"
                      }}
                      type="message"
                      title="NPI Value Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that takes both quality of care and cost of care into account. A high value score indicates that the hospital is providing high quality at a relatively lower cost."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ) : (
                  <div style={{ position: "absolute", right: "32px" }}>
                    <Icon
                      style={{
                        // position: "absolute",
                        
                        borderRadius:"10px",
                        fontSize: "18px",
                        top: "3px",
                        right: "20px",
                        cursor: "inherit",
                      }}
                      type="message"
                      title="NPI Quality Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that indicates the quality of care provided by the hospital."
                      component={GoInfo}
                      className={styles["icon-style"]}
                    />
                  </div>
                ),
              filterDropdown:
                item === "NPI_Quality_Score"
                  ? true
                  : false || item === "NPI_Value_Score"
                  ? true
                  : false || item === "Utilization_Score"
                  ? true
                  : false || item === "NPI_Score"
                  ? true
                  : false || item === "Active_In_Preventive_Care"
                  ? true
                  : false,
  
              dataIndex: item,
              key: item,
              hidden: item === "state" ? true : false,
              render: (text, record, index) => (
                // console.log("record rajeev test",record),
                <p>
                  {item === "Networks" ? (
                    <a
                      data-id={record?.NPI}
                      speciality-name={
                        record.hasOwnProperty("New_Name")
                          ? record?.New_Name
                          : record?.Specialty_Name
                      }
                      name={record?.Presentation_Name}
                      npitype-code={props?.filterNetworkObj?.npitype}
                      specialtygroup-code={
                        props?.filterNetworkObj?.specialtygroup
                      }
                      zip-code={props?.filterNetworkObj?.zipcode}
                      geography-code={props?.filterNetworkObj?.geography}
                      county-code={
                        record.hasOwnProperty("county_name")
                          ? record.county_name === props?.filterNetworkObj?.county
                            ? props?.filterNetworkObj?.county
                            : record.county_name
                          : props?.filterNetworkObj?.county
                      }
                      state-code={
                        record.hasOwnProperty("state")
                          ? record.state === props?.filterNetworkObj?.state
                            ? props?.filterNetworkObj?.state
                            : record.state
                          : props?.filterNetworkObj?.state
                      }
                      orgname-code={props?.filterNetworkObj?.orgname}
                      firstname-code={props?.filterNetworkObj?.firstname}
                      lastname-code={props?.filterNetworkObj?.lastname}
                      style={{ color: "#9776a2", textDecoration: "underline" }}
                      onClick={props?.hospitalPresntationName}
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </p>
              ),
  
              //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
              sorter: {
                compare: (a, b) => a.item - b.item,
                multiple: 1,
              },
            });
            console.log("Result data line 392 data", colmsdata);
          });
          colmsdata = colmsdata.filter((item) => !item.hidden);
          setallCols(colmsdata);
          //console.log("colmsdata",data)
          console.log("rajeev ranjan rawat", colmsdata);
        }
       
      }

      if (props.searchNPIOption === true && props.filtervalues.npi.length > 0 && props.handleSerachBoolean === false) {
        console.log("Result data 4th if line 471", props);
        let val = props?.data[0];
        let colmns = Object?.keys(val);
        setacolmns(colmns);
        let colmsdata = [];

        colmns?.map((item) => {
          // console.log("Rajeev",item)
          colmsdata.push({
            title: item.replaceAll("_", " "),
            width: item === 'NPI' ?  100 :200 
            && item === "Networks" ?  100 :200  
            && item === "Address" ?  130 :200 
            && item === "Health System" ?  130 :200 
            && item === "Specialty_Name" ?  140 :200
            && item === "state" ?  80 :200
            && item === "county_name" ?  130 :200
            && item === "Presentation_Name" ?  160 :200
            && item === "NPI_Quality_Score" ?  170 :200
            && item === "NPI_Value_Score"?  160 :200
            ,
            hidden: item === "statecode" ? true : false,
            filterDropdown:
              item === "NPI_Quality_Score"
                ? true
                : false || item === "NPI_Value_Score"
                ? true
                : false || item === "Utilization_Score"
                ? true
                : false || item === "NPI_Score"
                ? true
                : false || item === "Active_In_Preventive_Care"
                ? true
                : false,
            filterIcon:
              item === "NPI_Value_Score" ? (
                <div style={{ position: "absolute", right: "32px" }}>
                  <Icon
                    style={{
                      // position: "absolute",
                      fontSize: "18px",
                      cursor: "inherit",
                      top: "3px",
                      right: "20px",
                     
                      borderRadius:"10px"
                    }}
                    type="message"
                    title="NPI Value Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that takes both quality of care and cost of care into account. A high value score indicates that the hospital is providing high quality at a relatively lower cost."
                    component={GoInfo}
                    className={styles["icon-style"]}
                  />
                </div>
              ) : (
                <div style={{ position: "absolute", right: "32px" }}>
                  <Icon
                    style={{
                      // position: "absolute",
                      
                      borderRadius:"10px",
                      fontSize: "18px",
                      top: "3px",
                      right: "30px",
                      cursor: "inherit",
                    }}
                    type="message"
                    title="NPI Quality Score for hospitals is a HWAI proprietary metric (1 to 10, with 10 being the best) at a county level that indicates the quality of care provided by the hospital."
                    component={GoInfo}
                    className={styles["icon-style"]}
                  />
                </div>
              ),
            dataIndex: item,
            key: item,
            render: (text, record, index) => (
              <p>
                {item === "Networks" ? (
                  <a
                    data-id={record?.NPI}
                    speciality-name={
                      record.hasOwnProperty("New_Name")
                        ? record?.New_Name
                        : record?.Specialty_Name
                    }
                    name={record?.Presentation_Name}
                    npitype-code={props?.filterNetworkObj?.npitype}
                    specialtygroup-code={
                      props?.filterNetworkObj?.specialtygroup
                    }
                    zip-code={props?.filterNetworkObj?.zipcode}
                    geography-code={props?.filterNetworkObj?.geography}
                    county-code={
                      record.hasOwnProperty("county_name")
                        ? record.county_name === props?.filterNetworkObj?.county
                          ? props?.filterNetworkObj?.county
                          : record.county_name
                        : props?.filterNetworkObj?.county
                    }
                    state-code={
                      record.hasOwnProperty("statecode")
                        ? record.statecode === props?.filterNetworkObj?.state
                          ? props?.filterNetworkObj?.state
                          : record.statecode
                        : props?.filterNetworkObj?.state
                    }
                    orgname-code={props?.filterNetworkObj?.orgname}
                    firstname-code={props?.filterNetworkObj?.firstname}
                    lastname-code={props?.filterNetworkObj?.lastname}
                    style={{ color: "#9776a2", textDecoration: "underline" }}
                    onClick={props?.hospitalPresntationName}
                  >
                    {text}
                  </a>
                ) : (
                  text
                )}
              </p>
            ),
            //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
            sorter: {
              compare: (a, b) => a.item - b.item,
              multiple: 1,
            },
          });
        });
        colmsdata = colmsdata.filter((item) => !item.hidden);
        setallCols(colmsdata);
        //console.log("colmsdata",data)
      }
    }
  }, [props]);

  return (
    <Table
    scroll={{x: 1300 ,y:'calc(100vh - 264px)'}}s
      expandable={
        props?.checkOthers === true && acolmns.indexOf("Others") !== -1
          ? {
              rowExpandable: (record) => record.Others !== null,
              expandedRowRender: (record) => (
                console.log("Checking epandable", data),
                (
                  <p
                    style={{
                      margin: 0,
                      padding: "1em 3.2em",
                      lineHeight: "30px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    <div style={{ display: "flex" }}>
                      <div style={{ color: "#000", marginRight: "5px" }}> </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {record?.Others?.split?.(",").map((item, index) => {
                          return (
                            <p style={{ color: "#9776a2" }}>
                              {item.replace(",", "")}
                            </p>
                          );
                        })}
                      </div>
                      <br />
                    </div>
                  </p>
                )
              ),

              // rowExpandable: record => props?.type === 'network',
            }
          : false
      }
      size="large"
      showSorterTooltip={false}
      bordered={true}
      loading={props?.isLoading || false}
      columns={props?.type === "network" ? tabCols : allCols}
      dataSource={data}
      ellipsis={true}
      className="table-striped-rows"
      rowClassName={(record, index) =>
        index % 2 === 0 ? "table-row-light" : "table-row-dark"
      }
      pagination={{
        onChange: (page, pageSize) => setitemsperpage(pageSize),
        pageSize: itemsperpage,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30],
        position: ["bottomRight", "bottomLeft"],
        total: props?.totalCount || data.length,
        showTotal: () =>
          (props?.totalCount && `Total Records: ${props?.totalCount}`) ||
          `Total Records : ${data.length}`,
      }}
      onChange={props.pageChange}
      // footer={() => (
      //   props?.totalCount && `Total Records: ${props?.totalCount}` || `Total Records : ${data.length}`
      // )}
    />
  );
}
