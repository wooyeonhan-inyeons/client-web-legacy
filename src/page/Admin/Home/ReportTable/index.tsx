import {
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { deletePost, getAllReport, updatePost } from "../api";

interface Item {
  key: string;
  report_id: string;
  post_id: string;
  reporter_name: string;
  author_name: string;
  report_type: number;
  content: string;
}

// const originData: Item[] = [];
// for (let i = 0; i < 20; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ReportTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    getAllReport()
      .then((res) => {
        const preprocess = res.map((report: any, i: string) => ({
          ...report,
          key: i,
        }));

        setData(preprocess);
      })
      .catch((error) =>
        message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
      );
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      report_type: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleDelete = (key: React.Key) => {
    const selectedId: string = data.find((d) => d.key === key)
      ?.post_id as string;

    deletePost(selectedId)
      .then((res) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
        message.success("삭제 완료. 😀");
      })
      .catch((error) =>
        message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
      );
  };

  const cancel = (d: any) => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      const selectedId: string = newData.find((d) => d.key === key)
        ?.report_id as string;
      const body = {
        report_id: selectedId,
        ...row,
      };
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updatePost(body)
          .then((res) => {
            message.success("수정 완료. 😀");
            setData(newData);
          })
          .catch((error) =>
            message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
          );

        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "report_id",
      dataIndex: "report_id",
      width: "25%",
      editable: false,
    },
    {
      title: "post_id",
      dataIndex: "post_id",
      width: "25%",
      editable: false,
    },
    {
      title: "신고자",
      dataIndex: "reporter_name",
      width: "10%",
      editable: false,
    },
    {
      title: "신고받은자",
      dataIndex: "author_name",
      width: "10%",
      editable: false,
    },
    {
      title: "내용",
      dataIndex: "content",
      width: "20%",
      editable: false,
    },
    {
      title: "신고 종류",
      dataIndex: "report_type",
      width: "10%",
      editable: true,
    },

    // {
    //   title: "operation",
    //   dataIndex: "operation",
    //   render: (_: any, record: Item) => {
    //     const editable = isEditing(record);
    //     return editable ? (
    //       <span>
    //         <Typography.Link
    //           onClick={() => save(record.key)}
    //           style={{ marginRight: 8 }}
    //         >
    //           Save
    //         </Typography.Link>
    //         <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
    //           {/*eslint-disable-next-line*/}
    //           <a>Cancel</a>
    //         </Popconfirm>
    //       </span>
    //     ) : (
    //       <Typography.Link
    //         disabled={editingKey !== ""}
    //         onClick={() => edit(record)}
    //       >
    //         Edit
    //       </Typography.Link>
    //     );
    //   },
    // },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: { key: React.Key }) =>
        data.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            {/*eslint-disable-next-line*/}
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "report_type" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default ReportTable;
