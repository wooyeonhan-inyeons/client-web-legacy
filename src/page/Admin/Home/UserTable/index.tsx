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
import { deleteUser, getAllUser, updateUser } from "../api";

interface Item {
  key: string;
  user_id: string;
  name: string;
  age: number;
  follower_count: number;
  following_count: number;
  created_at: Date;
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

const UserTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    getAllUser()
      .then((res) => {
        setData(res.map((users: any, i: string) => ({ key: i, ...users })));
      })
      .catch((error) =>
        message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
      );
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", message: "", ...record });
    setEditingKey(record.key);
  };

  const handleDelete = (key: React.Key) => {
    const selectedUserId: string = data.find((d) => d.key === key)
      ?.user_id as string;

    deleteUser(selectedUserId)
      .then((res) => {
        const newData = data.filter((item) => item.key !== key);
        message.success("삭제 완료. 😀");
        setData(newData);
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
      const selectedUserId: string = newData.find((d) => d.key === key)
        ?.user_id as string;
      const body = {
        user_id: selectedUserId,
        ...row,
      };
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updateUser(body)
          .then((res) => {
            setData(newData);
            message.success("수정 완료. 😀");
          })
          .catch((error) =>
            message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
          );
        // setData(newData);

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
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "email",
      dataIndex: "email",
      width: "15%",
      editable: false,
    },
    {
      title: "message",
      dataIndex: "message",
      width: "30%",
      editable: true,
    },
    {
      title: "follower",
      dataIndex: "follower_count",
      width: "5%",
      editable: false,
    },
    {
      title: "following",
      dataIndex: "following_count",
      width: "5%",
      editable: false,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);

        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              {/*eslint-disable-next-line*/}
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
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
        // inputType: col.dataIndex === "age" ? "number" : "text",
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

export default UserTable;
