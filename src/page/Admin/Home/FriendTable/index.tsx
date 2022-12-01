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
import { deleteFriend, getAllFriendList, updateFriend } from "../api";

interface Item {
  key: string;
  friend_id: string;
  follower: string;
  following: string;
  relation_type: number;
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

const FriendsTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    getAllFriendList()
      .then((res) => {
        const preprocess = res.map((friends: any, i: string) => ({
          ...friends,
          key: i,
          follower: friends.follower.name,
          following: friends.following.name,
        }));

        setData(preprocess);
      })
      .catch((error) =>
        message.error(`불러오는 도중 문제가 발생했습니다. 😕 ${error}`)
      );
  }, []);

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ relation_type: "", ...record });
    setEditingKey(record.key);
  };

  const handleDelete = (key: React.Key) => {
    const selectedUserId: string = data.find((d) => d.key === key)
      ?.friend_id as string;

    deleteFriend(selectedUserId)
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
      const selectedFriendId: string = newData.find((d) => d.key === key)
        ?.friend_id as string;
      const body = {
        friend_id: selectedFriendId,
        ...row,
      };
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        updateFriend(body)
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
      title: "follower",
      dataIndex: "follower",
      width: "35%",
      editable: false,
    },
    {
      title: "following",
      dataIndex: "following",
      width: "35%",
      editable: false,
    },
    {
      title: "relation_type",
      dataIndex: "relation_type",
      width: "30%",
      editable: true,
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
        inputType: col.dataIndex === "relation_type" ? "number" : "text",
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

export default FriendsTable;
