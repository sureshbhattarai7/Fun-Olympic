import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Modal } from "antd";
const { Meta } = Card;


const Homepage = () => {
    const [sportnews, setSportnews] = useState([]);
    const [listdata, setListdata] = useState([]);
    const [modalvalue, setmodalvalue] = useState({});

    const newsloading = async () => {
        const response = await axios.get("http://localhost:3000/sports/news");
        return response;
    };

    useEffect(() => {
        newsloading()
            .then((res) => {
                setSportnews(res.data);
                setListdata(res.data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    console.log(sportnews);
    console.log(listdata);

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        console.log("Modal open");
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const findingArray = (newsid) => {
        const success = listdata.find((item) => item.id === newsid);
        setmodalvalue(success);
        console.log(success);
        console.log(newsid);
    };

    return (
        <div>
            <div style={{ display: "flex", flexWrap: "wrap", background: '#fafafa' }}>
                {sportnews.data?.map((cl) => {
                    return (
                        <div key={cl.id}>
                            <Card
                                style={{
                                    width: 470,
                                    height: 550,
                                    margin: " 1rem 1rem 1rem 1rem",
                                    paddingLeft: "1rem",
                                    textAlign: "justify",
                                    background: '#d9d9d9'
                                }}
                                hoverable
                                cover={
                                    <img
                                        alt="example"
                                        src={cl.image}
                                        style={{ width: 410, height: 250, padding: "1rem" }}
                                    />
                                }
                            >
                                <Meta
                                    title={cl.title}
                                    description={cl.description.slice(0, 510)}
                                />
                                <Button
                                    style={{ margin: "1rem auto" }}
                                    onClick={() => {
                                        showModal();
                                        findingArray(cl.id);
                                    }}
                                >
                                    Read More
                                </Button>
                            </Card>

                            <Modal
                                title={modalvalue.title}
                                open={visible}
                                footer={null}
                                onCancel={handleCancel}
                                maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                                style={{
                                    backgroundColor: "transparent",
                                    minHeight: 810,
                                    width: 900,
                                }}
                            >
                                <h4 style={{ textAlign: "center" }}>{modalvalue.date}</h4>
                                <img
                                    src={modalvalue.image}
                                    alt="photo"
                                    style={{ width: 450, height: 300 }}
                                />
                                <h3>{modalvalue.type}</h3>
                                <p>{modalvalue.description}</p>
                            </Modal>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;
