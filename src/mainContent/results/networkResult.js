import React from "react";
import { Table } from "antd";

export default function NetworkTableResult(props) {
  // props.setNetworkData(props.data)
console.log("props dataSource NetworkTableResult",props)
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



    setData(props.data);
    if (props?.type === "network") {
      console.log("NetworkTableResult line 194",props)
      let val = props?.data[0];
      if (props.data.length > 0) {
        let colmns = Object?.keys(val);
        setacolmns(colmns);
        let colmsdata = [];
        console.log("colmns networkresult", colmns);
        colmns?.map((item) => {
          colmsdata.push({
            title: item.replaceAll("_", " "),
            dataIndex: item,
            key: item,
            hidden:
              item === "key"
                ? true
                : false || item === "Address"
                ? true
                : false || item === "Hospital_Affiliations"
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
        settabCols(colmsdata);
        console.log("rajeev ranjan rawat",colmsdata)
        //props?.setdownloadNetworkCols(colmns)
      }
    } else {
      console.log("NetworkTableResult line 233",props)
      let val = props?.data[0];
      let colmns = Object?.keys(val);
      setacolmns(colmns);
      let colmsdata = [];
      console.log("NetworkTableResult",props)
      colmns?.map((item) => {
        colmsdata.push({
          title: item.replaceAll("_", " "),
          dataIndex: item,
          key: item,
          render: (text, record, index) => (
            <div>
              {item === "Presentation_Name" || item === "Networks" ? (
                <a
                  data-id={record?.NPI}
                  speciality-name={record?.Specialty_Name}
                  name={text}
                  npitype-code={props?.filterNetworkObj?.npitype}
                  specialtygroup-code={props?.filterNetworkObj?.specialtygroup}
                  zip-code={props?.filterNetworkObj?.zipcode}
                  geography-code={props?.filterNetworkObj?.geography}
                  county-code={props?.filterNetworkObj?.county}
                  state-code={props?.filterNetworkObj?.state}
                  orgname-code={props?.filterNetworkObj?.orgname}
                  firstname-code={props?.filterNetworkObj?.firstname}
                  lastname-code={props?.filterNetworkObj?.lastname}
                  style={{ color: "#9776a2" ,textDecoration: "underline"}}
                  onClick={item ==="Presentation_Name"? props?.handleNetworkID : item === "Networks" ?props.handlepresentationName :"test"}
                >
                  {text}
                </a>
              ) : (
                text
              )}
            </div>
          ),
          //sortOrder:  props?.sortingInfo ? Object.keys(props?.sortingInfo)?.indexOf(item)>0 && props?.sortingInfo?.[item] : false,
          sorter: {
            compare: (a, b) => a.item - b.item,
            multiple: 1,
          },
        });
      });
      setallCols(colmsdata);
    }
  }, [props]);

  return (
    <Table
      size="middle"
      colSpan
      scroll={{ y: 240 }}
      ellipsis={true}
      showSorterTooltip={false}
      bordered={true}
      loading={props?.isLoading || false}
      columns={props?.type === "network" ? tabCols : allCols}
      dataSource={data}
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
        total: props.data.length || data.length,
        showTotal: () =>
        
          (props?.totalCount && `Total Records: ${props.data.length}`) ||
          `Total Records : ${data.length}`,
      }}
    />
  );
}
