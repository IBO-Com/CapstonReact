import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";

function OrganizeSetting() {
  const masterGrid = useRef();
  const detailGrid = useRef();
  const [itemListMaster, setItemListMaster] = useState([]);
  const [itemListDetail, setItemListDetail] = useState([]);

  useEffect(() => {
    onClickRetrieveButton();
  }, []);

  //const urlRetrieve = "http://localhost:8080/setorganize.jsp";
  //const urlSave = "http://localhost:8080/saveorganize.jsp";
  const urlRetrieve = "http://43.200.115.198:8080/setorganize.jsp";
  const urlSave = "http://43.200.115.198:8080/saveorganize.jsp";

  const sourceMaster = {
    datafields: [
      { name: "cls", type: "string" },
      { name: "cls_nm", type: "string" },
    ],
    localdata: itemListMaster,
  };

  const sourceDetail = {
    datafields: [
      { name: "cls", type: "string" },
      { name: "code_cd", type: "string" },
      { name: "code_nm", type: "string" },
    ],
    localdata: itemListDetail,
  };

  const dataAdapterDetail = new jqx.dataAdapter(sourceDetail, {
    autoBind: true,
  });

  const [columnMaster] = useState([
    {
      cellsrenderer: (row, column, value) => {
        return (
          '<div style="margin-top:7px;margin-right:2px;text-align:center">' +
          (value + 1) +
          "</div>"
        );
      },
      columntype: "number",
      datafield: "",
      draggable: false,
      editable: false,
      filterable: false,
      groupable: false,
      resizable: true,
      sortable: true,
      text: "",
      width: 100,
    },
    {
      text: "항목",
      align: "center",
      cellsalign: "center",
      datafield: "cls_nm",
      width: 200,
    },
  ]);

  const [columnDetail] = useState([
    {
      cellsrenderer: (row, column, value) => {
        return (
          '<div style="margin-top:7px;margin-right:2px;text-align:center">' +
          (value + 1) +
          "</div>"
        );
      },
      columntype: "number",
      datafield: "",
      draggable: false,
      editable: false,
      filterable: false,
      groupable: false,
      resizable: true,
      sortable: true,
      text: "",
      width: 100,
      textSize: "14px",
    },
    {
      text: "코드",
      align: "center",
      cellsalign: "center",
      datafield: "code_cd",
      width: 300,
    },
    { text: "코드명", align: "center", datafield: "code_nm", width: 400 },
  ]);

  const onClickAddButton = () => {
    const selectrowindex = masterGrid.current.getselectedrowindex();
    const rowCls = masterGrid.current.getrowdata(selectrowindex).cls;
    const row = {};
    row["cls"] = rowCls;
    detailGrid.current.addrow(null, row);
  };

  const onClickDeleteButton = () => {
    const selectedrowindex = detailGrid.current.getselectedcell().rowindex;
    const rowscount = detailGrid.current.getdatainformation().rowscount;
    if (selectedrowindex >= 0 && selectedrowindex < parseFloat(rowscount)) {
      const id = detailGrid.current.getrowid(selectedrowindex);
      detailGrid.current.deleterow(id);
    }
  };

  const onClickRetrieveButton = () => {
    axios.get(urlRetrieve, {}).then((response) => {
      console.log(response);
      setItemListMaster(response.data.dataMaster);
      setItemListDetail(response.data.dataDetail);
    });
  };

  const onClickSaveButton = () => {
    let data = detailGrid.current.getrows();
    let lengths = data.length;
    data = { ...data };

    for (let i = 0; i < lengths; i++) {
      if (!(data[i].code_cd && data[i].code_nm)) {
        alert("공백은 저장 할 수 없습니다.");
        return;
      }
    }

    axios
      .get(urlSave, {
        params: {
          data: JSON.stringify(data),
          lengths: lengths,
        },
      })
      .then((response) => {
        if (response.data.result === "success") {
          alert("저장되었습니다.");
          onClickRetrieveButton();
        } else {
          alert("error");
        }
      });
  };

  const masterRowSelect = (event) => {
    const cls = event.args.row.cls;
    const records = [];
    const dataAdapter = dataAdapterDetail;
    for (const record of dataAdapter.records) {
      if (record.cls === cls) {
        records[records.length] = record;
      }
    }
    const dataSource = {
      datafields: sourceDetail.datafields,
      localdata: records,
    };

    const adapter = new jqx.dataAdapter(dataSource);
    detailGrid.current.setOptions({ source: adapter });
  };

  return (
    <div
      style={{
        width: "98%",
        minHeight: "790px",
        background: "white",
      }}
    >
      <>
        <div
          style={{
            width: "98%",
            height: "5%",
            display: "flex",
            paddingTop: "15px",
            justifyContent: "flex-end",
          }}
        >
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickAddButton()}
            variant="contained"
          >
            추가
          </Button>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickDeleteButton()}
            variant="contained"
          >
            삭제
          </Button>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickRetrieveButton()}
            variant="contained"
          >
            조회
          </Button>
          <Button
            style={{
              width: "3.5vw",
              height: "3.5vh",
              marginRight: "2vw",
              backgroundColor: "#E5A360",
              color: "#FFFFFF",
            }}
            onClick={() => onClickSaveButton()}
            variant="contained"
          >
            저장
          </Button>
        </div>
        <hr className="empFirstLine" align="left" />

        <div style={{ marginLeft: "5vw", paddingTop: "10px" }}>
          <p
            style={{
              fontFamily: "Noto Sans KR",
              fontStyle: "normal",
              fontWeight: "400",
              fontSize: "17px",
              lineHeight: "25px",
              letterSpacing: "0.1em",
              color: "#5a6163",
            }}
          >
            조직 관리
          </p>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <JqxGrid
            style={{
              marginLeft: "5vw",
              marginTop: "1vh",
            }}
            ref={masterGrid}
            onRowselect={masterRowSelect}
            width={300}
            height={450}
            source={new jqx.dataAdapter(sourceMaster)}
            columns={columnMaster}
            columnsresize={true}
            keyboardnavigation={false}
          />
          <JqxGrid
            style={{
              marginLeft: "2.5vw",
              marginTop: "1vh",
            }}
            ref={detailGrid}
            width={800}
            height={450}
            altrows={true}
            selectionmode={"singlecell"}
            editable={true}
            columns={columnDetail}
            columnsresize={true}
            keyboardnavigation={false}
          />
        </div>
      </>
    </div>
  );
}

export default React.memo(OrganizeSetting);
