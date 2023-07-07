import React, { useEffect, useState, useRef } from 'react'
import { Table, Button, Row, Col, Form, Card, Avatar, Input, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Live = () => {
  const history = useNavigate();
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
        id: row._id,
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
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Watch',
      render: (record) => (
        <Button onClick={(id) => {
          history(`/live/${record.id}`)
          console.log(record.id)
        }}>Watch</Button>
      ),
    }
  ];



  return (
    <div>
      <div>
        <Form style={{height: '60vh', width: '100%'}}>
          <Table dataSource={data} columns={columns} rowKey={(cl) => cl.id} />
        </Form>
      </div>
    </div>
  );
};

export default Live;
