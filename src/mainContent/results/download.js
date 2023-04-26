import React from "react";
import ExcelJS from "exceljs";
import { NPISearchDownload, NPISearchLevel } from "../../requests";
import Icon, { DownloadOutlined } from "@ant-design/icons";
import {
  Tabs,
  Modal,
  Button,
  Tooltip,
  Menu,
  Dropdown,
  Space,
  notification,
} from "antd";
const networkcolumns = [
  {
    header: "Parent Organization",
    key: "Parent_Organization",
  },
  {
    header: "Network Name",
    key: "network_name",
  },
  {
    header: "Network ID",
    key: "network_id",
  },
  {
    header: "Address",
    key: "Address",
  },
  {
    header: "Hospital Affiliations",
    key: "Hospital_Affiliations",
  },
];

const allresultColumns = [
  { header: "NPI", key: "NPI" },
  { header: "Presentation Name", key: "Presentation_Name" },
  { header: "Address", key: "Address" },
  { header: "Provider Type", key: "Provider_Type" },
  { header: "Specialty Name", key: "Specialty_Name" },
  { header: "Networks", key: "Networks" },
  { header: "Hospital Affiliations", key: "Hospital_Affiliations" },
  { header: "Utilization Score", key: "Utilization_Score" },
  { header: "Active In Preventive Care", key: "Active_In_Preventive_Care" },
];

export function Download(props) {
  console.log("download download.js", props);
  const openNotification = (title, msg, type, time) => {
    notification[type]({
      message: msg,
      duration: time || 2,
      //title,
      // description: msg,
    });
  };

  const [excelfilters, setexcelfilters] = React.useState({});
  const [columns, setColumns] = React.useState([]);

  const handlerClickDownloadButton = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    format: "xlsx" | "csv",
    valueData
  ) => {
    e.preventDefault();

    console.log("excelfilters", excelfilters);
    let filename = Object.values(excelfilters).join("_").replaceAll(" ", "");
    const workbook = new ExcelJS.Workbook();
    console.log("filename first",filename)

    // if (props.networkData.length > 0 || props.networkData.hasOwnProperty("data")) {

    workbook.addWorksheet("Filters", {
        headerFooter: {
          firstHeader: "Hello Exceljs",
          firstFooter: "Hello World",
        },
    });
    const worksheet = workbook.getWorksheet("Filters");
    let text = "";
    let filtersData = [excelfilters];

    let filvalues = [];
    let filkeys = [];
    let filcols = Object?.keys(filtersData[0]);

    columns.map((item) => {
      filvalues.push(item.header);
        filkeys.push({ key: item.key });
    });

    console.log("filvalues", filtersData);
    Object.keys(filtersData[0]).map((item) => {
      console.log(item);
      if (item === "key") {
      } else {
        let header = item.replaceAll("_", " ").toUpperCase();

          filvalues.push(header);
          filkeys.push(item);
        }
      });

      worksheet.getColumn(1).values = filvalues;
      worksheet.getColumn(2).values = Object.values(filtersData[0]);
      worksheet.columns = filkeys;
      filtersData.push();
      worksheet.columns = columns;

      if (props.type === "Affiliation") {
        console.log("filename1 rajeev",filename)
        if (props.networkData.data.groupAffiliations !== "No Data Available") {
          if (filename.length > 31) {
            filename = filename.substring(0, 31);
            console.log("filename", filename.length);
          }
          ///////////////////////   test start //////////////////////////////////

          {
            if (filename.length > 31) {
              filename = filename.substring(0, 31);
              console.log("filename", filename.length);
            }
            ////
            workbook.addWorksheet("Networks", {
              headerFooter: {
                firstHeader: "Hello Exceljss",
                firstFooter: "Hello World",
              },
            });
            const worksheet3 = workbook.getWorksheet("Networks");
  
          let values = [];
          let keys = [];

          if (valueData[0] === undefined) {
            valueData = props.hospitalNetworkData;
          }

  
          console.log("download valueData", valueData[0]);
          console.log("download valueData", props);
  
          let cols = Object?.keys(props.hospitalNetworkData[0]);
  
          columns.map((item) => {
            values.push(item.header);
            console.log("download valueData", item);
            keys.push({ key: item.key });
          });
  
          Object.keys(props.hospitalNetworkData[0]).map((item) => {
            if (item === "key") {
            } else {
              let header = item.replaceAll("_", " ").toUpperCase();
  
              values.push(header);
              keys.push(item);
            }
          });
          worksheet.eachRow({ includeEmpty: true }, function (column, rowNumber) {
            column.eachCell(function (cell, colNumber) {
              if (colNumber == 1) {
                column.height = 20;
                cell.font = {
                  width: 10,
                  bold: true,
                  color: { argb: "9776a2" },
                };
              }
            });
          });
  
          console.log("download values", values);
  
          worksheet3.getRow(2).values = values;
          //to color the headers
          worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
              // cell.font = {
              //   name: 'Arial',
              //   family: 2,
              //   bold: false,
              //   size: 10,
              // };
              // cell.alignment = {
              //   vertical: 'middle', horizontal: 'center'
              // };
              if (rowNumber == 2) {
                row.height = 20;
                cell.font = {
                  width: 10,
                  bold: true,
                  color: { argb: "9776a2" },
                };
              }
  
              if (rowNumber >= 1) {
                for (var i = 1; i <= keys?.length; i++) {
                  if (rowNumber == 2) {
                    row.getCell(i).fill = {
                      type: "pattern",
                      pattern: "solid",
                      fgColor: { argb: "ffffff" },
                    };
                  }
                  row.getCell(i).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                  };
                  row.getCell(i).width = {
                    width: 50,
                  };
                }
              }
            });
          });
  
          worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
              if (rowNumber == 2) {
                row.height = 20;
                cell.font = {
                  width: 10,
                  bold: true,
                  color: { argb: "9776a2" },
                };
              }
  
              if (rowNumber >= 1) {
                for (var i = 1; i <= keys?.length; i++) {
                  if (rowNumber == 2) {
                    row.getCell(i).fill = {
                      type: "pattern",
                      pattern: "solid",
                      fgColor: { argb: "ffffff" },
                    };
                  }
                  row.getCell(i).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                  };
                  row.getCell(i).width = {
                    width: 50,
                  };
                }
              }
            });
          });
  
          worksheet.columns = keys;
  
          //    Now we use the keys we defined earlier to insert your data by iterating through arrData
          // and calling worksheet.addRow()
  
          if (props.type === "all") {
            props.hospitalNetworkData.forEach(function (item, index) {
              worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
            });
          } else {
            console.log()
            filename = props?.networkFileName + "_" ;
            console.log("filename 1st",filename)
            cols.shift();
            props.hospitalNetworkData.forEach(function (item, index) {
              worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
            });
          }
  
          worksheet.columns = columns;
          }

          /////////////////////////////////////////////////////////////////////////////////////////
          // groupAffiliations //
          if(props.networkData.data.groupAffiliations !== "No Data Available"){
          workbook.addWorksheet("groupAffiliations", {
            headerFooter: {
              firstHeader: "Hello Exceljss",
              firstFooter: "Hello World",
            },
          });
          const worksheet4 = workbook.getWorksheet("groupAffiliations");
          let values = [];
          let keys = [];

          valueData = props.networkData.data.groupAffiliations;
          console.log(
            "download valueData",
            props.networkData.data.groupAffiliations,
            valueData
          );

          let cols = Object?.keys(valueData[0]);

          columns.map((item) => {
            values.push(item.header);
            console.log("download valueData", item);
            keys.push({ key: item.key });
          });

          Object.keys(valueData[0]).map((item) => {
            if (item === "key") {
              let header = item.replaceAll("_", " ").toUpperCase();

              values.push(header);
              keys.push(item);
              console.log("download valueData", item);
            } else {
              let header = item.replaceAll("_", " ").toUpperCase();

              values.push(header);
              keys.push(item);
            }
          });

          console.log("download values", values);

          worksheet4.getRow(2).values = values;

          worksheet4.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
              if (rowNumber == 2) {
                row.height = 20;
                cell.font = {
                  width: 10,
                  bold: true,
                  color: { argb: "9776a2" },
                };
              }

              if (rowNumber >= 1) {
                for (var i = 1; i <= keys?.length; i++) {
                  if (rowNumber == 2) {
                    row.getCell(i).fill = {
                      type: "pattern",
                      pattern: "solid",
                      fgColor: { argb: "ffffff" },
                    };
                  }
                  row.getCell(i).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                  };
                  row.getCell(i).width = {
                    width: 50,
                  };
                }
              }
            });
          });

          worksheet.columns = keys;

          //    Now we use the keys we defined earlier to insert your data by iterating through arrData
          // and calling worksheet.addRow()

          if (props.type === "all") {
            valueData.forEach(function (item, index) {
              worksheet4.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          } else {
            filename = props?.networkFileName;
            console.log("filename final",filename)
            //cols.shift();
            valueData.forEach(function (item, index) {
              worksheet4.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          }

          worksheet.columns = columns;
          }
          /////////////////////////////////////////////////////////////////////////////////////////
          //hospitalAffiliations
          if(props.networkData.data.hospitalAffiliations !== "No Data Available"){
          workbook.addWorksheet("hospitalAffiliations", {
            headerFooter: {
              firstHeader: "Hello Exceljss",
              firstFooter: "Hello World",
            },
          });
          const worksheet5 = workbook.getWorksheet("hospitalAffiliations");
          let values = [];
          let keys = [];

          valueData = props.networkData.data.hospitalAffiliations;
          console.log(
            "download valueData",
            props.networkData.data.hospitalAffiliations,
            valueData
          );

          let cols = Object?.keys(valueData[0]);

          columns.map((item) => {
            values.push(item.header);
            console.log("download valueData", item);
            keys.push({ key: item.key });
          });

          if(valueData[0]["Primary NPI"] ==="Others"){
            Object.keys(valueData[0]).map((item) => {
              console.log("this is test",item)
              if (item === "key" || item === "Primary NPI") {
                // let header = item.replaceAll("_", " ").toUpperCase();
  
                // values.push(header);
                // keys.push(item);
                // console.log("download valueData", item);
              } else {
                let header = item.replaceAll("_", " ").toUpperCase();
                
                values.push(header);
                keys.push(item);
              }
            });
          }else{
          Object.keys(valueData[0]).map((item) => {
            console.log("this is test",item)
            if (item === "key" || item === "Rownumber") {
              // let header = item.replaceAll("_", " ").toUpperCase();

              // values.push(header);
              // keys.push(item);
              // console.log("download valueData", item);
            } else {
              let header = item.replaceAll("_", " ").toUpperCase();
              
              values.push(header);
              keys.push(item);
            }
          });
        }

          console.log("download values", values);

          worksheet5.getRow(2).values = values;

          worksheet5.eachRow({ includeEmpty: true }, function (row, rowNumber) {
            row.eachCell(function (cell, colNumber) {
              if (rowNumber == 2) {
                row.height = 20;
                cell.font = {
                  width: 10,
                  bold: true,
                  color: { argb: "9776a2" },
                };
              }

              if (rowNumber >= 1) {
                for (var i = 1; i <= keys?.length; i++) {
                  if (rowNumber == 2) {
                    row.getCell(i).fill = {
                      type: "pattern",
                      pattern: "solid",
                      fgColor: { argb: "ffffff" },
                    };
                  }
                  row.getCell(i).border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                  };
                  row.getCell(i).width = {
                    width: 50,
                  };
                }
              }
            });
          });

          worksheet.columns = keys;

          //    Now we use the keys we defined earlier to insert your data by iterating through arrData
          // and calling worksheet.addRow()

          if (props.type === "all") {
            valueData.forEach(function (item, index) {
              worksheet5.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          } else {
            filename = props?.networkFileName;
            console.log("filename final",filename)
            cols.shift();
            valueData.forEach(function (item, index) {
              worksheet5.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          }

          worksheet.columns = columns;
          }
        
        
        
        } else {


          if (props.networkData.hasOwnProperty("data")) {
            if (props.networkData.data.groupAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("groupAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet4 = workbook.getWorksheet("groupAffiliations");
              let values = [];
              let keys = [];

              valueData = props.networkData.data.groupAffiliations;
              console.log(
                "download valueData",
                props.networkData.data.groupAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key") {
                  // let header = item.replaceAll("_", " ").toUpperCase();

                  // values.push(header);
                  // keys.push(item);
                  console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet4.getRow(2).values = values;

              worksheet4.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename = props?.networkFileName
                console.log("filename final",filename)
                //cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
            if (props.networkData.data.hospitalAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("hospitalAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet5 = workbook.getWorksheet("hospitalAffiliations");
              let values = [];
              let keys = [];

              valueData = props.networkData.data.hospitalAffiliations;
              console.log(
                "download valueData",
                props.networkData.data.hospitalAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key" || item === "Rownumber") {
                  // let header = item.replaceAll("_", " ").toUpperCase();
                  // values.push(header);
                  // keys.push(item);
                  // console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet5.getRow(2).values = values;

              worksheet5.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename =  filename;
                console.log("filename final",filename)
                cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
          }

          workbook.addWorksheet("Networks", {
            headerFooter: {
              firstHeader: "Hello Exceljss",
              firstFooter: "Hello World",
            },
          });
          const worksheet3 = workbook.getWorksheet("Networks");

        let values = [];
        let keys = [];

        if (valueData[0] === undefined) {
          valueData = props.hospitalNetworkData;
        }


        console.log("download valueData", valueData[0]);
        console.log("download valueData", props);

        let cols = Object?.keys(props.hospitalNetworkData[0]);

        columns.map((item) => {
          values.push(item.header);
          console.log("download valueData", item);
          keys.push({ key: item.key });
        });

        Object.keys(props.hospitalNetworkData[0]).map((item) => {
          if (item === "key") {
          } else {
            let header = item.replaceAll("_", " ").toUpperCase();

            values.push(header);
            keys.push(item);
          }
        });
        worksheet.eachRow({ includeEmpty: true }, function (column, rowNumber) {
          column.eachCell(function (cell, colNumber) {
            if (colNumber == 1) {
              column.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }
          });
        });

        console.log("download values", values);

        worksheet3.getRow(2).values = values;
        //to color the headers
        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            // cell.font = {
            //   name: 'Arial',
            //   family: 2,
            //   bold: false,
            //   size: 10,
            // };
            // cell.alignment = {
            //   vertical: 'middle', horizontal: 'center'
            // };
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet.columns = keys;

        //    Now we use the keys we defined earlier to insert your data by iterating through arrData
        // and calling worksheet.addRow()

        if (props.type === "all") {
          props.hospitalNetworkData.forEach(function (item, index) {
            worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
          });
        } else {
          console.log()
          filename = props?.networkFileName ;
          console.log("filename 1st",filename)
          cols.shift();
          props.hospitalNetworkData.forEach(function (item, index) {
            worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
          });
        }

        worksheet.columns = columns;


        }
        
              //       //    Now we use the keys we defined earlier to insert your data by iterating through arrData
        //       // and calling worksheet.addRow()

      
      } else {


        if (props.hasOwnProperty("hospitalNetworkData")) {
          if(props.type !== "all"){
          if (props.hospitalNetworkData.hasOwnProperty("data")) {
            if (props.hospitalNetworkData.data.groupAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("groupAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet4 = workbook.getWorksheet("groupAffiliations");
              let values = [];
              let keys = [];

              valueData = props.hospitalNetworkData.data.groupAffiliations;
              console.log(
                "download valueData",
                props.hospitalNetworkData.data.groupAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key") {
                  // let header = item.replaceAll("_", " ").toUpperCase();

                  // values.push(header);
                  // keys.push(item);
                  console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet4.getRow(2).values = values;

              worksheet4.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename = props?.networkFileName
                console.log("filename final",filename)
                //cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
            if (props.hospitalNetworkData.data.hospitalAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("hospitalAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet5 = workbook.getWorksheet("hospitalAffiliations");
              let values = [];
              let keys = [];

              valueData = props.hospitalNetworkData.data.hospitalAffiliations;
              console.log(
                "download valueData",
                props.hospitalNetworkData.data.hospitalAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key" || item === "Rownumber") {
                  // let header = item.replaceAll("_", " ").toUpperCase();
                  // values.push(header);
                  // keys.push(item);
                  // console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet5.getRow(2).values = values;

              worksheet5.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename =  filename;
                console.log("filename final",filename)
                cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
          }

          ///check if network has data then
          if (props.networkData.hasOwnProperty("groupAffiliations") || props.networkData.hasOwnProperty("hospitalAffiliations")) {
            if (props.networkData.groupAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("groupAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet4 = workbook.getWorksheet("groupAffiliations");
              let values = [];
              let keys = [];

              valueData = props.networkData.groupAffiliations;
              console.log(
                "download valueData",
                props.networkData.groupAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key") {
                  // let header = item.replaceAll("_", " ").toUpperCase();

                  // values.push(header);
                  // keys.push(item);
                  console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet4.getRow(2).values = values;

              worksheet4.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename = props?.networkFileName
                console.log("filename final",filename)
                //cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet4.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
            if (props.networkData.hospitalAffiliations !=="No Data Available") {
              // test start //
              workbook.addWorksheet("hospitalAffiliations", {
                headerFooter: {
                  firstHeader: "Hello Exceljss",
                  firstFooter: "Hello World",
                },
              });
              const worksheet5 = workbook.getWorksheet("hospitalAffiliations");
              let values = [];
              let keys = [];

              valueData = props.networkData.hospitalAffiliations;
              console.log(
                "download valueData",
                props.networkData.hospitalAffiliations,
                valueData
              );

              let cols = Object?.keys(valueData[0]);

              columns.map((item) => {
                values.push(item.header);
                console.log("download valueData", item);
                keys.push({ key: item.key });
              });

              Object.keys(valueData[0]).map((item) => {
                if (item === "key" || item === "Rownumber") {
                  // let header = item.replaceAll("_", " ").toUpperCase();
                  // values.push(header);
                  // keys.push(item);
                  // console.log("download valueData", item);
                } else {
                  let header = item.replaceAll("_", " ").toUpperCase();

                  values.push(header);
                  keys.push(item);
                }
              });

              console.log("download values", values);

              worksheet5.getRow(2).values = values;

              worksheet5.eachRow(
                { includeEmpty: true },
                function (row, rowNumber) {
                  row.eachCell(function (cell, colNumber) {
                    if (rowNumber == 2) {
                      row.height = 20;
                      cell.font = {
                        width: 10,
                        bold: true,
                        color: { argb: "9776a2" },
                      };
                    }

                    if (rowNumber >= 1) {
                      for (var i = 1; i <= keys?.length; i++) {
                        if (rowNumber == 2) {
                          row.getCell(i).fill = {
                            type: "pattern",
                            pattern: "solid",
                            fgColor: { argb: "ffffff" },
                          };
                        }
                        row.getCell(i).border = {
                          top: { style: "thin" },
                          left: { style: "thin" },
                          bottom: { style: "thin" },
                          right: { style: "thin" },
                        };
                        row.getCell(i).width = {
                          width: 50,
                        };
                      }
                    }
                  });
                }
              );

              worksheet.columns = keys;

              //    Now we use the keys we defined earlier to insert your data by iterating through arrData
              // and calling worksheet.addRow()

              if (props.type === "all") {
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              } else {
                filename =  filename;
                console.log("filename final",filename)
                cols.shift();
                valueData.forEach(function (item, index) {
                  worksheet5.addRow(
                    cols.map((item2, index2) => item[cols[index2]])
                  );
                });
              }

              worksheet.columns = columns;
            }
          }
        }
        }



        
        console.log("filename networks", excelfilters);
        let filename1
        if(props.downloadAllObj.npitype === "Hospital"){
           filename1 = excelfilters.NPI;
        }else{
           filename1 = "Networks"
        }
        if(props.type == "all"){
          console.log("excelfilters final",excelfilters)
          if(excelfilters.hasOwnProperty('Zipcode')){
            filename1 = filename+"_"+"byZipcode"
          }else{
            filename1 = filename+"_"+"byGeography"
          }
        
        }else{
          filename1 = "Networks"
        }
        
        if (filename1.length > 31) {
          filename1 = filename1.substring(0, 31);
          console.log("filename networks", filename1);
        }
        workbook.addWorksheet(filename1, {
          headerFooter: {
            firstHeader: "Hello Exceljss",
            firstFooter: "Hello World",
          },
        });
        const worksheet3 = workbook.getWorksheet(filename1);

        let values = [];
        let keys = [];

        console.log("download valueData", valueData[0]);
        console.log("download valueData", props);
        if(props.type === "all"){
        let networkCol 
        let networkData 
        if(valueData[0] === undefined){
          networkCol = props.networkData[0]
          networkData = props.networkData
        }else{
          networkCol =  valueData[0]
          networkData = valueData
        }

        let cols = Object?.keys(networkCol);

        columns.map((item) => {
          values.push(item.header);
          console.log("download valueData", item);
          keys.push({ key: item.key });
        });

        Object.keys(networkCol).map((item) => {
          if (item === "statecode" || item === "New_Name" || props.downloadAllObj.npitype.length=== 0?item === "statecode" || item === "New_Name" : item === "state") {
          } else {
            let header = item.replaceAll("_", " ").toUpperCase() && item.replaceAll("state_fullname", "state").toUpperCase();

            values.push(header);
            keys.push(item);
          }
        });
        worksheet.eachRow({ includeEmpty: true }, function (column, rowNumber) {
          column.eachCell(function (cell, colNumber) {
            if (colNumber == 1) {
              column.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }
          });
        });

        console.log("download values", values);

        worksheet3.getRow(2).values = values;
        //to color the headers
        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet.columns = keys;

        //    Now we use the keys we defined earlier to insert your data by iterating through arrData
        // and calling worksheet.addRow()

        if (props.type === "all") {
          networkData.forEach(function (item, index) {
            worksheet3.addRow(keys.map((item2, index2) => item[keys[index2]]));
          });
        } else {
          console.log("filename final 1st",filename)
          filename =  filename;
          console.log("filename final last",filename)
          cols.shift();
          networkData.forEach(function (item, index) {
            worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
          });
        }

        worksheet.columns = columns;
      }
      else{


        let networkCol 
        let networkData 
        
        if(props.networkData[0] === undefined){
          networkCol = props.hospitalNetworkData[0]
          networkData = props.hospitalNetworkData
          
        }else{
          if(props.type === "network"){
            networkCol = props.hospitalNetworkData[0]
          networkData = props.hospitalNetworkData
          }else{
            networkCol = props.networkData[0]
            networkData = props.networkData
          }
          
        }


        let cols = Object?.keys(networkCol);

        columns.map((item) => {
          values.push(item.header);
          console.log("download valueData", item);
          keys.push({ key: item.key });
        });

        Object.keys(networkCol).map((item) => {
          if (item === "key") {
          } else {
            let header = item.replaceAll("_", " ").toUpperCase();

            values.push(header);
            keys.push(item);
          }
        });
        worksheet.eachRow({ includeEmpty: true }, function (column, rowNumber) {
          column.eachCell(function (cell, colNumber) {
            if (colNumber == 1) {
              column.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }
          });
        });

        console.log("download values", values);

        worksheet3.getRow(2).values = values;
        //to color the headers
        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            // cell.font = {
            //   name: 'Arial',
            //   family: 2,
            //   bold: false,
            //   size: 10,
            // };
            // cell.alignment = {
            //   vertical: 'middle', horizontal: 'center'
            // };
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet3.eachRow({ includeEmpty: true }, function (row, rowNumber) {
          row.eachCell(function (cell, colNumber) {
            if (rowNumber == 2) {
              row.height = 20;
              cell.font = {
                width: 10,
                bold: true,
                color: { argb: "9776a2" },
              };
            }

            if (rowNumber >= 1) {
              for (var i = 1; i <= keys?.length; i++) {
                if (rowNumber == 2) {
                  row.getCell(i).fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "ffffff" },
                  };
                }
                row.getCell(i).border = {
                  top: { style: "thin" },
                  left: { style: "thin" },
                  bottom: { style: "thin" },
                  right: { style: "thin" },
                };
                row.getCell(i).width = {
                  width: 50,
                };
              }
            }
          });
        });

        worksheet.columns = keys;

        //    Now we use the keys we defined earlier to insert your data by iterating through arrData
        // and calling worksheet.addRow()

        if (props.type === "all") {
          networkData.forEach(function (item, index) {
            worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
          });
        } else {
          console.log("filename final 1st",filename)
          filename =  filename;
          console.log("filename final last",filename)
          cols.shift();
          networkData.forEach(function (item, index) {
            worksheet3.addRow(cols.map((item2, index2) => item[cols[index2]]));
          });
        }

        worksheet.columns = columns;
      }
      if(props.type !== "all"){
      if (props.networkData.hasOwnProperty("data")) {
        if (props.networkData.data.groupAffiliations !=="No Data Available") {
          // test start //
          workbook.addWorksheet("groupAffiliations", {
            headerFooter: {
              firstHeader: "Hello Exceljss",
              firstFooter: "Hello World",
            },
          });
          const worksheet4 = workbook.getWorksheet("groupAffiliations");
          let values = [];
          let keys = [];

          valueData = props.networkData.data.groupAffiliations;
          console.log(
            "download valueData",
            props.networkData.data.groupAffiliations,
            valueData
          );

          let cols = Object?.keys(valueData[0]);

          columns.map((item) => {
            values.push(item.header);
            console.log("download valueData", item);
            keys.push({ key: item.key });
          });

          Object.keys(valueData[0]).map((item) => {
            if (item === "key") {
              // let header = item.replaceAll("_", " ").toUpperCase();

              // values.push(header);
              // keys.push(item);
              console.log("download valueData", item);
            } else {
              let header = item.replaceAll("_", " ").toUpperCase();

              values.push(header);
              keys.push(item);
            }
          });

          console.log("download values", values);

          worksheet4.getRow(2).values = values;

          worksheet4.eachRow(
            { includeEmpty: true },
            function (row, rowNumber) {
              row.eachCell(function (cell, colNumber) {
                if (rowNumber == 2) {
                  row.height = 20;
                  cell.font = {
                    width: 10,
                    bold: true,
                    color: { argb: "9776a2" },
                  };
                }

                if (rowNumber >= 1) {
                  for (var i = 1; i <= keys?.length; i++) {
                    if (rowNumber == 2) {
                      row.getCell(i).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "ffffff" },
                      };
                    }
                    row.getCell(i).border = {
                      top: { style: "thin" },
                      left: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "thin" },
                    };
                    row.getCell(i).width = {
                      width: 50,
                    };
                  }
                }
              });
            }
          );

          worksheet.columns = keys;

          //    Now we use the keys we defined earlier to insert your data by iterating through arrData
          // and calling worksheet.addRow()

          if (props.type === "all") {
            valueData.forEach(function (item, index) {
              worksheet4.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          } else {
            filename = props?.networkFileName
            console.log("filename final",filename)
            //cols.shift();
            valueData.forEach(function (item, index) {
              worksheet4.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          }

          worksheet.columns = columns;
        }
        if (props.networkData.data.hospitalAffiliations !=="No Data Available") {
          // test start //
          workbook.addWorksheet("hospitalAffiliations", {
            headerFooter: {
              firstHeader: "Hello Exceljss",
              firstFooter: "Hello World",
            },
          });
          const worksheet5 = workbook.getWorksheet("hospitalAffiliations");
          let values = [];
          let keys = [];

          valueData = props.networkData.data.hospitalAffiliations;
          console.log(
            "download valueData",
            props.networkData.data.hospitalAffiliations,
            valueData
          );

          let cols = Object?.keys(valueData[0]);

          columns.map((item) => {
            values.push(item.header);
            console.log("download valueData", item);
            keys.push({ key: item.key });
          });

          Object.keys(valueData[0]).map((item) => {
            if (item === "key" || item === "Rownumber") {
              // let header = item.replaceAll("_", " ").toUpperCase();
              // values.push(header);
              // keys.push(item);
              // console.log("download valueData", item);
            } else {
              let header = item.replaceAll("_", " ").toUpperCase();

              values.push(header);
              keys.push(item);
            }
          });

          console.log("download values", values);

          worksheet5.getRow(2).values = values;

          worksheet5.eachRow(
            { includeEmpty: true },
            function (row, rowNumber) {
              row.eachCell(function (cell, colNumber) {
                if (rowNumber == 2) {
                  row.height = 20;
                  cell.font = {
                    width: 10,
                    bold: true,
                    color: { argb: "9776a2" },
                  };
                }

                if (rowNumber >= 1) {
                  for (var i = 1; i <= keys?.length; i++) {
                    if (rowNumber == 2) {
                      row.getCell(i).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "ffffff" },
                      };
                    }
                    row.getCell(i).border = {
                      top: { style: "thin" },
                      left: { style: "thin" },
                      bottom: { style: "thin" },
                      right: { style: "thin" },
                    };
                    row.getCell(i).width = {
                      width: 50,
                    };
                  }
                }
              });
            }
          );

          worksheet.columns = keys;

          //    Now we use the keys we defined earlier to insert your data by iterating through arrData
          // and calling worksheet.addRow()

          if (props.type === "all") {
            valueData.forEach(function (item, index) {
              worksheet5.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          } else {
            filename =  filename;
            console.log("filename final",filename)
            cols.shift();
            valueData.forEach(function (item, index) {
              worksheet5.addRow(
                cols.map((item2, index2) => item[cols[index2]])
              );
            });
          }

          worksheet.columns = columns;
        }
      }

    }
      }



      let rajeevfilename = Object.values(excelfilters).join("_").replaceAll(" ", "")

      if(props.downloadAllObj.npitype === "PCP" && props.type === "all"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          filename = filename+"_"+"byZipcode"
          }else{
            filename = filename+"_"+"byGeography"
          }
      }
      if(props.downloadAllObj.npitype === "Specialist" && props.type === "all"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          filename = filename+"_"+"byZipcode"
          }else{
            filename = filename+"_"+"byGeography"
          }
      }

    if(props.downloadAllObj.npitype === "Specialist" && props.type === "Affiliation"){
      if(excelfilters.hasOwnProperty('Zipcode')){
        if(excelfilters.hasOwnProperty('Speciality Group')){
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]
          +"_"+excelfilters['Speciality Group']+"_"+"byZipcode"
        }else{
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byZipcode"
        }
    }else{
      
      if(excelfilters.hasOwnProperty('Speciality Group')){
        filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
        +excelfilters.NPI+"_"+excelfilters["NPI Type"]
        +"_"+excelfilters['Speciality Group']+"_"+"byGeography"
      }else{
        filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
        +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byGeography"
      }
    }
    }

    if(props.downloadAllObj.npitype === "Specialist" && props.type === "network"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          if(excelfilters.hasOwnProperty('Speciality Group')){
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Speciality Group']+"_"+"byZipcode"
          }else{
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byZipcode"
          }
      }else{
        
        if(excelfilters.hasOwnProperty('Speciality Group')){
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]
          +"_"+excelfilters['Speciality Group']+"_"+"byGeography"
        }else{
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byGeography"
        }
      }
     }

      if(props.downloadAllObj.npitype === "PCP" && props.type === "Affiliation"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          if(excelfilters.hasOwnProperty('Speciality Group')){
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Speciality Group']+"_"+"byZipcode"
          }else{
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byZipcode"
          }
      }else{
        
        if(excelfilters.hasOwnProperty('Speciality Group')){
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]
          +"_"+excelfilters['Speciality Group']+"_"+"byGeography"
        }else{
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byGeography"
        }
      }
      }
      if(props.downloadAllObj.npitype === "PCP" && props.type === "network"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          if(excelfilters.hasOwnProperty('Speciality Group')){
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Speciality Group']+"_"+"byZipcode"
          }else{
            filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byZipcode"
          }
      }else{
        
        if(excelfilters.hasOwnProperty('Speciality Group')){
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]
          +"_"+excelfilters['Speciality Group']+"_"+"byGeography"
        }else{
          filename = excelfilters.State+"_"+excelfilters.PresentationName+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"
          +excelfilters.NPI+"_"+excelfilters["NPI Type"]+"_"+"byGeography"
        }
      }
      }
      
      if(props.downloadAllObj.npitype === "Hospital"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Zipcode
            +"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }else{
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters["NPI Type"]+"_by"+props.radioSelection
          }
        }else{
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County
            +"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }else{
            filename = excelfilters.State+"_"+excelfilters.County+"_"
            +excelfilters["NPI Type"]+"_by"+props.radioSelection
          }
        }
        
        if(excelfilters.hasOwnProperty('Geography')){
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
        }else{
          filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"+excelfilters["NPI Type"]+"_by"+props.radioSelection
        }
        }else{
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County
            +"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }
        }
      }
      
      if(props.downloadAllObj.npitype === "Hospital" && props.type === "network"){
        if(excelfilters.hasOwnProperty('Zipcode')){
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Zipcode
            +"_"+excelfilters["NPI Type"]+"_"+excelfilters.NPI+
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }else{
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Zipcode+"_"
            +excelfilters["NPI Type"]+"_"+excelfilters.NPI+"_by"+props.radioSelection
          }
        }else{
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County
            +"_"+excelfilters["NPI Type"]+"_"+excelfilters.NPI
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }else{
            filename = excelfilters.State+"_"+excelfilters.County+"_"
            +excelfilters["NPI Type"]+"_"+excelfilters.NPI+"_by"+props.radioSelection
          }
        }
        
        if(excelfilters.hasOwnProperty('Geography')){
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
        }else{
          filename = excelfilters.State+"_"+excelfilters.County+"_"+excelfilters.Geography+"_"+excelfilters["NPI Type"]+"_by"+props.radioSelection
        }
        }else{
          if(excelfilters.hasOwnProperty('Specialty Group')){
            filename = excelfilters.State+"_"+excelfilters.County
            +"_"+excelfilters["NPI Type"]
            +"_"+excelfilters['Specialty Group']+"_by"+props.radioSelection
          }
        }
       }
      

      const uint8Array = format === "xlsx"
          ? await workbook.xlsx.writeBuffer()
          : await workbook.csv.writeBuffer();
      const blob = new Blob([uint8Array], { type: "application/octet-binary" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      if(props.type == "all"){
        console.log("excelfilters final",excelfilters)
        if(excelfilters.hasOwnProperty('Zipcode')){
          filename = filename+"_"
        }else{
          filename = filename+"_"
        }
      
      }
      a.download = filename + "." + format;
      a.click();
      a.remove();
    
    
    // } else {
    //   // openNotification(
    //   //   "No Data to download",
    //   //   "No Data to download",
    //   //   "error",
    //   //   3
    //   // );
    // }
  };

  React.useEffect(() => {
    if (props.type === "all") {
      downloadAll();
    } else {
      downloadTabAll();
    }
  }, [props.downloadAllObj, props.type]);

  async function handleDownload(e) {
    let event = e;
    console.log("handleDownload",props)
    if (props.type === "all") {
      await NPISearchDownload(props.downloadAllObj).then((res) => {
        handlerClickDownloadButton(event, "xlsx", res);
      });
      //setData(data);
    } else {
      handlerClickDownloadButton(event, "xlsx", props?.networkData);
      //setData(data);
    }
  }

  async function downloadTabAll() {
    //setColumns(networkcolumns);
    console.log("downloadTabAll", props);
    let xlsFilters = {};
    [props?.downloadAllObj]?.map((item) => {
      console.log("filter items 1st",item)
      if (item?.state?.length > 0) {
        xlsFilters = { ...xlsFilters, State: item.state };
      }
      if (props.networkFileName.length > 0) {
        xlsFilters = { ...xlsFilters, "PresentationName": props.networkFileName };
      }
      if (item?.county?.length > 0) {
        xlsFilters = { ...xlsFilters, County: item.county };
      }
      if (item?.zipcode?.length > 0) {
        xlsFilters = { ...xlsFilters, Zipcode: item.zipcode };
      }
      if (item?.geography?.length > 0) {
        xlsFilters = { ...xlsFilters, Geography: item.geography };
      }
      if (item?.npi?.length > 0) {
        xlsFilters = { ...xlsFilters, NPI: item.npi };
      }
      if (item?.npitype?.length > 0) {
        xlsFilters = { ...xlsFilters, "NPI Type": item.npitype };
      }

      console.log("rajeev test download",props?.downloadAllObj)
      if(props?.downloadAllObj['specialtygroup'].length>0) {
        console.log("rajeev test download specialtygroup",props?.downloadAllObj['specialtygroup'].length)
        if (item?.npitype?.length > 0) {
          xlsFilters = { ...xlsFilters, "Speciality Group": item.specialtygroup };
        }
      }
      if(props?.downloadAllObj['specialtyname'].length>0) {
        console.log("rajeev test download specialtygroup",props?.downloadAllObj['specialtyname'].length)
        if (item?.npitype?.length > 0) {
          xlsFilters = { ...xlsFilters, "Speciality Name": item.specialtyname };
        }
      }


      

    });
    setexcelfilters(xlsFilters);
  }

  async function downloadAll() {
    console.log("downloadTabAll downloadAll", props);
    //setColumns(allresultColumns);
    let xlsFilters = {};
    [props?.downloadAllObj]?.map((item) => {
      console.log("filter items 2nd",item)
      if (item?.state?.length > 0) {
        xlsFilters = { ...xlsFilters, State: item.state };
      }
      if (item?.county?.length > 0) {
        xlsFilters = { ...xlsFilters, County: item.county };
      }
      if (item?.zipcode?.length > 0) {
        xlsFilters = { ...xlsFilters, Zipcode: item.zipcode };
      }
      if (item?.geography?.length > 0) {
        xlsFilters = { ...xlsFilters, Geography: item.geography };
      }
      if (item?.npi?.length > 0) {
        xlsFilters = { ...xlsFilters, NPI: item.npi };
      }
      if (item?.npitype?.length > 0) {
        xlsFilters = { ...xlsFilters, "NPI Type": item.npitype };
      }
      
      if (item?.specialtygroup?.length > 0) {
        xlsFilters = { ...xlsFilters, "Specialty Group": item.specialtygroup };
      }
    });
    setexcelfilters(xlsFilters);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "baseline",
      }}
    >
      {/* className={'downloadOptionBtn'} */}
      <div onClick={(e) => handleDownload(e)}>
        <Icon
          type="message"
          title="Download"
          className={"antdIcon-npi"}
          component={DownloadOutlined}
        />
      </div>
    </div>
  );
}
