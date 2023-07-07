import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import user from './../Images/user.png';
import { SendOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Card, Input, Avatar, Button, message } from 'antd';
import ReactPlayer from 'react-player';
import "./Styling.scss";

const MainLive = () => {
    const { id } = useParams();
    const videoRef = useRef();
    const [form] = Form.useForm();
    const history = useNavigate();

    const [videoapi, setvideoapi] = useState([""]);
    const [comments, setComments] = useState([]);
    const [data, setData] = useState([]);

    const session = JSON.parse(sessionStorage.getItem("userdetail"));

    const today = new Date();
    const date =
        today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + " " + time;


    const handlePlay = () => {
        videoRef.current.play();
    };

    const handleVideoDoubleClick = () => {
        const videoElement = videoRef.current;

        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        } else if (videoElement.mozRequestFullScreen) {
            videoElement.mozRequestFullScreen();
        } else if (videoElement.webkitRequestFullscreen) {
            videoElement.webkitRequestFullscreen();
        } else if (videoElement.msRequestFullscreen) {
            videoElement.msRequestFullscreen();
        }
    };

    const apicall = async () => {
        const response = await axios.get(`http://127.0.0.1:3000/sports/${id}`);
        return response;
    };

    useEffect(() => {
        if (!session) {
            message.error("You must login first");
            history("/login");
        }
    }, []);

    useEffect(() => {
        apicall().then((res) => {
            console.log(res);
            setvideoapi(res.data.data);
        });
    }, []);
    console.log(videoapi);
    const { sporturl } = videoapi;
    console.log(sporturl);

    if (!sessionStorage.getItem("comments")) {
        sessionStorage.setItem("comments", "[]");
    }

    const onfinish = (vals) => {
        console.log(vals);
        let comment = vals.usercomment;

        // if (!sessionStorage.getItem("comments")) {
        //   sessionStorage.setItem("comments", "[]");
        // }

        let oldcomment = JSON.parse(sessionStorage.getItem("comments"));
        oldcomment.push(comment);

        sessionStorage.setItem("comments", JSON.stringify(oldcomment));

        form.resetFields();
        setComments(oldcomment);
        // useEffect(() => {
        //   loading();
        // }, []);
    };

    useEffect(() => {
        const storedComments = JSON.parse(sessionStorage.getItem("comments"));
        if (storedComments) {
            setComments(storedComments);
        }
    }, []);

    console.log(comments);

    return (
        <div>
            <Form style={{ height: '90vh' }}>
                <div className="livesection">
                    <Row align={"center"}>
                        <Col md={14} style={{ marginTop: 0 }}>

                            <div className="video-player-container">
                                <ReactPlayer
                                    className="reactplayer"
                                    // url={sporturl}
                                    url={'https://res.cloudinary.com/dl29hrqdb/video/upload/v1688050273/Videos/running_ycpm1l.mp4'}
                                    controls={true}
                                    playing={false}
                                    width={"100%"}
                                    height={"360px"}
                                    style={{ paddingLeft: "1rem " }}
                                />
                                <span className="live-indicator">Live</span>
                            </div>

                            {/* <video width='100%' controls>
                            <source src='https://res.cloudinary.com/dl29hrqdb/video/upload/v1688039050/Videos/1974_AD_-_Samjhi_Baschu_Lyrics_kchlbt.mp4'/>
                        </video> */}

                            <div className="livecontrols">
                                <div className="live">
                                    LIVE <input value={dateTime} disabled />
                                </div>
                                {/* <button onClick={handlePlay}>play</button> */}
                            </div>
                        </Col>
                        <Col md={10} xs={15} style={{ marginTop: "1rem" }}>
                            <Card
                                className="card"
                                title="Live Comments"
                                style={{
                                    width: 600,
                                    marginLeft: "1rem",
                                    height: 570,
                                    background: "whitesmoke",
                                    boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.0784313725490196)",
                                }}
                            >
                                <hr style={{ marginBottom: "1rem" }} />
                                <div style={{ height: 400 }} className="message_area">
                                    <div className="incomingmsg">
                                        <div
                                            style={{
                                                display: "flex",
                                            }}
                                        >
                                            <Avatar src={user} />
                                            <h4>User67</h4>
                                        </div>
                                        <p style={{ padding: "1rem" }}>
                                            Mindblowing 😍😎.
                                        </p>
                                    </div>

                                    <div>
                                        {comments.map((cl, index) => {
                                            return (
                                                <div key={index} className="outgoingmsg">
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                        }}
                                                    >
                                                        {/* <Avatar
                            src={session.request ? session.photo : user}
                            style={{ marginRight: "5px" }}
                          />
                          <h4>
                            {session.fname} {session.lname} {"(You)"}
                          </h4> */}
                                                    </div>
                                                    <p style={{ padding: "1rem" }}>{cl}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <hr style={{ marginBottom: "1rem" }} />
                                <div className="cmtsection">
                                    <Form onFinish={onfinish} form={form}>
                                        <div style={{ display: "flex"}}>
                                            <Form.Item name="usercomment" rules={[{ required: "true" }]}>
                                                <Input
                                                    style={{ width: "430px" }}
                                                    placeholder="Add Live Comment....."
                                                />
                                            </Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                style={{ marginLeft: "1rem" }}
                                                className="commentsend"
                                                onClick={() =>
                                                    setComments(
                                                        JSON.parse(sessionStorage.getItem("comments"))
                                                    )
                                                }
                                            >
                                                Send <SendOutlined />
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    )
}

export default MainLive