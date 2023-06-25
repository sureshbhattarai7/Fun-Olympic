import React from "react";

const About = () => {
  return (
    <div className="aboutpage">
      <h2 style={{ textAlign: "center" }}>Welcome to Fun Olympic Website!</h2>
      <p>
        At Fun Olympic, we believe in celebrating the spirit of the Olympic
        Games in a fun and interactive way. Our website is designed to bring the
        excitement of the Olympics to users of all ages and provide a platform
        for Olympic enthusiasts to engage, learn, and have a great time.
      </p>

      <div style={{ margin: "1rem 0" }}>
        <h2 style={{ textAlign: "center" }}>What we offer</h2>
        <p>
          We are one of the best streaming site to produce live broadcast of the
          sports. We focus on maintaining the better quality of the video. We
          offer all the sports live streaming such as football, cricket,
          basketball, swimming and many other. Along with it, user can also see
          the sports highlights.
        </p>
        <li>
          Interactive Games: Dive into our collection of virtual Olympic-themed
          games and challenges. Test your skills, compete with friends, and
          experience the thrill of Olympic competition from the comfort of your
          home.
        </li>
        <li>
          Medal Tracker: Stay up-to-date with the latest medal counts and
          standings of different countries during the Olympic Games. Track your
          favorite nations and celebrate their success.
        </li>
        <li>
          Athlete Profiles: Explore inspiring profiles of legendary Olympic
          athletes who have made their mark in the history of the Games.
          Discover their stories, achievements, and the values they embody.
        </li>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <img src="https://t3.ftcdn.net/jpg/02/78/42/76/360_F_278427683_zeS9ihPAO61QhHqdU1fOaPk2UClfgPcW.jpg" />
          <img src="https://media.istockphoto.com/id/1305067696/photo/man-watching-live-stream-of-football-match-on-tablet.jpg?s=612x612&w=0&k=20&c=UipZX-kqMhJwfQ9Sx1ndDQTIZSm0-56LU8QqcheINDo=" />
        </div>
      </div>

      <div>
        <h2 style={{ textAlign: "center" }}>Our Mission</h2>
        <p>
          Our mission is to promote sportsmanship, ignite enthusiasm for the
          Olympic Games, and create a vibrant online community of Olympic
          enthusiasts. We aim to provide a memorable experience that combines
          education, entertainment, and interactive engagement. We believe in
          the power of community and user participation. Join our vibrant
          community of Olympic enthusiasts by sharing your own Olympic-themed
          content, such as artwork, videos, or personal stories. Engage in
          discussions, connect with fellow fans, and be part of the Fun Olympic
          experience.
        </p>
      </div>
    </div>
  );
};

export default About;
