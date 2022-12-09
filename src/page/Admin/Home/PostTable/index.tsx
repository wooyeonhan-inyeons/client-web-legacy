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
import { deletePost, getAllPost, updatePost } from "../api";

interface Item {
  key: string;
  post_id: string;
  content: string;
  latitude: number;
  longitude: number;
  forFriend: number;
  name: string;
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

const PostTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");

  useEffect(() => {
    getAllPost()
      .then((res) => {
        const preprocess = res.map((post: any, i: string) => ({
          ...post,
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
      content: "",
      latitude: "",
      longitude: "",
      forFriend: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleDelete = (key: React.Key) => {
    const selectedPostId: string = data.find((d) => d.key === key)
      ?.post_id as string;

    deletePost(selectedPostId)
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
      const selectedPostId: string = newData.find((d) => d.key === key)
        ?.post_id as string;
      const body = {
        post_id: selectedPostId,
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
      title: "post_id",
      dataIndex: "post_id",
      width: "40%",
      editable: false,
    },
    {
      title: "name",
      dataIndex: "name",
      width: "10%",
      editable: false,
    },
    {
      title: "content",
      dataIndex: "content",
      width: "25%",
      editable: true,
    },
    {
      title: "latitude",
      dataIndex: "latitude",
      width: "10%",
      editable: true,
    },
    {
      title: "longitude",
      dataIndex: "longitude",
      width: "10%",
      editable: true,
    },
    {
      title: "forFriend",
      dataIndex: "forFriend",
      width: "5%",
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
        inputType: col.dataIndex === "forFriend" ? "number" : "text",
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

export default PostTable;
