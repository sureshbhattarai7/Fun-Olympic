import React, { useEffect, useState } from 'react'
import {Table, Button } from 'antd';
import axios from 'axios';

const Live = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3000/user/admin/broadcast');
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData().then((response) => {
      const mapData = response.data.data.broadcast.map((row, index) => ({
        SN: index + 1,
        category: row.category,
        title: row.title,
        url: row.url,
        description: row.description
      }))
      setData(mapData);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  console.log(data);

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text) => <a href={text} target="_blank" rel="noopener noreferrer">{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    }
  ];

  return (
    <div>
      <div>
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
};

export default Live;
